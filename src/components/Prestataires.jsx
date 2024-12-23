import React, { useState } from "react";

export default function Prestataire() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [numeroDeTelephone, setNumeroDeTelephone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      prenom,
      nom,
      email,
      numero_de_telephone: numeroDeTelephone
    };

    fetch('http://localhost:3001/api/prestataires', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
      alert(result);
      setPrenom("");
      setNom("");
      setEmail("");
      setNumeroDeTelephone("");
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  };

  return (
    <>
      <h1>Prestataires</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Numéro de téléphone"
          value={numeroDeTelephone}
          onChange={(e) => setNumeroDeTelephone(e.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}
