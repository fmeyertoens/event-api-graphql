import User from '../user/user.model';

const resolvers = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map(user => {
        return {
          ...user.toObject(),
          id: user.id,
          password: null,
        }
      });
    } catch (error) {
      throw error;
    }
  }
};

export async function getUser(id: number) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User does not exist!');
    }
    return {
      ...user.toObject(),
      id: user.id,
      password: null,
    };
  } catch (error) {
    throw error;
  }
}

export default resolvers;
