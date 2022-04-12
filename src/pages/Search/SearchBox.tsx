import React from 'react';
import { Input, Space } from 'antd';

import { useAppDispatch } from '../../hooks';
import { getSearchResults } from '../../store/userSlice';

const { Search } = Input;

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const onSearch = (value: string): void => {
    dispatch(getSearchResults(value));
  };

  return (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        allowClear
        onSearch={(value) => onSearch(value)}
        style={{ width: 250 }}
        enterButton
      />
    </Space>
  );
};

export default SearchBox;
