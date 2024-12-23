import React, { useState } from "react";
import '../style/connexion.css';

export default function Connexion({onLogin}) {
  const [username, setUsername] = useState('');  // Pour récupérer l'identifiant
  const [password, setPassword] = useState('');  // Pour récupérer le mot de passe
  const [error, setError] = useState('');  // Pour afficher une erreur si besoin

  // Fonction pour envoyer les données au serveur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Fetch = fonction js qui permet d'envoyer des requete http comme get ou post a un serveur. Elle permet de récup ou envoyer des données
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Dis au serveur qu'on envoie du JSON
        },
        body: JSON.stringify({ username, password }),  // Envoie les données
      });

      if (response.ok) {
        const data = await response.text();  // Réponse du serveur
        alert('Connexion réussie : ' + data);  // Affiche le message du serveur
        onLogin()
      } else {
        setError('Identifiants incorrects.');  // Affiche une erreur si les identifiants sont incorrects
      }
    } catch (err) {
      setError('Erreur de connexion avec le serveur.');
    }
  };

  return (
    <div className="container-form">
      <h1>Connectez-vous</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Identifiant"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Met à jour l'identifiant
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Met à jour le mot de passe
        />
        <button type="submit">Se connecter</button>  {/* Envoie les données */}
      </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Affiche une erreur si nécessaire */}
    </div>
  );
}
