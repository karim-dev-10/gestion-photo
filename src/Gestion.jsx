import { useState } from "react"
export default function Gestion() {
    const [showPrestataires, setShowPrestataires] = useState(false)
    function clickShowPrestataires() {
        setShowPrestataires(true)
        setShowLieuxShooting(false)
        setShowDecors(false)
        setShowArticles(false)
    }
    const [showLieuxShooting, setShowLieuxShooting] = useState(false)
    function clickShowLieuxShooting() {
        setShowPrestataires(false)
        setShowLieuxShooting(true)
        setShowDecors(false)
        setShowArticles(false)
    }
    const [showArticles, setShowArticles] = useState(false)
    function clickShowArticles() {
        setShowPrestataires(false)
        setShowLieuxShooting(false)
        setShowDecors(false)
        setShowArticles(true)
    }
    const [showDecors, setShowDecors] = useState(false)
    function clickShowDecors() {
        setShowPrestataires(false)
        setShowLieuxShooting(false)
        setShowDecors(true)
        setShowArticles(false)
    }
    function Action() {
        return(
            <>
                <button>Ajouter</button>
                <button>Modifier</button>
                <button>Supprimer</button>
            </>
        )
    }
    return(
        <>
            <div>
                <button onClick={clickShowPrestataires}>Prestataire</button>
                <button onClick={clickShowLieuxShooting}>Lieux de Shooting</button>
                <button onClick={clickShowArticles}>Articles</button>
                <button onClick={clickShowDecors}>Décors</button>
            </div>
            {showPrestataires && (
                <>
                <Action/>
                <button> Historique de travail</button>
                </>
            )}
            {showLieuxShooting && (
                <>
                <Action/>
                <button> Calendrier des réservations</button>
                </>
            )}
            {showArticles && (
                <>
                <Action/>
                <button> État des articles</button>
                </>
            )}
            {showDecors && (
                <>
                <Action/>
                <button> Gestion des articles inclus</button>
                </>
            )}
        </>
)
}