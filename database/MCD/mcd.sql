CREATE TABLE Prestataires(
   id_prestataire INT(15) AUTO_INCREMENT,
   prenom VARCHAR(200),
   nom VARCHAR(200),
   email VARCHAR(200),
   numero_de_telephone INT(15),
   PRIMARY KEY(id_prestataire)
);

CREATE TABLE Articles(
   id_articles INT(15) AUTO_INCREMENT,
   nom VARCHAR(200),
   statut_photographie BOOLEAN,
   PRIMARY KEY(id_articles)
);

CREATE TABLE Lieu(
   id_lieu INT(15) AUTO_INCREMENT,
   adresse VARCHAR(200),
   code_postal INT(5),
   PRIMARY KEY(id_lieu)
);

CREATE TABLE Shootings(
   id_shooting INT(15) AUTO_INCREMENT,
   date_shooting DATETIME,
   id_lieu INT(15) NOT NULL,
   id_articles INT(15) NOT NULL,
   id_prestataire INT(15) NOT NULL,
   PRIMARY KEY(id_shooting),
   FOREIGN KEY(id_lieu) REFERENCES Lieu(id_lieu),
   FOREIGN KEY(id_articles) REFERENCES Articles(id_articles),
   FOREIGN KEY(id_prestataire) REFERENCES Prestataires(id_prestataire)
);
