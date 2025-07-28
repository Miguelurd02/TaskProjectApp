// backend/src/routes/auth.routes.ts

import express from 'express';
import admin from '../config/firebase'; // Firebase Admin initialization
import User from '../models/User';
import fetch from 'node-fetch'; // Required to call Firebase REST API

const router = express.Router();

// POST /api/auth/register
// Create a new user in Firebase Auth and MongoDB
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({ email, password });

    // Save the user in MongoDB
    await User.create({ uid: userRecord.uid, email });

    res.status(201).json({ uid: userRecord.uid });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/auth/login
// Sign in user using Firebase REST API and return idToken
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('API KEY USED:', process.env.FIREBASE_API_KEY);
    const firebaseResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    const data = await firebaseResponse.json();
    console.log('Login data:', data);

    if (data.error) {
      return res.status(401).json({ error: data.error.message });
    }

    res.status(200).json({ idToken: data.idToken });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
