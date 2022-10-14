import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import style from './footer.module.css';

function Footer() {
  return (
    <footer
      className={ style.footerClass }
      data-testid="footer"
    >
      <Link
        to="/drinks"
      >
        <img src={ drinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
      </Link>
      <Link
        to="/explore"
      >
        <img src={ exploreIcon } alt="explore" data-testid="explore-bottom-btn" />
      </Link>
      <Link
        to="/foods"
      >
        <img src={ mealIcon } alt="profile" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
