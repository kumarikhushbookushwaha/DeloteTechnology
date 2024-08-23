import * as bcrypt from 'bcrypt';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcript = require('bcript');
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/authApp', { useNewUrlParser: true, useUnifiedTopology: true });

// User schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  facebookId: String,
  googleId: String
});
const User = mongoose.model('User', UserSchema);

// Passport strategies
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new FacebookStrategy({
  clientID: 'FACEBOOK_APP_ID',
  clientSecret: 'FACEBOOK_APP_SECRET',
  callbackURL: '/auth/facebook/callback'
}, (_accessToken: any, refreshToken: any, profile: { id: any; }, done: (arg0: any, arg1: any) => any) => {
  User.findOrCreate({ facebookId: profile.id }, (err: any, user: any) => {
    return done(err, user);
  });
}));
passport.use(new GoogleStrategy({
  clientID: 'GOOGLE_CLIENT_ID',
  clientSecret: 'GOOGLE_CLIENT_SECRET',
  callbackURL: '/auth/google/callback'
}, (_accessToken: any, refreshToken: any, profile: { id: any; }, done: (arg0: any, arg1: any) => any) => {
  User.findOrCreate({ googleId: profile.id }, (err: any, user: any) => {
    return done(err, user);
  });
}));

// Routes
app.post('/login', passport.authenticate('local'), (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Logged in');
});
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req: any, res: { redirect: (arg0: string) => void; }) => {
  res.redirect('/');
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req: any, res: { redirect: (arg0: string) => void; }) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.post('/signup', async (req: { body: { email: any; password: any; }; }, res: { send: (arg0: string) => void; }) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  res.send('User registered');
});

async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}


