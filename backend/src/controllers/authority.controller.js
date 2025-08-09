import Joi from 'joi';
import Authority from '../models/Authority.js';
import User from '../models/User.js';

export const listAuthorities = async (req, res) => {
  const items = await Authority.find().sort({ isDefault: -1, name: 1 });
  res.json({ items });
};

export const createAuthority = async (req, res) => {
  const schema = Joi.object({
    key: Joi.string().lowercase().alphanum().min(3).max(20).required(),
    name: Joi.string().min(3).max(60).required(),
    description: Joi.string().allow('', null),
    photoPath: Joi.string().allow('', null),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const exists = await Authority.findOne({ key: value.key });
  if (exists) return res.status(409).json({ message: 'Authority key exists' });
  const created = await Authority.create(value);
  res.status(201).json({ item: created });
};

export const deleteAuthority = async (req, res) => {
  const { key } = req.params;
  const deleted = await Authority.findOneAndDelete({ key });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
};

// Cult secretary can add/remove secretary user accounts (not authorities list)
export const listSecretaryUsers = async (req, res) => {
  const items = await User.find({ role: { $in: ['tech', 'general', 'hostel', 'cult', 'acad', 'custom'] } }).select('email name role');
  res.json({ items });
};

export const addSecretaryUser = async (req, res) => {
  const schema = Joi.object({ email: Joi.string().email().required(), name: Joi.string().min(2).max(80).required(), role: Joi.string().valid('tech','general','hostel','cult','acad','custom').required(), password: Joi.string().min(6).max(128).required() });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const exists = await User.findOne({ email: value.email });
  if (exists) return res.status(409).json({ message: 'User exists' });
  const bcrypt = (await import('bcryptjs')).default;
  const passwordHash = await bcrypt.hash(value.password, 10);
  const created = await User.create({ name: value.name, email: value.email, role: value.role, passwordHash });
  res.status(201).json({ item: { id: created._id, email: created.email, role: created.role } });
};

export const removeSecretaryUser = async (req, res) => {
  const { email } = req.params;
  const removed = await User.findOneAndDelete({ email });
  if (!removed) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
};


