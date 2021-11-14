import React, { FC } from 'react';
import { Layout } from 'antd';
import { IBottle } from '../models';

const { Content } = Layout;

const BottleInfo: FC<IBottle> = ({ category, name, producer, country, price, rating }) => (
  <Layout className="layout">
    <Content>
      <div className="site-layout-content">
        <p>{category}</p>
        <p>{name}</p>
        <p>{producer}</p>
        <p>{country}</p>
        <p>{price}</p>
        <p>{rating}</p>
      </div>
    </Content>
  </Layout>
);

export default BottleInfo;
