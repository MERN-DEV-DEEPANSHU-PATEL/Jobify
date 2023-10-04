import {
  BadRequestError,
  UnAuthenticatedError,
  InternalServerError,
} from "../middleware/custom-api-errors.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userAlreadyExists = await User.findOne({ email });
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  if (userAlreadyExists) {
    throw new BadRequestError("Email is already in use");
  }

  const user = await User.create({ name, email, password });
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.user);

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials Email not found");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials Wrong Password");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.lastName = lastName;
  user.location = location;
  user.name = name;
  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const deleteUser = async (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials Email not found");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials Wrong Password");
  }
  const deletedUser = await User.findOneAndDelete({ email });
  if (!deletedUser) {
    throw new InternalServerError("Failed to delete user");
  } else res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
};
export { register, login, updateUser, deleteUser };
