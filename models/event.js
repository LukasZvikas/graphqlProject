const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("events", eventSchema);
