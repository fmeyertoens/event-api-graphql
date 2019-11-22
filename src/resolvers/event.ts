import Event from '../event/event.model';
const mockData = require('../event/event-mock-100.json');

const resolvers = {
  events: async () => {
    try {
      const events = await Event.find();
      return events;
    } catch (error) {
      throw error;
    }
  },
  eventsLocal: () => {
    return mockData;
  }
}

export default resolvers;
