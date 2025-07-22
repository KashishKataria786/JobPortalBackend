import jwt from 'jsonwebtoken';
const generateVerificationToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_EMAIL_SECRET, { expiresIn: '15m' });
};
