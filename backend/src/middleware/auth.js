import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers.authorization || '').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const requireSecretaryOrAdmin = (req, res, next) => {
  const rolesAllowed = ['tech', 'general', 'hostel', 'cult', 'acad', 'custom'];
  if (!req.user || !rolesAllowed.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

export const requireGeneral = (req, res, next) => {
  if (!req.user || req.user.role !== 'general') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

export const requireGeneralOrCult = (req, res, next) => {
  if (!req.user || (req.user.role !== 'general' && req.user.role !== 'cult')) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};


