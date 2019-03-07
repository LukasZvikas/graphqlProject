const { transformBooking, transformEvent } = require("./utilityFunctions");
const Booking = require("../../models/bookings");

module.exports = {
  bookings: async () => {
    try {
      const allBookings = await Booking.find();
      return allBookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw new Error("an error occured while searching for bookings");
    }
  },

  createBooking: async args => {
    try {
      console.log("ARGS", args.eventId);
      const eventId = await Event.findById(args.eventId)
        .then(event => {
          return event;
        })
        .catch(err => {
          throw new Error(err);
        });
      const booking = await new Booking({
        userId: "5c7dac9a6881c825bd5a08cf",
        eventId
      });
      const result = await booking.save();

      return transformBooking(result);
    } catch (err) {
      throw new Error("a problem occured when booking an event");
    }
  },
  deleteBooking: async args => {
    const booking = await Booking.findById(args.bookingId).populate("event");
    const event = transformEvent(booking.event);
    await Booking.deleteOne({ _id: args.bookingId });
    return event;
  }
};
