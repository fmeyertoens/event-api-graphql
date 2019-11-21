import event from './event';

const resolvers = {
  test: () => {
    return true;
  },
  ...event
};

export default resolvers;