import Joi from 'joi';
import Grievance from '../models/Grievance.js';
import Authority from '../models/Authority.js';

const createSchema = Joi.object({
  authorityKey: Joi.string().required(),
  title: Joi.string().min(3).max(120).required(),
  description: Joi.string().min(10).max(2000).required(),
});

export const createGrievance = async (req, res) => {
  const { error, value } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const { authorityKey } = value;
  const authority = await Authority.findOne({ key: authorityKey });
  if (!authority) return res.status(400).json({ message: 'Invalid authority' });
  const created = await Grievance.create({ ...value, author: req.user._id });
  res.status(201).json({ item: created });
};

export const myGrievances = async (req, res) => {
  const items = await Grievance.find({ author: req.user._id }).sort({ createdAt: -1 });
  res.json({ items });
};

export const grievancesForAuthority = async (req, res) => {
  const { key } = req.params;
  // Allow viewing only if user role matches authority key or general can view all
  if (!(req.user.role === key || req.user.role === 'general')) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const items = await Grievance.find({ authorityKey: key }).populate('author', 'name email');
  res.json({ items });
};

export const updateStatus = async (req, res) => {
  const schema = Joi.object({ status: Joi.string().valid('pending', 'approved', 'discarded', 'resolved').required() });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const { id } = req.params;
  const g = await Grievance.findById(id);
  if (!g) return res.status(404).json({ message: 'Not found' });
  if (!(req.user.role === g.authorityKey || req.user.role === 'general')) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  g.status = value.status;
  await g.save();
  res.json({ item: g });
};


