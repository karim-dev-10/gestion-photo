import React, { useState, useEffect } from "react";
import '../style/shooting.css'

export default function PlanifierShooting() {
    const [articles, setArticles] = useState([]);
    const [lieux, setLieux] = useState([]);
    const [prestataires, setPrestataires] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedLieu, setSelectedLieu] = useState(null);
    const [selectedPrestataire, setSelectedPrestataire] = useState(null);
    const [dateShooting, setDateShooting] = useState("");

    useEffect(() => {
        //fetch sert a recuperer des données
        fetch("http://localhost:3001/api/articles")
            //then signifie alors ... Ici, alors la réponse va etre transformer en format JSON 
            .then(res => res.json())
            .then(data => {
                console.log("Articles :", data);
                setArticles(data);
            })
            .catch(err => console.error("Erreur articles :", err));

        fetch("http://localhost:3001/api/lieu")
            .then(res => res.json())
            .then(data => {
                console.log("Lieux :", data);
                setLieux(data);
            })
            .catch(err => console.error("Erreur lieux :", err));

        fetch("http://localhost:3001/api/prestataires")
            .then(res => res.json())
            .then(data => {
                console.log("Prestataires :", data);
                setPrestataires(data);
            })
            .catch(err => console.error("Erreur prestataires :", err));
    }, []);

    // Charger les données des articles, lieux, et prestataires

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/shootings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date_shooting: dateShooting,
                id_lieu: selectedLieu,
                id_articles: selectedArticle,
                id_prestataire: selectedPrestataire,
            }),
        });

        if (response.ok) {
            alert("Shooting planifié avec succès !");
        } else {
            alert("Erreur lors de la planification.");
        }
    };

    return (
        <form className="add-shooting" onSubmit={handleSubmit}>
            <h2>Planifier un shooting</h2>

            <div className="select-shooting">
                <select onChange={(e) => setSelectedArticle(e.target.value)}>
                    <option value="">Sélectionner un article</option>
                    {articles.map((article) => (
                        <option key={article.id_articles} value={article.id_articles}>
                            {article.nom}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setSelectedLieu(e.target.value)}>
                    <option value="">Sélectionner un lieu</option>
                    {lieux.map((lieu) => (
                        <option key={lieu.id_lieu} value={lieu.id_lieu}>
                            {lieu.adresse} ({lieu.code_postal})
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setSelectedPrestataire(e.target.value)}>
                    <option value="">Sélectionner un prestataire</option>
                    {prestataires.map((prestataire) => (
                        <option key={prestataire.id_prestataire} value={prestataire.id_prestataire}>
                            {prestataire.prenom} {prestataire.nom}
                        </option>
                    ))}
                </select>

                <input
                    type="datetime-local"
                    value={dateShooting}
                    onChange={(e) => setDateShooting(e.target.value)}
                />
            </div>
            <button type="submit">Planifier</button>
        </form>
    );
}
