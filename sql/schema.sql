CREATE TABLE users(
  id SERIAL PRIMARY KEY, 
  name CHARACTER VARYING(64) NOT NULL,
  username character varying(64) NOT NULL UNIQUE,
  password character varying(256) NOT NULL,
  admin BOOLEAN DEFAULT false
);

CREATE TABLE games(
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (home_id) REFERENCES authors (home_id),
    home_score INTEGER NOT NULL,
    FOREIGN KEY (away_id) REFERENCES authors (away_id),
    away_score INTEGER NOT NULL,
    time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(64) NOT NULL,
);
