import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyToken, JWT_SECRET } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user in MongoDB
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanName = name ? name.trim() : '';

    if (!cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const displayName = cleanName || cleanEmail.split('@')[0];
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanEmail)}`;

    // Save to MongoDB
    const newUser = new User({
      name: displayName,
      email: cleanEmail,
      password: hashedPassword,
      avatarUrl,
      provider: 'password',
    });

    await newUser.save();

    // Create JWT Token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userProfile = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      avatarUrl: newUser.avatarUrl,
      provider: newUser.provider,
    };

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: userProfile,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & return JWT token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const cleanEmail = email ? email.trim().toLowerCase() : '';

    if (!cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Find user in MongoDB
    const user = await User.findOne({
      $or: [{ email: cleanEmail }, { name: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } }],
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userProfile = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      provider: user.provider,
    };

    return res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: userProfile,
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// @route   GET /api/auth/me
// @desc    Get currently logged in user profile from token
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const userProfile = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      provider: user.provider,
    };

    return res.json({
      success: true,
      user: userProfile,
    });
  } catch (error) {
    console.error('Fetch me error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching user.' });
  }
});

export default router;
