const { User, Detail } = require('../models');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary')

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) {
      res.status(404).json({
        result: 'Failed',
        message: 'No User Registered Yet',
      });
    }

    return res.status(200).json({
      result: 'Success',
      message: 'Successfully Retrive Data',
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      result: 'Failed',
      message: 'Failed Retrive Data',
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      bio,
      location,
      social_media_url,
    } = req.body;

    const id = req.user.id;
    const hashPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10),
      null
    );

    const userOne = await User.findByPk(req.user.id)
    if (req.body.avatar !== '') {
      const image_id = findUser.avatar_public_id;

      await cloudinary.v2.uploader.destroy(image_id)
      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'binar_chp11/avatar',
        width: '150',
        crop: 'scale'
      })

      await User.update(
        {
          first_name,
          last_name,
          email,
          username,
          password: hashPassword,
          bio,
          location,
          social_media_url,
          avatar_public_id: result.public_id,
          avatar_url: result.secure_url,
        },
        { where: { id }, returning: true, individualHooks: true }
      )
    }

    const user = await User.update(
      {
        first_name,
        last_name,
        email,
        username,
        password: hashPassword,
        bio,
        location,
        social_media_url,
      },
      { where: { id }, returning: true }
    );

    if (!user) {
      return res.status(404).json({
        result: 'Failed',
        message: 'User Not Found',
      });
    }
    return res.status(200).json({
      result: 'Success',
      message: 'Congratulations, Your Account Has Been Successfully Updated.',
      data: user[1][0],
    });
  } catch (err) {
    return res.status(400).json({
      result: 'Faileds',
      message: 'Oops! Something Went Wrong.',
      error: err.message,
    });
  }
};

const findOne = (req, res) => {
  User.findOne({
    attributes: [
      'id',
      'first_name',
      'last_name',
      'email',
      'username',
      'total_score',
      'bio',
      'location',
      'social_media_url',
      'createdAt',
      'updatedAt',
    ],
    where: {
      username: req.params.username,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          result: 'Failed',
          message: 'User Not Registered',
        });
      }
      res.status(200).json({
        result: 'Success',
        message: 'Successfully Retrieve Data',
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: 'Failed',
        message: 'Some error occured while retrieving game',
        error: err.message,
      });
    });
};

const getLeaderboard = (req, res) => {
  User.findAll({
    order: [['total_score', 'DESC']],
  })
    .then((data) => {
      res.status(200).json({
        result: 'Success',
        message: 'Successfully Retrieve Data',
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: 'Failed',
        message: 'Some error occured while retrieving game.',
        error: err.message,
      });
    });
};

const updateScore = async (req, res) => {
  let user = await Detail.findOne({
    attributes: ['score'],
    where: {
      userId: req.user.id,
      gameId: req.body.gameId,
    },
  });
  if (!user) {
    return Detail.create({
      userId: req.user.id,
      gameId: req.body.gameId,
      score: req.body.score,
    })
      .then((data) => {
        res.status(201).json({
          result: 'Success',
          message: 'Score Player Has Been Successfully Added.',
          data: {
            score: data.score,
          },
        });
      })
      .catch((err) => {
        res.status(501).json({
          result: 'Failed',
          message: 'Some error occured while adding score.',
          error: err.message,
        });
      });
  }

  Detail.update(
    {
      score: parseInt(req.body.score) + user['score'],
    },
    {
      where: {
        userId: req.user.id,
        gameId: req.body.gameId,
      },
      returning: true,
    }
  )
    .then((data) => {
      res.status(200).json({
        result: 'Success',
        message: 'Score Player Has Been Successfully Updated.',
        data: {
          score: data[1][0].score,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: 'Failed',
        message: 'Some error occured while updating score.',
        error: err.message,
      });
    });
};

const getPlayedGame = (req, res) => {
  Detail.findAll({
    attributes: ['gameId'],
    where: {
      userId: req.user.id,
    },
  })
  .then((game) => {
    res.status(200).json({
      result: 'Success',
      message: 'Successfully retriving data.',
      data: game,
    });
  })
  .catch((err) => {
    res.status(500).json({
      result: 'Failed',
      message: 'Some error occured while retriving data.',
      error: err.message,
    });
  });
};

module.exports = {
  findOne,
  getLeaderboard,
  getAllUser,
  updateUser,
  updateScore,
  getPlayedGame,
};
