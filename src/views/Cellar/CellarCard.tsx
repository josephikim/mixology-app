import React, { FC } from 'react';
import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { IBottle } from '../../types';

const { Meta } = Card;

const CellarCard: FC<IBottle> = ({ category, name, producer, country, price, rating }) => {
  return (
    <Card
      className="cellar-card"
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

export default CellarCard;
