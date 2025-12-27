const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res, next) => {
  try {
    const { email, pword } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const ispwordValid = await bcrypt.compare(pword, existingUser.pword);
    if (!ispwordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email }, 
      process.env.SECRET_KEY, 
      { expiresIn: '24h' }
    );
    
    res.status(200).json({ 
      message: 'Login successful',
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email
      }
    });
    
  } catch (error) {
    console.error('Error logging in:', error);
    next(error);
  }
};