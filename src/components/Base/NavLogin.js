import React from 'react';
import '../../styles/Main.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <header>
      <nav>
        <div className="bar">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo">PLAY</div>
          </Link>
          <div className="menu">
            <ul className="topTitle"></ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
