import React from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import 'styles/Slideshow.css';

import drinkpage from 'assets/images/drinkpage.png';
import notespage from 'assets/images/notespage.png';
import homepage from 'assets/images/homepage.png';

const Slideshow: React.FC = () => {
  return (
    <div className="Slideshow">
      <Slide easing="ease">
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${drinkpage})` }}>{/* <span>Slide 1</span> */}</div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${notespage})` }}>{/* <span>Slide 2</span> */}</div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${homepage})` }}>{/* <span>Slide 3</span> */}</div>
        </div>
      </Slide>
    </div>
  );
};

export default Slideshow;
