const { Schema, model } = require("mongoose");

const BookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "events"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("bookings", BookingSchema);
