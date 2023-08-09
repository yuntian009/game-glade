CREATE TABLE games (
    game_id INTEGER PRIMARY KEY AUTOINCREMENT,
    gid INTEGER UNIQUE,
    title TEXT NOT NULL,
    shortName TEXT,
    description TEXT,
    genre TEXT,
    platform TEXT,
    release_date TEXT,
    price REAL,
    rating REAL,
    stock INTEGER
);

INSERT INTO games (gid, title, shortName, description, genre, platform, release_date, price, rating, stock)
VALUES
(1001, 'The Legend of Zelda: Breath of the Wild', 'zelda', 'Open world adventure game', 'Action-adventure', 'Nintendo Switch', '2017-03-03', 59.99, 4.9, 200),
(1002, 'The Witcher 3: Wild Hunt', 'witcher', 'Fantasy RPG game', 'Action RPG', 'PC, PS4, Xbox One', '2015-05-19', 49.99, 4.8, 150),
(1003, 'Red Dead Redemption II', 'redemption', 'Open world action-adventure', 'Action-adventure', 'PS4, Xbox One', '2018-10-26', 59.99, 4.8, 100),
(1004, 'Fortnite', 'fortnite', 'Online battle royale game', 'Battle Royale', 'PC, PS4, Xbox One', '2017-07-25', 0.0, 4.2, 1000),
(1005, 'Minecraft', 'minecraft', 'Sandbox and survival game', 'Sandbox, Survival', 'PC, PS4, Xbox One', '2011-11-18', 26.95, 4.5, 500),
(1006, 'The Elder Scrolls V: Skyrim', 'elderscrolls', 'Open world action RPG', 'Action RPG', 'PC, PS4, Xbox One', '2011-11-11', 39.99, 4.7, 250),
(1007, 'The Last of Us Part II', 'lastofus', 'Post-apocalyptic action-adventure', 'Action-adventure', 'PS4', '2020-06-19', 59.99, 4.6, 120),
(1008, 'God of War', 'godofwar', 'Mythological adventure game', 'Action-adventure', 'PS4', '2018-04-20', 39.99, 4.8, 150),
(1009, 'Call of Duty: Warzone', 'callofduty', 'Online battle royale game', 'Battle Royale', 'PC, PS4, Xbox One', '2020-03-10', 0.0, 4.2, 1000),
(1010, 'Grand Theft Auto V', 'gtav', 'Open world action-adventure', 'Action-adventure', 'PC, PS4, Xbox One', '2013-09-17', 29.99, 4.7, 300),
(1011, 'Super Smash Bros. Ultimate', 'supersmash', 'Crossover fighting game', 'Fighting', 'Nintendo Switch', '2018-12-07', 59.99, 4.7, 200),
(1012, 'Cyberpunk 2077', 'cyberpunk', 'Open world RPG', 'Action RPG', 'PC, PS4, Xbox One', '2020-12-10', 59.99, 3.7, 200),
(1013, 'Among Us', 'amongus', 'Online multiplayer party game', 'Party', 'PC, iOS, Android', '2018-06-15', 5.0, 4.5, 500),
(1014, 'Animal Crossing: New Horizons', 'animalcrossing', 'Social simulation game', 'Simulation', 'Nintendo Switch', '2020-03-20', 59.99, 4.6, 200),
(1015, 'FIFA 22', 'fifa', 'Sports simulation game', 'Sports', 'PC, PS4, Xbox One', '2021-10-01', 59.99, 4.2, 300);


CREATE TABLE featuredGames (
    game_id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_gid INTEGER UNIQUE,
    title TEXT NOT NULL,
    shortName TEXT,
    description TEXT
);

INSERT INTO featuredGames (feature_gid, title, shortName, description)
VALUES
(1001, 'The Legend of Zelda: Breath of the Wild', 'zelda', 'Open world adventure game'),
(1002, 'The Witcher 3: Wild Hunt', 'witcher', 'Fantasy RPG game'),
(1007, 'The Last of Us Part II', 'lastofus', 'Post-apocalyptic action-adventure'),
(1009, 'Call of Duty: Warzone', 'callofduty', 'Online battle royale game'),
(1010, 'Grand Theft Auto V', 'gtav', 'Open world action-adventure'),
(1011, 'Super Smash Bros. Ultimate', 'supersmash', 'Crossover fighting game'),
(1015, 'FIFA 22', 'fifa', 'Sports simulation game');

CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_id INTEGER UNIQUE,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

INSERT INTO users (u_id, username, email, password_hash)
VALUES
(13342, 'admin', 'admin@mail.com', '0123456'),
(43923, 'jack', 'jack@mail.com', '0123456'),
(19334, 'bob', 'bob@mail.com', '0123456'),
(98543, 'amy', 'amy@mail.com', '0123456');

CREATE TABLE shoppingCart (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_uid INTEGER,
    productname TEXT,
    price REAL,
    shortName TEXT,
    stat TEXT,
    confirmation INTEGER
);

