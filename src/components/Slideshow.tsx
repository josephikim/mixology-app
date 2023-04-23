import React from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import 'styles/Slideshow.css';

import drinkpage from 'assets/images/drinkpage.png';
import collectionpage from 'assets/images/collectionpage.png';
import homepage from 'assets/images/homepage.png';

const Slideshow: React.FC = () => {
  return (
    <div className="Slideshow">
      <Slide easing="ease">
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${homepage})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${drinkpage})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${collectionpage})` }}></div>
        </div>
      </Slide>
    </div>
  );
};

export default Slideshow;
