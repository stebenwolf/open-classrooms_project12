import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

import '../styles/Header.css';

function Header() {
    return (
        <header className="App-header">
            <NavLink to="/">
                <img src={logo} className="App-logo" alt="logo" />
            </NavLink>
            <nav>
            
                <NavLink to="/" className={(navData) => navData.isActive? "active" : ""}>Accueil</NavLink>{" "}
                <NavLink to="/" className={(navData) => navData.isActive? "userNav active" : "userNav"}>Profil</NavLink>{" "}
                <NavLink to="/" className={(navData) => navData.isActive? "active" : ""}>Réglages</NavLink>{" "}
                <NavLink to="/" className={(navData) => navData.isActive? "active" : ""}>Communauté</NavLink>
            </nav>
      </header>
    )
}

export default Header;