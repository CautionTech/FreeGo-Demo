import React from 'react';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      <a target="_blank" href="https://cautiontechllc.com">
        &copy; Caut!on Tech, LLC 
      </a>
      <img src={process.env.PUBLIC_URL + '/img/caution.jfif'} alt="caution_tech_logo" width="30" height="30"/>
    </footer>
  );
}

export default Footer;
