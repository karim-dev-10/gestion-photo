import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../style/planning.css';

export default function PlanningShootings() {
  const [shootings, setShootings] = useState([]);
  const [selectedShooting, setSelectedShooting] = useState(null);
  const [articles, setArticles] = useState([]);
  const [prestataires, setPrestataires] = useState([]);
  const [lieux, setLieux] = useState([]);

  // Charger les shootings, articles, prestataires, et lieux depuis le backend
  useEffect(() => {
    // Charger les shootings
    fetch("http://localhost:3001/api/shootings")
      .then((res) => res.json())
      .then((data) => {
        console.log('data',data)
        setShootings(
          data.map((shooting) => ({
            id: shooting.id,
            title: `${shooting.article} - ${shooting.prestataire}`,
            start: shooting.date,
            extendedProps: {
              lieu: shooting.lieu,
              prestataire: shooting.prestataire,
              article: shooting.article,
              id_article : shooting.id_articles,
              id_prestataire : shooting.id_prestataire,
              id_lieu : shooting.id_lieu
            },
          }))
        );
      })
      .catch((err) => console.error("Erreur de chargement des shootings :", err));

    // Charger les articles
    fetch("http://localhost:3001/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => console.error("Erreur de chargement des articles :", err));

    // Charger les prestataires
    fetch("http://localhost:3001/api/prestataires")
      .then((res) => res.json())
      .then((data) => {
        setPrestataires(data);
      })
      .catch((err) => console.error("Erreur de chargement des prestataires :", err));

    // Charger les lieux
    fetch("http://localhost:3001/api/lieu")
      .then((res) => res.json())
      .then((data) => {
        setLieux(data);
      })
      .catch((err) => console.error("Erreur de chargement des lieux :", err));
  }, []);

  // Gestion du clic sur un événement
  const handleEventClick = (clickInfo) => {
    const { extendedProps, start } = clickInfo.event;
    setSelectedShooting({
      id: clickInfo.event.id,
      date: start,
      ...extendedProps,
    });
  };

  // Mise à jour d'un shooting
  const handleUpdateShooting = async (e) => {
    e.preventDefault();
    console.log(selectedShooting)
  
    const updatedShooting = {
      id: selectedShooting.id,
      article: selectedShooting.id_article, // Assurez-vous que selectedShooting.article contient l'ID correct
      prestataire: selectedShooting.prestataire,
      lieu: selectedShooting.lieu,
      date: selectedShooting.date,
    };
    
  
    try {
      const response = await fetch(`http://localhost:3001/api/shootings/${selectedShooting.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedShooting),
      });
  
      if (response.ok) {
        alert("Shooting modifié avec succès !");
        setSelectedShooting(null);
        window.location.reload(); // Recharge le calendrier
      } else {
        const errorMessage = await response.text();
        alert(`Erreur lors de la modification : ${errorMessage}`);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      alert("Erreur de communication avec le serveur.");
    }
  };
  

  return (
    <div className="planning-shootings">
      <h2>Planning des shootings</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={shootings}
        eventClick={handleEventClick}
      />

      {selectedShooting && (
        <form className="edit-shooting" onSubmit={handleUpdateShooting}>
          <h3>Modifier le shooting</h3>

          <label>
            Article:
            <select
              value={selectedShooting.article || ""}
              onChange={(e) =>
                setSelectedShooting({ ...selectedShooting, article: e.target.value })
              }
            >
              {articles.length === 0 ? (
                <option>Aucun article disponible</option>
              ) : (
                articles.map((article) => (
                  <option key={article.id_articles} value={article.id_articles}>
                    {article.nom}
                  </option>
                ))
              )}
            </select>
          </label>

          <label>
            Prestataire:
            <select
              value={selectedShooting.prestataire || ""}
              onChange={(e) =>
                setSelectedShooting({ ...selectedShooting, prestataire: e.target.value })
              }
            >
              {prestataires.length === 0 ? (
                <option>Aucun prestataire disponible</option>
              ) : (
                prestataires.map((prestataire) => (
                  <option key={prestataire.id_prestataire} value={prestataire.id_prestataire}>
                    {prestataire.prenom} {prestataire.nom}
                  </option>
                ))
              )}
            </select>
          </label>

          <label>
            Lieu:
            <select
              value={selectedShooting.lieu || ""}
              onChange={(e) =>
                setSelectedShooting({ ...selectedShooting, lieu: e.target.value })
              }
            >
              {lieux.length === 0 ? (
                <option>Aucun lieu disponible</option>
              ) : (
                lieux.map((lieu) => (
                  <option key={lieu.id_lieu} value={lieu.id_lieu}>
                    {lieu.adresse} {lieu.code_postal}
                  </option>
                ))
              )}
            </select>
          </label>

          <label>
            Date:
            <input
              type="datetime-local"
              value={new Date(selectedShooting.date).toISOString().slice(0, -1)}
              onChange={(e) =>
                setSelectedShooting({ ...selectedShooting, date: e.target.value })
              }
            />
          </label>

          <button type="submit">Sauvegarder</button>
        </form>
      )}
    </div>
  );
}
