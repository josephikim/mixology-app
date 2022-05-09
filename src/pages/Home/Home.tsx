import React from 'react';
import { Container } from 'react-bootstrap';

import KeywordLinks from '../../components/KeywordLinks';
import RandomDrink from '../../components/RandomDrink';

import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="Home">
      <Container>
        <div className="home-cell home-cell--1">
          <div className="home-item">
            <RandomDrink />
          </div>
        </div>
        <div className="home-cell home-cell--2">
          <div className="home-item">
            <KeywordLinks type="category" />
          </div>
        </div>
        <div className="home-cell home-cell--3">
          <div className="home-item">
            <KeywordLinks type="ingredient" />
          </div>
        </div>
        <div className="home-cell home-cell--4">
          <div className="home-item">
            <KeywordLinks type="glass" />
          </div>
        </div>
        <div className="home-cell home-cell--5">
          <div className="fp-item">
            <KeywordLinks type="alcohol" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
