import { useState, useEffect } from "react";
import '../style/gestion.css'

export default function Gestion() {
    const [activeSection, setActiveSection] = useState(null);
    const [prestataires, setPrestataires] = useState([]);
    const [lieux, setLieux] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fonction pour charger les données en fonction de la section sélectionnée
    const loadData = (section) => {
        setLoading(true); // Démarrer le chargement
        let url = "";

        // Déterminer l'URL selon la section
        switch (section) {
            case "prestataires":
                url = "http://localhost:3001/api/prestataires";
                break;
            case "lieuxShooting":
                url = "http://localhost:3001/api/lieu";
                break;
            case "articles":
                url = "http://localhost:3001/api/articles";
                break;
            default:
                setLoading(false);
                return;
        }

        // Charger les données depuis l'API
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (section === "prestataires") {
                    setPrestataires(data);
                } else if (section === "lieuxShooting") {
                    setLieux(data);
                } else if (section === "articles") {
                    setArticles(data);
                }
                setLoading(false); // Fin du chargement
            })
            .catch((error) => {
                console.error("Erreur de chargement des données :", error);
                setLoading(false);
            });
    };

    // Gestion des clics pour activer une section
    function handleClick(section) {
        setActiveSection(section);
        loadData(section); // Charger les données quand une section est activée
    }

    return (
        <>
            {/* Boutons de navigation */}
            <div className="button-navigation">
                <button onClick={() => handleClick("prestataires")}>Prestataire</button>
                <button onClick={() => handleClick("lieuxShooting")}>Lieux de Shooting</button>
                <button onClick={() => handleClick("articles")}>Articles</button>
            </div>

            {/* Contenu dynamique selon la section active */}
            {activeSection === "prestataires" && (
                <>
                    <button className="button-gestion">Historique de travail</button>
                    {loading ? (
                        <p>Chargement des prestataires...</p>
                    ) : (
                        
                        <ul>
                            {prestataires.map((prestataire) => (
                                <div className="gestion-li-map" key={prestataire.id_prestataire}>
                                    <span>{prestataire.prenom} {prestataire.nom}</span>

                                    <button className="icon-button edit">
                                        ✏️
                                    </button>

                                    {/* Icône de suppression (croix rouge) */}
                                    <button className="icon-button delete">
                                        ❌
                                    </button>
                                </div>
                            ))}
                        </ul>
                    )}
                </>
            )}

            {activeSection === "lieuxShooting" && (
                <>
                    <button className="button-gestion">Calendrier des réservations</button>
                    {loading ? (
                        <p>Chargement des lieux...</p>
                    ) : (
                        <ul>
                            {lieux.map((lieu) => (
                                <div className="gestion-li-map" key={lieu.id_lieu}>
                                   <span> {lieu.adresse} {lieu.code_postal} </span>
                                     {/* Icône de modification (crayon) */}
                                     <button className="icon-button edit">
                                        ✏️
                                    </button>

                                    {/* Icône de suppression (croix rouge) */}
                                    <button className="icon-button delete">
                                        ❌
                                    </button>
                                </div>
                            ))}
                        </ul>
                    )}
                </>
            )}

            {activeSection === "articles" && (
                <>
                    <button className="button-gestion">État des articles</button>
                    {loading ? (
                        <p>Chargement des articles...</p>
                    ) : (
                        <ul>
                            {articles.map((article) => (
                                <div key={article.id_articles} className="gestion-li-map">
                                    <span>{article.nom} - {article.statut_photographie ? 'Photographié' : 'Non photographié'}</span>

                                    {/* Icône de modification (crayon) */}
                                    <button className="icon-button edit">
                                        ✏️
                                    </button>

                                    {/* Icône de suppression (croix rouge) */}
                                    <button className="icon-button delete">
                                        ❌
                                    </button>
                                </div>
                            ))}
                        </ul>
                    )}
                    {/* <div className="input-gestion-articles">
                            <form action="http://localhost:3001/api/articles" method="POST">
                                <input type="text" name="nom" placeholder="Nom" required />
                                <select name="statut_photographie" required>
                                    <option value="" disabled selected>Choisissez un statut</option>
                                    <option value="1">Photographié</option>
                                    <option value="0">Non photographié</option>
                                </select>
                                <button type="submit">Valider</button>
                            </form>
                        </div> */}
                </>
            )}
        </>
    );
}
