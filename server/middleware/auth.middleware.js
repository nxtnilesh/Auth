import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let accessToken;

  if (req.headers.authorization?.startsWith('Bearer')) {
    accessToken = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.accessToken) {
    accessToken = req.cookies.accessToken;
  }

  if (!accessToken) return next(new ErrorResponse('Not authorized', 401));

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new ErrorResponse('Access token expired', 401));
    }
    return next(new ErrorResponse('Invalid access token', 401));
  }
});

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(
        `Role ${req.user.role} is not authorized for this route`,
        403
      )
    );
  }
  next();
};