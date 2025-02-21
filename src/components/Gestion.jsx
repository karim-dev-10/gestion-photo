import { useState } from "react";
import Prestataire from "./Prestataires";
import Lieu from "./Lieu"
import '../style/gestion.css'
import Article from "./Article";

// Composant pour les boutons d'action
function Action() {
    return (
        <>
            <button>➕</button>
        </>
    );
}

export default function Gestion() {
    const [activeSection, setActiveSection] = useState(null);

    const [select, setSelected] = useState()

    // Gestion des clics pour activer une section
    function handleClick(section) {
        setSelected(section)
        setActiveSection(section);
    }

    return (
        <>
            {/* Boutons de navigation */}
            <div className="button-navigation">
                <button onClick={() => handleClick("prestataires")} className={select === "prestataires" ? "select-black" : ""}>Prestataire</button>
                <button onClick={() => handleClick("lieuxShooting")} className={select === "lieuxShooting" ? "select-black" : ""}>Lieux</button>
                <button onClick={() => handleClick("articles")} className={select === "articles" ? "select-black" : ""}>Articles</button>
            </div>

            <div className="button-action">
            {/* Contenu dynamique selon la section active */}
            {activeSection === "prestataires" && (
                <>
                    <div className="button-option">
                        <Action />
                        <button>Historique</button>
                    </div>
                    <Prestataire />
                </>
            )}
            
            {activeSection === "lieuxShooting" && (
                <>
                <div className="button-option">
                    <Action />
                    <button>Calendrier des réservations</button>
                    <Lieu />
                </div>
                </>
            )}

            {activeSection === "articles" && (
                <>
                <Article />
                <div className="button-option">
                    <Action />
                    <button>État des articles</button>
                </div>
                </>
            )}
            </div>
        </>
    );
}
