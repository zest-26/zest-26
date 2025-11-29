import { auth } from '../config/firebase.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const verifyCoordinator = (req, res, next) => {
  const pin = req.headers['x-coordinator-pin'];
  
  if (pin !== process.env.COORDINATOR_PIN) {
    return res.status(403).json({ error: 'Invalid coordinator PIN' });
  }
  
  next();
};