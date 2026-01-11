const login = async (data) => {
  const user = await UserActivation.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (!user) throw { status: 404, message: "User not found." };

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
};

const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (user) throw { status: 409, message: "User already exists." };

  const createData = await User.create(data);

  return createData;
};

export default { login, register };
