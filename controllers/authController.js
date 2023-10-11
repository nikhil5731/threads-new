import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customError.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? 'admin' : 'user';

  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  // incase if user set his account to frozen and now he want to unfreeze his account
  if (user.isFrozen) {
    user.isFrozen = false;
    await user.save();
  }

  const token = createJWT({ userId: user._id });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true, // this cookie can not be access by javascript, more secure
    expires: new Date(Date.now() + oneDay), // Date.now() return numbers of mille seconds from january 1st 1970
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ msg: 'login successfully' });
};

export const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
