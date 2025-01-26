import User from '../models/User.model.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
// import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

const setTokenCookies = (res, accessToken, refreshToken) => {
  const accessOptions = {
    expires: new Date(Date.now() + process.env.JWT_ACCESS_COOKIE_EXPIRE * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  };

  const refreshOptions = {
    expires: new Date(Date.now() + process.env.JWT_REFRESH_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  };

  res.cookie('accessToken', accessToken, accessOptions);
  res.cookie('refreshToken', refreshToken, refreshOptions);
};

// @desc      Register user
// @route     POST /api/v1/auth/register
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password
  });

  const accessToken = user.getAccessToken();
  const refreshToken = user.getRefreshToken();
  
  await user.save();
  setTokenCookies(res, accessToken, refreshToken);

  res.status(201).json({
    success: true,
    accessToken,
    refreshToken
  });
});

// @desc      Login user
// @route     POST /api/v1/auth/login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const accessToken = user.getAccessToken();
  const refreshToken = user.getRefreshToken();
  
  await user.save();
  setTokenCookies(res, accessToken, refreshToken);

  res.status(200).json({
    success: true,
    accessToken,
    refreshToken
  });
});

// @desc      Refresh token
// @route     POST /api/v1/auth/refresh-token
export const refreshToken = asyncHandler(async (req, res, next) => {
  const receivedToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!receivedToken) return next(new ErrorResponse('No refresh token', 401));

  const decoded = jwt.verify(receivedToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== receivedToken) {
    return next(new ErrorResponse('Invalid refresh token', 401));
  }

  if (Date.now() > user.refreshTokenExpire) {
    return next(new ErrorResponse('Refresh token expired', 401));
  }

  const newAccessToken = user.getAccessToken();
  const newRefreshToken = user.getRefreshToken();
  
  await user.save();
  setTokenCookies(res, newAccessToken, newRefreshToken);

  res.status(200).json({
    success: true,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  });
});

// @desc      Logout user
// @route     POST /api/v1/auth/logout
export const logout = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    refreshToken: undefined,
    refreshTokenExpire: undefined
  });

  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .status(200)
    .json({ success: true, data: {} });
});

// @desc      Get current user
// @route     GET /api/v1/auth/me
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorResponse('User not found', 404));

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;
  const message = `You requested a password reset. Please make a PUT request to:\n\n${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Token',
      message
    });
    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/reset-password/:token
export const resetPassword = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) return next(new ErrorResponse('Invalid token', 400));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  const accessToken = user.getAccessToken();
  const refreshToken = user.getRefreshToken();
  
  await user.save();
  setTokenCookies(res, accessToken, refreshToken);

  res.status(200).json({
    success: true,
    accessToken,
    refreshToken
  });
});