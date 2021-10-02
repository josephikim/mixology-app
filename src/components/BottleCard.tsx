import React, { FC } from 'react';
import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Bottle } from '../models';

import '../styles/BottleCard.css';

const { Meta } = Card;

const BottleCard: FC<Bottle> = ({ category, name, producer, country, price, rating }) => {
  return (
    <Card
      className="bottleCard"
      cover={
        <img alt="example" src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/wine.png" />
      }
      actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
    >
      <Meta title={name} description={price} />

      <div>
        <p>{category}</p>
        <p>{producer}</p>
        <p>{country}</p>
        <p>{price}</p>
        <p>{rating}</p>
      </div>
    </Card>
  );
};

export default BottleCard;
