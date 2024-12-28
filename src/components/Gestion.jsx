import { useState, useEffect } from "react";
import '../style/gestion.css'

export default function Gestion() {
    const [activeSection, setActiveSection] = useState(null);
    const [prestataires, setPrestataires] = useState([]);
    const [selectedPrestataire, setSelectedPrestataire] = useState([])
    const [lieux, setLieux] = useState([]);
    const [selectedLieu, setSelectedLieu] = useState([])
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState([])
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(null)
    const [activePopUP, setActivePopUp] = useState(false)

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

    function handleEditPrestataire(prestataire) {
        setSelectedPrestataire(prestataire)
        setOpenEdit("prestataire")
        setActivePopUp(true)
    }

    function handleEditLieu(lieu) {
        setSelectedLieu(lieu)
        setOpenEdit("lieu")
        setActivePopUp(true)
    }

    function handleEditArticle(article) {
        setSelectedArticle(article)
        setOpenEdit("article")
        setActivePopUp(true)
    }

    function handlePopUp() {
        setActivePopUp(false)
    }

    // Fonction de gestion de la soumission de modification de prestataire
    function handleSubmitPrestataire(e) {
        e.preventDefault();
        setLoading(true);

        // Prépare les données à envoyer
        const updatedPrestataire = selectedPrestataire;

        // Envoi de la requête PUT au serveur pour modifier le prestataire
        fetch(`http://localhost:3001/api/prestataires/${selectedPrestataire.id_prestataire}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPrestataire),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    // Mise à jour réussie, fermer la popup
                    alert(data.message);
                    setActivePopUp(false);
                    loadData('prestataires'); // Recharger les données pour afficher les changements
                } else {
                    // Affichage des erreurs
                    alert('Erreur de mise à jour');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erreur:', error);
                setLoading(false);
                alert('Erreur serveur');
            });
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
                                    <span>{prestataire.prenom} {prestataire.nom} | {prestataire.email} | 0{prestataire.numero_de_telephone} </span>

                                    <button className="icon-button edit" onClick={() => { handleEditPrestataire(prestataire) }}>
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
                                    <button className="icon-button edit" onClick={() => { handleEditLieu(lieu) }}>
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
                                    <button className="icon-button edit" onClick={() => { handleEditArticle(article) }}>
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

            {activePopUP && openEdit === "prestataire" && (
                <div>

                    <div className="overlay">
                        <div className="form-container">
                            <form className="form-edit-gestion" onSubmit={handleSubmitPrestataire}>
                                <h3>Modifier un prestataire</h3>
                                <button type="button" className="button-close" onClick={() => { handlePopUp() }}>❌</button>
                                <label>
                                    Prénom :
                                    <input type="text" value={selectedPrestataire.prenom} onChange={(e) => { setSelectedPrestataire({ ...selectedPrestataire, prenom: e.target.value }) }} />
                                </label>

                                <label>
                                    Nom :
                                    <input type="text" value={selectedPrestataire.nom} onChange={(e) => { setSelectedPrestataire({ ...selectedPrestataire, nom: e.target.value }) }} />
                                </label>

                                <label>
                                    E-mail :
                                    <input type="text" value={selectedPrestataire.email} onChange={(e) => { setSelectedPrestataire({ ...selectedPrestataire, email: e.target.value }) }} />
                                </label>

                                <label>
                                    Numéro de téléphone :
                                    <input type="text" value={selectedPrestataire.numero_de_telephone} onChange={(e) => { setSelectedPrestataire({ ...selectedPrestataire, numero_de_telephone: e.target.value }) }} />
                                </label>


                                <button type="submit" className="button-valid-edit">Valider</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {activePopUP && openEdit === "lieu" && (
                <div>
                    <div className="overlay">
                        <div className="form-container">
                            <form className="form-edit-gestion">
                                <h3>Modifier un lieu</h3>
                                <button type="button" className="button-close" onClick={() => { handlePopUp() }}>❌</button>
                                <label>
                                    Adresse :
                                    <input type="text" value={selectedLieu.adresse} onChange={(e) => { setSelectedLieu({ ...selectedLieu, adresse: e.target.value }) }} />
                                </label>

                                <label>
                                    Code postal :
                                    <input type="text" value={selectedLieu.code_postal} onChange={(e) => { selectedLieu({ ...selectedLieu.code_postal, code_postal: e.target.value }) }} />
                                </label>

                                <button type="submit" className="button-valid-edit">Valider</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {activePopUP && openEdit === "article" && (

                <div>
                    <div className="overlay">
                        <div className="form-container">
                            <form className="form-edit-gestion" action="">
                                <h3> Modifier un article </h3>
                                <button type="button" className="button-close" onClick={() => { handlePopUp() }}>❌</button>
                                <label>
                                    Nom :
                                    <input type="text" value={selectedArticle.nom} onChange={(e) => { setSelectedArticle({ ...selectedArticle, nom: e.target.value }) }} />
                                </label>

                                <label>
                                    Photographié :
                                    <select
                                        value={selectedArticle.statut_photographie}
                                        onChange={(e) =>
                                            setSelectedArticle({
                                                ...selectedArticle,
                                                statut_photographie: parseInt(e.target.value, 10), // Convertir en entier
                                            })
                                        }
                                    >
                                        <option value={1}>Photographié</option>
                                        <option value={0}>Non photographié</option>
                                    </select>
                                </label>

                                <button type="submit" className="button-valid-edit">Valider</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
