const { Schema, model } = require("mongoose");

const User = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, require: true },
  createdEvents: {
    type: Schema.Types.ObjectId,
    ref: "events"
  }
});

module.exports = model("users", User);
