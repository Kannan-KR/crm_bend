const userModel = require("../model/user");

exports.get = async (req, res, next) => {
  try {
    // all users

    const allUsers = await userModel.find({}).select({ password: 0, __v: 0 });
    if (allUsers.length > 0) {
      res.send(allUsers);
    }
  } catch (err) {
    console.error(err);
  }
};

exports.getone = async (req, res, next) => {
  try {
    const reqUser = await userModel
      .findOne({ _id: req.params.userId })
      .select({ password: 0, __v: 0 });
    if (reqUser) {
      res.send(reqUser);
    }
  } catch (err) {
    console.error(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deletedResponse = await userModel.findByIdAndRemove(
      req.params.userId
    );
    res.send(deletedResponse);
  } catch (err) {
    console.error(err);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const updatedResponse = await userModel.findOneAndUpdate(
      { _id: req.params.userId },
      { ...req.body.user },
      { new: true }
    );
    res.send(updatedResponse);
  } catch (err) {
    console.error(err);
  }
};
