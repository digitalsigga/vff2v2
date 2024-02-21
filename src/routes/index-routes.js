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

//Chat GPT hjálpaði mér með þetta fall

async function stadaRoute(req, res) {
  try {
    const games = await getGames(); // Fetching games data
    const teams = await getTeams(); // Assuming this fetches all teams

    // Initialize a map to hold team scores
    let teamScores = {};
    teams.forEach(team => {
      teamScores[team.name] = 0; // Initialize each team's score to 0
    });

    // Calculate combined scores for each team
    games.forEach(game => {
      if (teamScores.hasOwnProperty(game.home.name)) {
        teamScores[game.home.name] += game.home.score; // Add home team score
      }
      if (teamScores.hasOwnProperty(game.away.name)) {
        teamScores[game.away.name] += game.away.score; // Add away team score
      }
    });

    // Convert the scores object to an array and sort by score
    let sortedTeams = Object.keys(teamScores).map(name => {
      return { name, score: teamScores[name] };
    });

    sortedTeams.sort((a, b) => b.score - a.score); // Sort by score in descending order

    // Now, sortedTeams array has teams sorted by score. You can pass this array to the template.

    return res.render('stada', {
      teams: sortedTeams,
      title: 'Staða',
      time: new Date().toISOString(),
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching games data");
  }
}

indexRouter.get('/', indexRoute);
indexRouter.get('/leikir', leikirRoute);
indexRouter.get('/stada', stadaRoute);

