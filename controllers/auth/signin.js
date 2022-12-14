const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { createReqError } = require("../../helpers");

// const { SECRET_KEY } = process.env;

async function signin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
    
  if (!user) {
    throw requestError(401, "Email is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  // if (!user.verify) {
  //   throw createReqError(401, "Email not verify");
  // }
  if (!passwordCompare) {
    throw createReqError(401, "Password is wrong");
  }

  // create token //
  const payload = { id: user._id };

  const token = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
    expiresIn: "6h",
  });

  const admin = `${process.env.ADMIN_MAIL}` === user.email && `${process.env.ADMIN_ID}` ? true : false;

  await User.findByIdAndUpdate(user._id, { token, admin });
  res.status(201).json({
    token,
    admin,
    email: user.email,
    id: user._id,
  });
}

module.exports = signin;
