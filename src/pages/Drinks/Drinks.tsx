import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Container } from 'react-bootstrap';

import { useAppSelector } from 'hooks';
import DrinksItemHeader from './DrinksItemHeader';
import DrinksItem from './DrinksItem';

import './Drinks.css';

const Drinks: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [paginatedData, setPaginatedData] = useState<JSX.Element[]>([]);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);
  const drinks = useAppSelector((state) => state.base.drinks);

  useEffect(() => {
    getPaginatedData();
  }, [drinks, offset]);

  const getPaginatedData = () => {
    const slice = drinks.slice(offset, offset + perPage);
    const drinksData = slice.map((drink) => <DrinksItem key={drink.idDrink} drink={drink} />);
    setPaginatedData(drinksData);
    setPageCount(Math.ceil(drinks.length / perPage));
  };

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    const newOffset = (selectedPage * perPage) % drinks.length;
    setOffset(newOffset);
  };

  const renderContent = () => {
    let jsx;
    if (drinks.length) {
      jsx = (
        <div className="drinks-wrapper">
          <DrinksItemHeader />
          <div className="pagination-content">{paginatedData}</div>
          <div className="pagination-ui">
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
      );
    } else {
      jsx = (
        <div className="drinks-wrapper">
          <h4>Loading drinks...</h4>
        </div>
      );
    }
    return jsx;
  };

  return (
    <div className="Drinks">
      <Container>{renderContent()}</Container>
    </div>
  );
};

export default Drinks;
