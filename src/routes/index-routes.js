import express from 'express';
import { getTeams, getGames } from '../lib/db.js';

export const indexRouter = express.Router();

async function indexRoute(req, res) {
  const teams = await getTeams();

  // Log the names of the teams
  teams.forEach(team => console.log(team.name));

  return res.render('index', {
    title: 'Forsíða',
    time: new Date().toISOString(),
    teams: teams
  });
}

async function leikirRoute(req, res) {
  try {
    const games = await getGames(); // Fetching games data
    console.log(games)
    const teams = await getTeams();
  // Log the names of the teams
  teams.forEach(team => console.log(team.name));
    return res.render('leikir', {
      teams,
      title: 'Leikir',
      time: new Date().toISOString(),
      games: games // Passing games data to the template
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching games data");
  }
}

async function stadaRoute(req, res) {
  return res.render('stada', {
    title: 'Staðan',
    time: new Date().toISOString(),
  });
}

indexRouter.get('/', indexRoute);
indexRouter.get('/leikir', leikirRoute);
indexRouter.get('/stada', stadaRoute);

