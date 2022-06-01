const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user");

// ----------------------SIGNUP
module.exports.signup = async (req, res, next) => {
  // Check if user exists

  try {
    const existUser = await userModel.findOne({ email: req.body.users.email });
    if (existUser)
      return res.status(500).send({ msg: "You are already a registered User" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  // Password Checking
  const confirmed = await checkPassword(
    req.body.users.password,
    req.body.users.confirmpassword
  );
  if (!confirmed) return res.status(500).send({ msg: "Password didn't match" });

  // Password Hashing
  const randomString = await bcrypt.genSalt(10);
  req.body.users.password = await bcrypt.hash(
    req.body.users.password,
    randomString
  );

  // Save in DB

  const userData = new userModel({ ...req.body.users });
  try {
    const createdUser = await userData.save();
    res.send(createdUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const checkPassword = async (password, confirmpassword) => {
  if (password != confirmpassword) return false;
  else return true;
};

// ------------------ SIGNIN
exports.signin = async (req, res, next) => {
  // Validate Email
  const existUser = await userModel.findOne({ email: req.body.users.email });

  if (!existUser)
    return res.status(500).send({ msg: "You are not a registered user" });

  // Password Validation
  const isValid = await bcrypt.compare(
    req.body.users.password,
    existUser.password
  );
  if (!isValid) return res.status(500).send({ msg: "Password didn't match" });

  // Generate and send the token
  const token = jwt.sign(existUser.toJSON(), process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res.send(token);
};
