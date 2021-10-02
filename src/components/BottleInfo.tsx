import React, { FC } from 'react';
import { Layout } from 'antd';
import { Bottle } from '../models';

// import '../styles/BottleInfo.css';

const { Content } = Layout;

const BottleInfo: FC<Bottle> = ({ category, name, producer, country, price, rating }) => (
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
