import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [nom, setNom] = useState('');
  const [statutPhotographie, setStatutPhotographie] = useState(0); // 0 ou 1 pour le statut
  const [searchNom, setSearchNom] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Récupérer tous les articles
  useEffect(() => {
    axios.get('http://localhost:3001/api/articles')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des articles:', error);
      });
  }, []);

  // Ajouter un article
  const handleAddArticle = () => {
    if (!nom || statutPhotographie === undefined) {
      alert('Tous les champs sont requis');
      return;
    }

    axios.post('http://localhost:3001/api/articles', { nom, statut_photographie: statutPhotographie })
      .then((response) => {
        setArticles([...articles, { id_articles: response.data.id, nom, statut_photographie: statutPhotographie }]);
        setNom('');
        setStatutPhotographie(0); // Reset statut
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de l\'article:', error);
      });
  };

  // Modifier un article
  const handleEditArticle = (id) => {
    const articleToEdit = articles.find((article) => article.id_articles === id);
    setNom(articleToEdit.nom);
    setStatutPhotographie(articleToEdit.statut_photographie);
    setEditing(true);
    setCurrentId(id);
  };

  const handleUpdateArticle = () => {
    axios.put(`http://localhost:3001/api/articles/${currentId}`, { nom, statut_photographie: statutPhotographie })
      .then((response) => {
        setArticles(articles.map((article) =>
          article.id_articles === currentId ? { ...article, nom, statutPhotographie } : article
        ));
        setNom('');
        setStatutPhotographie(0);
        setEditing(false);
        setCurrentId(null);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de l\'article:', error);
      });
  };

  // Supprimer un article
  const handleDeleteArticle = (id) => {
    axios.delete(`http://localhost:3001/api/articles/${id}`)
      .then(() => {
        setArticles(articles.filter((article) => article.id_articles !== id));
      })
      .catch((error) => {
        alert(error.response.data.error); // Affiche l'erreur renvoyée par le serveur
      });
  };
  

  // Recherche d'article par nom
  const handleSearch = () => {
    axios.get(`http://localhost:3001/api/articles?nom=${searchNom}`)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la recherche des articles:', error);
      });
  };

  return (
    <div>
            {/* Recherche d'articles */}
      <div>
        <input
          type="text"
          value={searchNom}
          onChange={(e) => setSearchNom(e.target.value)}
          placeholder="Rechercher un article"
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>

      {/* Formulaire d'ajout/modification */}
      <div>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom de l'article"
        />
        <select
          value={statutPhotographie}
          onChange={(e) => setStatutPhotographie(Number(e.target.value))}
        >
          <option value={0}>Non Photographie</option>
          <option value={1}>Photographie</option>
        </select>
        {editing ? (
          <button onClick={handleUpdateArticle}>Mettre à jour l'article</button>
        ) : (
          <button onClick={handleAddArticle}>Ajouter un article</button>
        )}
      </div>



      {/* Liste des articles */}
      <div>
        <h2>Liste des articles</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id_articles}>
              {article.nom} - {article.statut_photographie === 1 ? 'Photographie' : 'Non Photographie'}
              <button onClick={() => handleEditArticle(article.id_articles)}>Modifier</button>
              <button onClick={() => handleDeleteArticle(article.id_articles)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Article;
