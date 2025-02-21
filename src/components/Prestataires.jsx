import React, { useState } from "react";

export default function Prestataire() {
  // États pour l'ajout
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [numeroDeTelephone, setNumeroDeTelephone] = useState("");

  // États pour la recherche et la modification
  const [searchPrenom, setSearchPrenom] = useState("");
  const [searchNom, setSearchNom] = useState("");
  const [prestatairesTrouves, setPrestatairesTrouves] = useState([]);
  const [prestataireSelectionne, setPrestataireSelectionne] = useState(null);

  // Ajouter un prestataire
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { prenom, nom, email, numero_de_telephone: numeroDeTelephone };

    fetch("http://localhost:3001/api/prestataires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        setPrenom("");
        setNom("");
        setEmail("");
        setNumeroDeTelephone("");
      })
      .catch((error) => console.error("Erreur:", error));
  };

  // Rechercher des prestataires par prénom et nom
  const handleSearch = () => {
    fetch(`http://localhost:3001/api/prestataires?prenom=${searchPrenom}&nom=${searchNom}`)
      .then((res) => res.json())
      .then((data) => setPrestatairesTrouves(data))
      .catch((error) => console.error("Erreur de recherche:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce prestataire ?")) {
      fetch(`http://localhost:3001/api/prestataires/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          alert(result.message);
          // Mettre à jour la liste en supprimant l'élément localement
          setPrestatairesTrouves(prestatairesTrouves.filter((p) => p.id_prestataire !== id));
        })
        .catch((error) => console.error("Erreur de suppression:", error));
    }
  };
  

  // Sélectionner un prestataire pour modification
  const handleSelectPrestataire = (prestataire) => {
    setPrestataireSelectionne(prestataire);
  };

  // Mettre à jour un prestataire
  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedData = {
      prenom: prestataireSelectionne.prenom,
      nom: prestataireSelectionne.nom,
      email: prestataireSelectionne.email,
      numero_de_telephone: prestataireSelectionne.numero_de_telephone,
    };

    fetch(`http://localhost:3001/api/prestataires/${prestataireSelectionne.id_prestataire}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        setPrestataireSelectionne(null);
        setSearchPrenom("");
        setSearchNom("");
        setPrestatairesTrouves([]);
      })
      .catch((error) => console.error("Erreur de mise à jour:", error));
  };

  return (
    <div>
      {/* Formulaire d'Ajout */}
      <h2>Ajouter un Prestataire</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" placeholder="Numéro de téléphone" value={numeroDeTelephone} onChange={(e) => setNumeroDeTelephone(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>

      {/* Recherche de prestataire */}
      <h2>Rechercher un Prestataire</h2>
      <input type="text" placeholder="Prénom" value={searchPrenom} onChange={(e) => setSearchPrenom(e.target.value)} />
      <input type="text" placeholder="Nom" value={searchNom} onChange={(e) => setSearchNom(e.target.value)} />
      <button onClick={handleSearch}>Rechercher</button>

      {/* Formulaire de Modification */}
      {prestataireSelectionne && (
        <div>
          <h2>Modifier le Prestataire</h2>
          <form onSubmit={handleUpdate}>
            <input type="text" value={prestataireSelectionne.prenom} onChange={(e) => setPrestataireSelectionne({ ...prestataireSelectionne, prenom: e.target.value })} />
            <input type="text" value={prestataireSelectionne.nom} onChange={(e) => setPrestataireSelectionne({ ...prestataireSelectionne, nom: e.target.value })} />
            <input type="email" value={prestataireSelectionne.email} onChange={(e) => setPrestataireSelectionne({ ...prestataireSelectionne, email: e.target.value })} />
            <input type="tel" value={prestataireSelectionne.numero_de_telephone} onChange={(e) => setPrestataireSelectionne({ ...prestataireSelectionne, numero_de_telephone: e.target.value })} />
            <button type="submit">Mettre à Jour</button>
          </form>
        </div>
      )}

      {/* Liste des résultats */}
{prestatairesTrouves.length > 0 && (
  <div>
    <h3>Résultats de la recherche :</h3>
    <ul>
      {prestatairesTrouves.map((p) => (
        <li key={p.id_prestataire}>
          {p.prenom} {p.nom} - {p.email}
          <button onClick={() => handleSelectPrestataire(p)}>Modifier</button>
          <button onClick={() => handleDelete(p.id_prestataire)}>Supprimer</button>
        </li>
      ))}
    </ul>
  </div>
)}

      
    </div>
  );
}
