import './App.css';
import Shooting from './components/Shooting'
import Connexion from './components/Connexion';
import Menu from './components/Menu';
import Planning from './components/Planning'
import { useState } from 'react';
import Gestion from './components/Gestion';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour suivre si l'utilisateur est connecté
  const [isPlanning, setIsPlanning] = useState(false);
  const [isGestion, setIsGestion] = useState(false);

  // // Fonction pour gérer la connexion
  const handleLogin = () => {
    setIsLoggedIn(true); // Passe l'état de connexion à "vrai"
  };

  const handlePlanning = () => {
    setIsPlanning(true)
  }

  const handleGestion = () => {
    setIsGestion(true)
  }

  return (
    <div className="gradient-background">
      <Gestion />
      {/* <Planning /> */}
      {/* Affiche Connexion si l'utilisateur n'est pas connecté */}
      {/* {!isLoggedIn && <Connexion onLogin={handleLogin} />} */}
      
      {/* Affiche Planning si l'utilisateur est connecté */}
      {/* <Gestion /> */}
      {isLoggedIn && !isPlanning && !isGestion && (
      <Menu activePlanning={handlePlanning} activeGestion={handleGestion} />
)}

      {isPlanning  && <Shooting /> && <Planning />}
      {isGestion && <Gestion />}
    </div>
  );
}

export default App;