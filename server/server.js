//Express facilite la création de serveur web
const express = require('express');
//permet de se co a la bdd
const mysql = require('mysql2');
//sécurité permettant au serveur d'accepeter des requete
const cors = require('cors');

//On créer une app express (le serveur)
const app = express();
//Dis au serveur de comprendre les données JSON
app.use(express.json());
//Active une sécurité pour accepter les requete depuis mon site
app.use(cors());

//Connexion a la bdd
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_photo'
});


connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Requête pour vérifier si l'utilisateur existe dans la base
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).send('Erreur de serveur.');
      return;
    }
    if (results.length > 0) {
      res.status(200).send('Connexion réussie !');
    } else {
      res.status(400).send('Identifiants incorrects.');
    }
  });
});

// Route pour obtenir les articles
app.get('/api/articles', (req, res) => {
  const query = 'SELECT * FROM articles';  // Assure-toi d'avoir une table articles dans ta base de données
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur de requête SQL:', err);
      return res.status(500).send('Erreur serveur.');
    }
    res.json(results);
  });
});

// Route pour obtenir les lieux
app.get('/api/lieu', (req, res) => {
  const query = 'SELECT * FROM lieu';  // Assure-toi d'avoir une table lieu
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur de requête SQL:', err);
      return res.status(500).send('Erreur serveur.');
    }
    res.json(results);
  });
});

// Route pour obtenir les prestataires
app.get('/api/prestataires', (req, res) => {
  const query = 'SELECT * FROM prestataires';  // Assure-toi d'avoir une table prestataires
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur de requête SQL:', err);
      return res.status(500).send('Erreur serveur.');
    }
    res.json(results);
  });
});


app.post('/api/shootings', (req, res) => {
  const { date_shooting, id_lieu, id_articles, id_prestataire } = req.body;

  // Vérifie que toutes les informations sont présentes
  if (!date_shooting || !id_lieu || !id_articles || !id_prestataire) {
    return res.status(400).json({ error: 'Toutes les informations sont requises' });
  }

  // Requête SQL pour insérer un shooting
  const query = 
    `INSERT INTO shootings (date_shooting, id_lieu, id_articles, id_prestataire)
    VALUES (?, ?, ?, ?)`
  ;
  
  connection.query(query, [date_shooting, id_lieu, id_articles, id_prestataire], (err, results) => {
    if (err) {
      console.error('Erreur serveur', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    res.status(201).json({ message: 'Shooting ajouté avec succès', id: results.insertId });
  });
});

// Nouvelle route : Récupérer tous les shootings avec des données complètes
app.get('/api/shootings', (req, res) => {
  const query = `
    SELECT 
      s.id_shooting,
      s.date_shooting,
      s.id_articles,
      s.id_prestataire,
      s.id_lieu,
      a.nom AS article,
      p.prenom AS prestataire_prenom,
      p.nom AS prestataire_nom,
      l.adresse AS lieu,
      l.code_postal
    FROM shootings s
    JOIN articles a ON s.id_articles = a.id_articles
    JOIN prestataires p ON s.id_prestataire = p.id_prestataire
    JOIN lieu l ON s.id_lieu = l.id_lieu
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.json(results.map((row) => ({
      id: row.id_shooting,
      date: row.date_shooting,
      id_articles : row.id_articles,
      id_prestataire : row.id_prestataire,
      id_lieu : row.id_lieu,
      article: row.article,
      prestataire: `${row.prestataire_prenom} ${row.prestataire_nom}`,
      lieu: `${row.lieu} (${row.code_postal})`,
    })));
  });
});

app.put('/api/shootings/:id', (req, res) => {
  const { id } = req.params;
  const { date_shooting, id_lieu, id_articles, id_prestataire } = req.body;

  // Vérification de l'existence des ID dans les tables
  const checkLieuQuery = 'SELECT * FROM lieu WHERE id_lieu = ?';
  const checkArticlesQuery = 'SELECT * FROM articles WHERE id_articles = ?';
  const checkPrestatairesQuery = 'SELECT * FROM prestataires WHERE id_prestataire = ?';

  connection.query(checkLieuQuery, [id_lieu], (err, resultsLieu) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur de vérification du lieu' });
    }

    if (resultsLieu.length === 0) {
      return res.status(400).json({ error: 'ID Lieu non valide' });
    }

    connection.query(checkArticlesQuery, [id_articles], (err, resultsArticles) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur de vérification des articles' });
      }

      if (resultsArticles.length === 0) {
        return res.status(400).json({ error: 'ID Article non valide' });
      }

      connection.query(checkPrestatairesQuery, [id_prestataire], (err, resultsPrestataires) => {
        if (err) {
          return res.status(500).json({ error: 'Erreur de vérification des prestataires' });
        }

        if (resultsPrestataires.length === 0) {
          return res.status(400).json({ error: 'ID Prestataire non valide' });
        }

        // Si tous les ID sont valides, on procède à la mise à jour
        const query = `
          UPDATE shootings
          SET date_shooting = ?, id_lieu = ?, id_articles = ?, id_prestataire = ?
          WHERE id_shooting = ?
        `;

        connection.query(
          query,
          [date_shooting, id_lieu, id_articles, id_prestataire, id],
          (err, results) => {
            if (err) {
              return res.status(500).json({ error: 'Erreur serveur lors de la mise à jour' });
            }

            res.status(200).json({ message: 'Shooting mis à jour avec succès' });
          }
        );
      });
    });
  });
});




// Pour gérer les données envoyées par le formulaire (content-type: application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

const port = 3001;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
