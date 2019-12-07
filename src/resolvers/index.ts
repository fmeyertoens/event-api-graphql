import event from './event';
import user from './user';

const resolvers = {
  test: () => {
    return true;
  },
  ...event,
  ...user
};

export default resolvers;