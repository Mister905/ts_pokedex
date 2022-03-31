import React from "react";
import pokemon from "../../assets/images/pokemon.png";

function Header() {
  return (
    <nav className="custom-nav">
      <div className="nav-wrapper">
        <a href="#" className="brand-logo center">
          <img src={pokemon} />
        </a>
      </div>
    </nav>
  );
}

export default Header;
