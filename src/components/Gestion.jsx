import { useState } from "react"
export default function Gestion() {
    const [showProvider, setShowProvider] = useState(false)
    function clickShowProvider() {
        setShowProvider(true)
        setShowLieuxShooting(false)
        setShowDecors(false)
        setShowArticles(false)
    }
    const [showLieuxShooting, setShowLieuxShooting] = useState(false)
    function clickShowLieuxShooting() {
        setShowProvider(false)
        setShowLieuxShooting(true)
        setShowDecors(false)
        setShowArticles(false)
    }
    const [showArticles, setShowArticles] = useState(false)
    function clickShowArticles() {
        setShowProvider(false)
        setShowLieuxShooting(false)
        setShowDecors(false)
        setShowArticles(true)
    }
    const [showDecors, setShowDecors] = useState(false)
    function clickShowDecors() {
        setShowProvider(false)
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
                <button onClick={clickShowProvider}>Prestataire</button>
                <button onClick={clickShowLieuxShooting}>Lieux de Shooting</button>
                <button onClick={clickShowArticles}>Articles</button>
                <button onClick={clickShowDecors}>Décors</button>
            </div>
            {showProvider && (
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