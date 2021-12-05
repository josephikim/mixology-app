import React, { FC } from 'react';
import { Row, Col } from 'antd';
import { IBottle } from '../../types';
import BottleCard from './CellarCard';

const wines = [
  {
    id: 101,
    category: 'wine',
    name: 'Scarlet Red',
    producer: 'Moms Wineries',
    country: 'US',
    price: 2099,
    style: 'cabernet',
    abv: '13',
    rating: 91,
    vintage: 1999
  },
  {
    id: 102,
    category: 'wine',
    name: 'Mello Yello 3',
    producer: 'Radical Vineyards',
    country: 'US',
    price: 1899,
    style: 'chardonnay',
    abv: '12.5',
    vintage: 2010
  }
];

const spirits = [
  {
    id: 201,
    category: 'spirit',
    name: 'Dukes',
    producer: 'The Duke',
    country: 'US',
    price: 2399,
    rating: 88,
    style: 'bourbon',
    proof: '80'
  },
  {
    id: 202,
    category: 'spirit',
    name: 'Old Flappys',
    producer: 'Grandmas Kitchen',
    country: 'US',
    price: 5699,
    rating: 94,
    style: 'bourbon',
    proof: '95',
    year: 1980
  }
];

const bottles = [...wines, ...spirits];

const CellarDisplay: FC = () => {
  return (
    <div id="cellarDisplay">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {bottles.map((bottle: IBottle) => (
          <Col key={bottle.id} className="gutter-row" span={6}>
            <BottleCard {...bottle} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CellarDisplay;
