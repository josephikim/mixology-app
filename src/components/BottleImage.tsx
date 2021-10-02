import React, { FC } from 'react';

// import '../styles/BottleImage.scss';

interface BottleImageProps {
  imgSrc: string;
}

const BottleImage: FC<BottleImageProps> = ({ imgSrc }) => (
  <div>
    <img src={imgSrc} />
  </div>
);

export default BottleImage;
