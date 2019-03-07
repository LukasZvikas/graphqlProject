const Event = require("../../models/event");
const User = require("../../models/user");

exports.transformBooking = booking => {
  return {
    ...booking._doc,
    _id: result.id,
    userId: user.bind(this, booking._doc.userId),
    eventId: singleEvent.bind(this, booking._doc.eventId),
    createdAt: convertDateToString(booking._doc.createdAt),
    updatedAt: convertDateToString(booking._doc.updatedAt)
  };
};

exports.transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: convertDateToString(event._doc.date),
    createdBy: user.bind(this, event.createdBy)
  };
};

exports.events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

exports.singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);

    return transformEvent(event);
  } catch (error) {
    throw new Error(err);
  }
};

exports.user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};
