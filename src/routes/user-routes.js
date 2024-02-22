import express from 'express';
import passport from 'passport';

export const userRouter = express.Router();

// Corrected to use userRouter instead of indexRouter
userRouter.get('/login', async (req, res) => {
  return res.render('login', {
    title: 'Skrá leik',
  });
});
