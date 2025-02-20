import { useState } from "react";
import '../style/gestion.css'

// Composant pour les boutons d'action
function Action() {
    return (
        <>
            <button>Ajouter</button>
            <button>Modifier</button>
            <button>Supprimer</button>
        </>
    );
}

export default function Gestion() {
    const [activeSection, setActiveSection] = useState(null);

    // Gestion des clics pour activer une section
    function handleClick(section) {
        setActiveSection(section);
    }

    return (
        <>
            {/* Boutons de navigation */}
            <div className="button-navigation">
                <button onClick={() => handleClick("prestataires")}>Prestataire</button>
                <button onClick={() => handleClick("lieuxShooting")}>Lieux</button>
                <button onClick={() => handleClick("articles")}>Articles</button>
                <button onClick={() => handleClick("decors")}>Décors</button>
            </div>

            <div className="button-action">
            {/* Contenu dynamique selon la section active */}
            {activeSection === "prestataires" && (
                <>
                    <Action />
                    <button>Historique</button>
                </>
            )}
            {activeSection === "lieuxShooting" && (
                <>
                    <Action />
                    <button>Calendrier des réservations</button>
                </>
            )}
            {activeSection === "articles" && (
                <>
                    <Action />
                    <button>État des articles</button>
                    <div className="input-gestion-articles">
                        <form action="http://localhost:3001/api/articles" method="POST">
                            <input type="text" name="nom" placeholder="Nom" required/>
                            <select name="statut_photographie" required>
                                <option value="" disabled selected>Choissisez un statut</option>
                                <option value="1">Photographié</option>
                                <option value="0">Non photographié</option>
                            </select>
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                </>
            )}
            {activeSection === "decors" && (
                <>
                    <Action />
                    <button>Gestion des articles inclus</button>
                </>
            )}
            </div>
        </>
    );
}
