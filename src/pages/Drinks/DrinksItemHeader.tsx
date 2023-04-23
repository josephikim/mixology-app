import React from 'react';

import './DrinksItemHeader.css';

const DrinksItemHeader: React.FC = () => {
  return (
    <div className="DrinksItemHeader">
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--1"></div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--2">
        <div className="DrinksItemHeader-item">
          <h5>Drink</h5>
        </div>
      </div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--3">
        <div className="DrinksItemHeader-item">
          <h5>Category</h5>
        </div>
      </div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--4">
        <div className="DrinksItemHeader-item">
          <h5>Alcohol Content</h5>
        </div>
      </div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--5">
        <div className="DrinksItemHeader-item">
          <h5>Serving Glass</h5>
        </div>
      </div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--6">
        <div className="DrinksItemHeader-item">
          <h5>IBA Tags</h5>
        </div>
      </div>
    </div>
  );
};

export default DrinksItemHeader;
