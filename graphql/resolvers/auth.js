const bcrypt = require("bcrypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        userName: args.userInput.userName,
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  loginUser: async ({ userName, password }, req) => {
    const user = await User.findOne({ userName });

    if (!user) {
      throw new Error("User was not found");
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      throw new Error("User was not found");
    }

    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      "superSecret",
      { expiresIn: "1h" }
    );

    return { userId: user.id, token, tokenExpiration: 1 };
  }
};
