import React from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import 'styles/Slideshow.css';

const slideImages = ['src/assets/drinkpage.png', 'src/assets/notespage.png', 'src/assets/homepage.png'];

const Slideshow: React.FC = () => {
  return (
    <div className="Slideshow">
      <Slide easing="ease">
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[0]})` }}>{/* <span>Slide 1</span> */}</div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[1]})` }}>{/* <span>Slide 2</span> */}</div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[2]})` }}>{/* <span>Slide 3</span> */}</div>
        </div>
      </Slide>
    </div>
  );
};

export default Slideshow;
