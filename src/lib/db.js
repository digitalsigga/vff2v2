import pg from 'pg';
import { environment } from './environment.js';
import { logger } from './logger.js';
import { readFile } from 'fs/promises';


const env = environment(process.env, logger);

if (!env?.connectionString) {
  process.exit(-1);
}

const { connectionString } = env;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err) => {
  console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
  process.exit(-1);
});

// export async function query(q, values = []) {
//   let client;
//   try {
//     client = await pool.connect();
//     const result = await client.query(q, values);
//     return result;
//   } catch (e) {
//     console.error('unable to get client from pool', e);
//     return null;
//   }  finally {
//     if (client) {
//       client.release();
//     }
//   }
// }

export async function query(q, values = []) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(q, values);
    return result; // Return the full result object
  } catch (e) {
    console.error('Query failed', e);
    throw e; // Throw the error to be caught by the caller
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function getGames() {
  const q = `
    SELECT
      date,
      home_team.name AS home_name,
      home_score,
      away_team.name AS away_name,
      away_score
    FROM
      games
    LEFT JOIN
      teams AS home_team ON home_team.id = games.home
    LEFT JOIN
      teams AS away_team ON away_team.id = games.away
    ORDER BY date DESC
  `;

  const result = await query(q);


  const games = [];
  if (result && result.rows.length > 0) {
    for (const row of result.rows) {
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      const game = {
        date: row.date.toLocaleDateString('en-US', options),
        dateUnformatted: row.date,
        // date: row.date,
        home: {
          name: row.home_name,
          score: row.home_score,
        },
        away: {
          name: row.away_name,
          score: row.away_score,
        },
      };
      games.push(game);
    }
  }
  return games;
}

export async function insertGame(home, homeScore, away, awayScore) {
  const insertQuery = `
    INSERT INTO games (home, home_score, away, away_score)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  try {
    const { rows } = await query(insertQuery, [home, homeScore, away, awayScore]);
    console.table(rows)
    return rows[0]; // Assuming you're interested in the inserted row's data
  } catch (error) {
    console.error('Error inserting game:', error);
    throw new Error('Game insertion failed');
  }
}

export async function end() {
  await pool.end();
}

// reads from ../sql/schema.sql
export function createSchema() {
  return readFile('./src/sql/schema.sql')
    .then((data) => query(data.toString('utf-8')))
    .catch((err) => {
      console.error('Error creating schema', err);
      return false;
    });
}
// reads from ../sql/drop.sql
export async function dropSchema() {
  const q = await readFile('./src/sql/drop.sql')
    .then((data) => data.toString('utf-8'))
    .catch((err) => {
      console.error('Error dropping schema', err);
    });

    console.log("q"+q);

  return query(q);
}

export async function getTeams() {
  const q = 'SELECT id, name FROM teams ORDER BY name';
  const result = await query(q);

  const teams = [];
  if (result && (result.rows?.length ?? 0) > 0) {
    for (const row of result.rows) {
      const team = {
        id: row.id,
        name: row.name,
      };
      teams.push(team);
    }
  }
  return teams;
}