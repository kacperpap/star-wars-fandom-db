DROP DATABASE IF EXISTS `star_wars`; 
CREATE SCHEMA `star_wars`;

CREATE TABLE `star_wars`.`trilogy` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `trilogy_name` varchar(255) UNIQUE NOT NULL,
  `trilogy_order` int UNIQUE NOT NULL,
  `trilogy_size` int NOT NULL,
  `type` ENUM ('film', 'series', 'other') NOT NULL
);

CREATE TABLE `star_wars`.`episodes` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `director` varchar(255),
  `production_dir` varchar(255),
  `musics_creator` varchar(255),
  `creation_date` date,
  `budget` int,
  `duration` int,
  `trilogy_id` int
);

CREATE TABLE `star_wars`.`characters` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `actor_name` varchar(255) NOT NULL
);

CREATE TABLE `star_wars`.`universum` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `place_name` varchar(255) NOT NULL,
  `place_membership` ENUM ('Republic', 'Separatist', 'Undetermined') NOT NULL
);

CREATE TABLE `star_wars`.`events` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `character_id` int,
  `episode_id` int,
  `desc_id` int
);

CREATE TABLE `star_wars`.`scenes` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL
);

CREATE TABLE `star_wars`.`awards` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role_id` int,
  `episode_id` int,
  `type` ENUM ('Grammy', 'Oscar', 'Golden Raspberry Award', 'BAFTA', 'Saturn', 'other') NOT NULL,
  `cathegory` ENUM ('episode', 'scene', 'role', 'other') NOT NULL,
  `description` varchar(255)
);

CREATE TABLE `star_wars`.`episode_appears` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_episode` int,
  `id_character` int
);

