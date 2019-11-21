import Event from '../event/event.model';

const resolvers = {
  events: async () => {
    try {
      const events = await Event.find();
      return events;
    } catch (error) {
      throw error;
    }
  }
}

export default resolvers;
