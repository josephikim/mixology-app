import React from 'react';

import './DrinksItemHeader.css';

const DrinksItemHeader: React.FC = () => {
  return (
    <div className="DrinksItemHeader">
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--1"></div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--2">
        <div className="DrinksItemHeader-item">
          <h4>Drink</h4>
        </div>
      </div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--3">
        <div className="DrinksItemHeader-item">
          <h4>Category</h4>
        </div>
      </div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--4">
        <div className="DrinksItemHeader-item">
          <h4>Alcohol Content</h4>
        </div>
      </div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--5">
        <div className="DrinksItemHeader-item">
          <h4>Serving Glass</h4>
        </div>
      </div>
      <div className="DrinksItemHeader-cell DrinksItemHeader-cell--6">
        <div className="DrinksItemHeader-item">
          <h4>IBA Tags</h4>
        </div>
      </div>
    </div>
  );
};

export default DrinksItemHeader;
