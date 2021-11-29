import React, { FC } from 'react';

// import '../styles/BottleImage.scss';

interface IBottleImageProps {
  imgSrc: string;
}

const BottleImage: FC<IBottleImageProps> = ({ imgSrc }) => (
  <div>
    <img src={imgSrc} />
  </div>
);

export default BottleImage;
