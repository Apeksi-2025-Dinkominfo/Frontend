import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Save the decoded token in the request for further use
    req.user = decoded;
    next();
  });
};
