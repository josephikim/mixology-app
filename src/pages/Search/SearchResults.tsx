import React from 'react';
import { useSelector } from 'react-redux';
import { Space, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { RootState } from 'src/store';

import './SearchResults.css';

const { Meta } = Card;

const SearchResults: React.FC = () => {
  const searchResults = useSelector((state: RootState) => state.user.searchResults);

  return (
    <div className="SearchResults">
      <Space wrap align="start" size="middle" style={{ display: 'flex' }}>
        {searchResults
          ? searchResults.map((result) => {
              return (
                <Card
                  id={`card-${result.drinkId}`}
                  style={{ width: 300 }}
                  cover={<img alt="example" src={result.drinkThumbSrc} />}
                  actions={[<PlusOutlined key="add" />]}
                >
                  <Meta
                    key={`card-meta-${result.drinkId}`}
                    title={result.drinkName}
                    description={result.drinkInstructions}
                  />
                </Card>
              );
            })
          : null}
      </Space>
    </div>
  );
};

export default SearchResults;
