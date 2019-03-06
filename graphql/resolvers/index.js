const bcrypt = require("bcrypt");

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/bookings");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        createdBy: user.bind(this, event.createdBy)
      };
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);

    return { ...event._doc, createdBy: user.bind(this, event._doc.createdBy) };
  } catch (error) {
    throw new Error(err);
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    console.log("USER", user);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          createdBy: user.bind(this, event._doc.createdBy)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  bookings: async () => {
    try {
      const allBookings = await Booking.find();
      return allBookings.map(booking => {
        return {
          ...booking._doc,
          userId: user.bind(this, booking._doc.userId),
          eventId: singleEvent.bind(this, booking._doc.eventId)
        };
      });
    } catch (error) {
      throw new Error("an error occured while searching for bookings");
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      createdBy: "5c0fbd06c816781c518e4f3e"
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        createdBy: user.bind(this, result._doc.createdBy)
      };
      const creator = await User.findById("5c0fbd06c816781c518e4f3e");

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
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

      return {
        ...result._doc,
        _id: result.id,
        userId: user.bind(this, booking._doc.userId),
        eventId: singleEvent.bind(this, booking._doc.eventId),
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString()
      };
    } catch (err) {
      throw new Error("a problem occured when booking an event");
    }
  },
  deleteBooking: async args => {
    const booking = await Booking.findById(args.bookingId).populate("event");
    const event = {
      ...booking.event._doc,
      _id: booking.event.id,
      createdBy: user.bind(this, booking.event._doc.createdBy)
    };
    await Booking.deleteOne({ _id: args.bookingId });
    return event;
  }
};
