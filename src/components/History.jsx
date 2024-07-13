import { click } from "@testing-library/user-event/dist/click";
import React from "react";
import { useState } from "react";

export default function History(){

    const [showGlobalHistory, setShowGlobalHistory] = useState(false)
    const [showProviderHistory, setShowProvidersHistory] = useState(false)
    const [showProducts, setShowProducts] = useState(false)

    function clickShowGlobalHistory() {
        setShowGlobalHistory(true)
        setShowProvidersHistory(false)
        setShowProducts(false)
    }
    
    function clickShowProviderHistory() {
        setShowGlobalHistory(false)
        setShowProvidersHistory(true)
        setShowProducts(false)
    }
    
    function clickShowProducts() {
        setShowGlobalHistory(false)
        setShowProvidersHistory(false)
        setShowProducts(true)
    }

    function GlobalHistory() {
        return(<h2>Historique des jours de travail global :</h2>)
    }

    function ProvidersHistory() {
        return (<h2>Historique des prestaires :</h2>)
    }

    function ProductsHistory() {
        return (<h2>Historique des articles :</h2>)
    }

    function ProductsHistory() {
        return (
        <>
            <h2>Historique des articles :</h2>
            <div className="articles-category">
                <button>Tout</button>
                <button>Détérioré/perdu</button>
                <button>Non endommagé</button>
            </div>
        </>
        )
    }


    return (
        <>
            <h1>Historique</h1>

            <div className="history-category">
                <button onClick={clickShowGlobalHistory}>Global</button>
                <button onClick={clickShowProviderHistory}>Prestaire</button>
                <button onClick={clickShowProducts}>Articles</button>
            </div>
            
            {showGlobalHistory && <GlobalHistory />}
            {showProviderHistory && <ProvidersHistory />}
            {showProducts && <ProductsHistory />}
        </>
    )
}