CREATE TABLE `star_wars`.`episode_places` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_episode` int,
  `id_place` int
);


ALTER TABLE `star_wars`.`episodes` ADD FOREIGN KEY (`trilogy_id`) REFERENCES `star_wars`.`trilogy` (`id`);

ALTER TABLE `star_wars`.`events` ADD FOREIGN KEY (`character_id`) REFERENCES `star_wars`.`characters` (`id`);

ALTER TABLE `star_wars`.`events` ADD FOREIGN KEY (`episode_id`) REFERENCES `star_wars`.`episodes` (`id`);

ALTER TABLE `star_wars`.`events` ADD FOREIGN KEY (`desc_id`) REFERENCES `star_wars`.`scenes` (`id`);

ALTER TABLE `star_wars`.`awards` ADD FOREIGN KEY (`role_id`) REFERENCES `star_wars`.`characters` (`id`);

ALTER TABLE `star_wars`.`awards` ADD FOREIGN KEY (`episode_id`) REFERENCES `star_wars`.`episodes` (`id`);

ALTER TABLE `star_wars`.`episode_appears` ADD FOREIGN KEY (`id_episode`) REFERENCES `star_wars`.`episodes` (`id`);

ALTER TABLE `star_wars`.`episode_appears` ADD FOREIGN KEY (`id_character`) REFERENCES  `star_wars`.`characters` (`id`);

ALTER TABLE `star_wars`.`episode_places` ADD FOREIGN KEY (`id_episode`) REFERENCES `star_wars`.`episodes` (`id`);

ALTER TABLE  `star_wars`.`episode_places` ADD FOREIGN KEY  (`id_place`) REFERENCES `star_wars`.`universum` (`id`);



INSERT INTO star_wars.trilogy (trilogy.trilogy_name, trilogy.trilogy_order, trilogy.trilogy_size, trilogy.type) VALUES ("Prequel", 1, 3, "film");
INSERT INTO star_wars.trilogy (trilogy.trilogy_name, trilogy.trilogy_order, trilogy.trilogy_size, trilogy.type) VALUES ("Original", 2, 3, "film");
INSERT INTO star_wars.trilogy (trilogy.trilogy_name, trilogy.trilogy_order, trilogy.trilogy_size, trilogy.type) VALUES ("Sequel", 3, 3, "film");


INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration,trilogy_id) VALUES ("Mroczne Widmo", "George Lucas","George Lucas, Rick McCallum", "John Williams","1999-05-16",115000000, 131,1);
INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration, trilogy_id) VALUES ("Atak klonów", "George Lucas","George Lucas, Rick McCallum", "John Williams","2002-05-16",115000000, 143,1);
INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration, trilogy_id) VALUES ("Zemsta Sithów", "George Lucas","Rick McCallum", "John Williams","2005-05-19",113000000, 135,1);

INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration,trilogy_id) VALUES ("Nowa nadzieja", "George Lucas","George Lucas", "John Williams","1977-05-15",11000000, 121,2);
INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration,trilogy_id) VALUES ("Imperium kontratakuje", "Irvin Kershner","George Lucas", "John Williams","1980-05-21",18000000, 124,2);
INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration,trilogy_id) VALUES ("Powrót Jedi", "Richard Marquand","George Lucas", "John Williams","1983-05-25",32500000, 133,2);

INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration,trilogy_id) VALUES ("Przebudzenie Mocy", "J.J. Abrams","Kathleen Kennedy, J.J. Abrams, Bryan Burk", "John Williams","2015-12-14",245000000, 135,3);
INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration,trilogy_id) VALUES ("Ostatni Jedi", "Rian Johnson","Kathleen Kennedy, Ram Bergman", "John Williams","2017-12-09",317000000, 152,3);
INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration,trilogy_id) VALUES ("Skywalker Odrodzenie", "J.J. Abrams","Kathleen Kennedy", "John Williams","2019-12-16",275000000, 141,3);


INSERT INTO star_wars.characters (role, actor_name) VALUES ("Obi-Wan Kenobi", "Ewan McGregor");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Padme Amidala", "Natalie Portman");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Anakin Skywalker (young)", "Jake Lloyd");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Anakin Skywalker", "Hayden Christensen");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Qui-Gon Jinn", "Liam Nesson");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Mace Windu", "Samuel Jackson");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Yoda", "Frank Oz");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Palpatine (Darth Sidious)", "Ian McDiarmid");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Shmi Skywalker", "Pernilla August");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Jar Jar Binks", "Ahmed Best");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Darth Maul", "Ray Park");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("C-3PO", "Anthony Daniels");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("R2-D2", "Kenny Baker");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Hrabia Dooku", "Christopher Lee");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Jango Fett", "Temuera Morrison");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Boba Fett", "Daniel Logan");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Bail Organa", "Jimmy Smits");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("General Grivesous", "Matthew Wood");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Ki-Adi-Mundi", "Silas Carson");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Finn", "John Boyega");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Rey", "Daisy Ridley");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Kylo Ren", "Adam Driver");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Han Solo", "Harrison Ford");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Leia Organa", "Carrie Fisher");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Chewbacca", "Peter Mayshew");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Darth Vader", "David Provose");
INSERT INTO star_wars.characters (role, actor_name) VALUES ("Luke Skywalker", "Mark Hamil");



INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Alderan", "Republic");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Mustafar", "Separatist");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Utapau", "Undetermined");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Genosis", "Separatist");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Kamino", "Republic");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Tatooine", "Republic");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Coruscant", "Republic");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Naboo", "Republic");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Hoth", "Undetermined");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Endor", "Undetermined");
INSERT INTO star_wars.universum (place_name, place_membership) VALUES ("Dagobah", "Undetermined");


INSERT INTO star_wars.awards (role_id, episode_id, type, cathegory, description) VALUES (null,3,"Saturn", "episode", "Najlepsze efekty specjalne");
INSERT INTO star_wars.awards (role_id, episode_id, type, cathegory, description) VALUES (null,null,"Grammy", "other", "Najlepsza muzyka filmowa");
INSERT INTO star_wars.awards (role_id, episode_id, type, cathegory, description) VALUES (null,null,"Oscar", "other", "Najlepsza muzyka oryginalna");
INSERT INTO star_wars.awards (role_id, episode_id, type, cathegory, description) VALUES (8,4,"Saturn", "role", "Najlepszy aktor drugoplanowy");
INSERT INTO star_wars.awards (role_id, episode_id, type, cathegory, description) VALUES (1,null,"BAFTA", "scene", "Najlepsza scena: Maul kontra Jedi");


INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (6,2);
INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (2,1);
INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (4,5);
INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (3,8);
INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (4,7);
INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (5,7);
INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (6,7);
INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (4,8);
INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (2,9);

INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (1,1);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (1,2);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (1,3);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (1,5);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (1,6);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (1,7);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (1,8);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (1,11);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (2,1);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (2,2);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (2,4);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (2,6);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (2,7);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (2,8);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (2,12);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (2,13);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (2,18);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (3,1);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (3,2);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (3,4);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (3,6);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (3,7);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (3,8);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (3,13);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (3,12);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (4,12);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (4,13);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (5,13);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (5,12);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (6,12);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (6,13);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (7,12);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (7,13);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (7,21);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (7,22);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (7,23);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (7,24);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (7,25);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (8,12);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (8,13);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (8,21);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (8,22);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (8,23);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (8,24);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (8,25);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (9,12);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (9,13);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (9,21);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (9,22);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (9,23);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (9,24);
INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (9,25);



INSERT INTO star_wars.scenes (description) VALUES ("Śmierć Hana Solo, któy został zabity przez swojego syna Kylo Rena");
INSERT INTO star_wars.scenes (description) VALUES ("Luke odkrywa, że Darth Vader to jego ojciec: I am your father Luke");
INSERT INTO star_wars.scenes (description) VALUES ("Zabójstwo Jango Fetta na arenie Genosis");
INSERT INTO star_wars.scenes (description) VALUES ("Śmierć Padme Amidali przy porodzie");
INSERT INTO star_wars.scenes (description) VALUES ("Hello there General Kenobi: Pojedynek Generała Grivesousa i Obi-Wana Kenobiego");
INSERT INTO star_wars.scenes (description) VALUES ("Pojedynek Yody i Datha Sidiousa");
INSERT INTO star_wars.scenes (description) VALUES ("Śmierć Qui-Gon Jinn'a z rąk Maula i strącenie w przepaść Maula w wyniku zemsty Obi-Wana");



INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (23,7,1);
INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (22,7,1);
INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (26,5,2);
INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (27,5,2);
INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (6,2,3);
INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (15,2,3);
INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (2,3,4);
INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (1,1,7);
INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (5,1,7);
INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (11,1,7);




