import express from 'express';
import passport from 'passport';
import { insertGame, getTeams } from '../lib/db.js';

export const adminRouter = express.Router();


async function adminRoute(req, res) {
  console.log('fml');
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();

  let message;
  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
  }

  try {
    // Fetch the teams from the database using the getTeams function
    const teams = await getTeams();

    return res.render('admin', {
      title: 'Skrá Leiki',
      user,
      loggedIn,
      message,
      teams, // Pass the teams to the admin template
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    // Handle the error appropriately, maybe render an error page or send an error message
    return res.status(500).send('Server Error');
  }
}
// TODO færa á betri stað
// Hjálpar middleware sem athugar hvort notandi sé innskráður og hleypir okkur
// þá áfram, annars sendir á /login
function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}


async function skraRoute(req, res, next) {
  try {
    const teams = await getTeams(); // Fetch teams from the database
    return res.render('skra', {
      title: 'Skrá leik',
      teams, // Pass teams to the EJS template
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    next(error); // Pass error to express error handler (optional)
  }
}

async function skraRouteInsert(req, res, next) {
  const { home, home_score, away, away_score } = req.body;

  const homeScore = parseInt(home_score, 10);
  const awayScore = parseInt(away_score, 10);

  // Basic validation for scores
  if (isNaN(homeScore) || isNaN(awayScore)) {
    return res.status(400).send('Invalid scores.');
  }

  try {
    // Attempt to insert the game into the database
    const temp = await insertGame(home, homeScore, away, awayScore);
    console.table(temp)
    res.redirect('/leikir'); // Adjust this redirect to where you want the user to go after insertion
  } catch (error) {
    console.error('Error inserting game:', error);
    // Respond with a failure message
    res.status(500).send('Failed to insert the game.');
  }
}


adminRouter.get('/admin', ensureLoggedIn, adminRoute);
adminRouter.get('/skra', skraRoute);
adminRouter.post('/skra', skraRouteInsert);

adminRouter.post(
  '/login',
  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/login',
    successMessage: 'jeiii',
    successRedirect: '/admin',
  }),
  
  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {
    res.redirect('/admin');
  },
);
