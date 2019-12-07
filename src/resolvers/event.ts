import Event from '../event/event.model';
import { getUser } from './user';
const mockData = require('../event/event-mock-100.json');

const resolvers = {
  events: async ({amount}: {amount: number}) => {
    try {
      const events = await Event.find({}, null, {limit: amount});
      return events.map(event => {
        return {
          ...event.toObject(),
          id: event.id,
          creator: () => getUser(event.creator)
        };
      });
    } catch (error) {
      throw error;
    }
  },
  eventsLocal: () => {
    return mockData;
  }
}

export default resolvers;
