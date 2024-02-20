INSERT INTO teams (name) VALUES ('Skotföstu kempurnar');
INSERT INTO teams (name) VALUES ('Hraðaliðið');
INSERT INTO teams (name) VALUES ('Fljótu fæturnir');
INSERT INTO teams (name) VALUES ('Framherjarnir');
INSERT INTO teams (name) VALUES ('Markaskorarnir');
INSERT INTO teams (name) VALUES ('Ósigrandi skotfólkið');
INSERT INTO teams (name) VALUES ('Boltaliðið');
INSERT INTO teams (name) VALUES ('Sigurliðið');
INSERT INTO teams (name) VALUES ('Vinningshópurinn');
INSERT INTO teams (name) VALUES ('Óhemjurnar');
INSERT INTO teams (name) VALUES ('Dripplararnir');
INSERT INTO teams (name) VALUES ('Risaeðlurnar');
INSERT INTO teams (name) VALUES ('Svindlarar');

INSERT INTO users (name, username, password, admin) VALUES ('Sigurður', 'siggi', '123', true);

INSERT INTO games (home, home_score, away, away_score) VALUES (17, 2, 16, 5);
-- Game 2: Hraðaliðið vs Fljótu fæturnir
INSERT INTO games (home, home_score, away, away_score) VALUES (2, 3, 3, 1);

-- Game 3: Framherjarnir vs Markaskorarnir
INSERT INTO games (home, home_score, away, away_score) VALUES (4, 0, 5, 4);

-- Game 4: Ósigrandi skotfólkið vs Boltaliðið
INSERT INTO games (home, home_score, away, away_score) VALUES (6, 2, 7, 2);

-- Game 5: Dripplararnir vs Sigurliðið
INSERT INTO games (home, home_score, away, away_score) VALUES (8, 5, 9, 3);

-- Game 6: Vinningshópurinn vs Óhemjurnar
INSERT INTO games (home, home_score, away, away_score) VALUES (10, 1, 11, 1);

-- Game 7: Risaeðlurnar vs Svindlarar
INSERT INTO games (home, home_score, away, away_score) VALUES (13, 4, 14, 4);

-- Game 8: Skotföstu kempurnar vs Risaeðlurnar
INSERT INTO games (home, home_score, away, away_score) VALUES (1, 3, 13, 2);

-- Game 9: Hraðaliðið vs Ósigrandi skotfólkið
INSERT INTO games (home, home_score, away, away_score) VALUES (2, 4, 6, 4);

-- Game 10: Markaskorarnir vs Boltaliðið
INSERT INTO games (home, home_score, away, away_score) VALUES (5, 2, 7, 5);
