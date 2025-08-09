import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/User.js';
import { env } from '../config/env.js';

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  email: Joi.string()
    .email()
    .pattern(/@(?:[a-zA-Z0-9.-]+\.)?iitmandi\.ac\.in$/)
    .required(),
  password: Joi.string().min(8).max(128).required(),
});

const signinSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/@(?:[a-zA-Z0-9.-]+\.)?iitmandi\.ac\.in$/)
    .required(),
  password: Joi.string().required(),
});


export const signup = async (req, res) => {
  const { error, value } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const { name, email, password } = value;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Account already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: 'user' });
  const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: '7d' });
  res
    .cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const signin = async (req, res) => {
  const { error, value } = signinSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const { email, password } = value;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: '7d' });
  res
    .cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const me = async (req, res) => {
  const u = req.user;
  res.json({ user: { id: u._id, name: u.name, email: u.email, role: u.role } });
};

export const signout = async (req, res) => {
  res.clearCookie('token').json({ ok: true });
};

export const changePassword = async (req, res) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(128).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const { currentPassword, newPassword } = value;
  const user = await User.findById(req.user._id);
  const ok = await user.comparePassword(currentPassword);
  if (!ok) return res.status(400).json({ message: 'Current password is incorrect' });
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ ok: true });
};


