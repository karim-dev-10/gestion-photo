import React, { useState } from "react";

export default function Lieu() {
  // États pour l'ajout
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [nom, setNom] = useState("");  // Remplacement de 'ville' par 'nom'

  // États pour la recherche et la modification
  const [searchNom, setSearchNom] = useState("");  // Remplacement de 'searchVille' par 'searchNom'
  const [lieuxTrouves, setLieuxTrouves] = useState([]);
  const [lieuSelectionne, setLieuSelectionne] = useState(null);

  // Ajouter un lieu
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { adresse, code_postal: codePostal, nom };  // 'nom' au lieu de 'ville'

    fetch("http://localhost:3001/api/lieu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        setAdresse("");
        setCodePostal("");
        setNom("");  // Réinitialiser 'nom'
      })
      .catch((error) => console.error("Erreur:", error));
  };

  // Rechercher des lieux par nom
  const handleSearch = () => {
    fetch(`http://localhost:3001/api/lieu?nom=${searchNom}`)  // Remplacer 'ville' par 'nom' dans l'URL
      .then((res) => res.json())
      .then((data) => setLieuxTrouves(data))
      .catch((error) => console.error("Erreur de recherche:", error));
  };

  // Sélectionner un lieu pour modification
  const handleSelectLieu = (lieu) => {
    setLieuSelectionne(lieu);
  };

  // Mettre à jour un lieu
  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedData = {
      adresse: lieuSelectionne.adresse,
      code_postal: lieuSelectionne.code_postal,
      nom: lieuSelectionne.nom,  // 'nom' au lieu de 'ville'
    };

    fetch(`http://localhost:3001/api/lieu/${lieuSelectionne.id_lieu}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        setLieuSelectionne(null);
        setSearchNom("");  // Réinitialiser 'searchNom'
        setLieuxTrouves([]);
      })
      .catch((error) => console.error("Erreur de mise à jour:", error));
  };

  // Supprimer un lieu
  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce lieu ?")) {
      fetch(`http://localhost:3001/api/lieu/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          alert(result.message);
          setLieuxTrouves(lieuxTrouves.filter((lieu) => lieu.id_lieu !== id));
        })
        .catch((error) => console.error("Erreur de suppression:", error));
    }
  };

  return (
    <div>
      {/* Formulaire d'Ajout */}
      <h2>Ajouter un Lieu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        />
        <input
          type="text"
          placeholder="Code Postal"
          value={codePostal}
          onChange={(e) => setCodePostal(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom"
          value={nom}  // 'nom' au lieu de 'ville'
          onChange={(e) => setNom(e.target.value)}  // 'setNom' au lieu de 'setVille'
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* Recherche de lieu */}
      <h2>Rechercher un Lieu</h2>
      <input
        type="text"
        placeholder="Nom"
        value={searchNom}  // 'searchNom' au lieu de 'searchVille'
        onChange={(e) => setSearchNom(e.target.value)}  // 'setSearchNom' au lieu de 'setSearchVille'
      />
      <button onClick={handleSearch}>Rechercher</button>

      {/* Liste des résultats */}
      {lieuxTrouves.length > 0 && (
        <div>
          <h3>Résultats de la recherche :</h3>
          <ul>
            {lieuxTrouves.map((l) => (
              <li key={l.id_lieu}>
                {l.adresse} - {l.code_postal} - {l.nom}  {/* 'nom' au lieu de 'ville' */}
                <button onClick={() => handleSelectLieu(l)}>Modifier</button>
                <button onClick={() => handleDelete(l.id_lieu)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Formulaire de Modification */}
      {lieuSelectionne && (
        <div>
          <h2>Modifier le Lieu</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={lieuSelectionne.adresse}
              onChange={(e) =>
                setLieuSelectionne({ ...lieuSelectionne, adresse: e.target.value })
              }
            />
            <input
              type="text"
              value={lieuSelectionne.code_postal}
              onChange={(e) =>
                setLieuSelectionne({ ...lieuSelectionne, code_postal: e.target.value })
              }
            />
            <input
              type="text"
              value={lieuSelectionne.nom}  // 'nom' au lieu de 'ville'
              onChange={(e) =>
                setLieuSelectionne({ ...lieuSelectionne, nom: e.target.value })  // 'setNom' au lieu de 'setVille'
              }
            />
            <button type="submit">Mettre à Jour</button>
          </form>
        </div>
      )}
    </div>
  );
}
