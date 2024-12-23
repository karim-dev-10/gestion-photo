import React from "react";
import '../style/menu.css'

export default function Menu({activePlanning, activeGestion}) {
    return (
        <>
            <h1> Bienvenue sur Gestion Photo</h1>

            <div className="redirection">
                <button className="redirection-calendar" onClick={activePlanning}>Calendrier</button>
                <button className="redirection-gestion" onClick={activeGestion}>Gestion</button>
            </div>

        </>
    )
}