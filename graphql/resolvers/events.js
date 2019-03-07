const { convertDateToString } = require("../../utilities/date");
const { user, transformEvent } = require("./utilityFunctions");
const Event = require("../../models/event");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: convertDateToString(event._doc.date),
          createdBy: user.bind(this, event._doc.createdBy)
        };
      });
    } catch (err) {
      throw err;
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
      createdEvent = transformEvent(result);
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
  }
};
