import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

// Extend Express request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: { uid: string };
    }
  }
}

// Middleware to verify Firebase ID token from the Authorization header
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { uid: decodedToken.uid }; // Attach user UID to request
    next(); // Proceed to next middleware or route
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};
