import React from 'react';
import { Input, Space } from 'antd';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSearchResults } from '../../store/userSlice';

const { Search } = Input;

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const searchResults = useAppSelector((state) => state.user.searchResults);

  const onSearch = (value): void => {
    dispatch(getSearchResults(value));
  };

  return (
    <Space direction="vertical">
      <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 250 }} enterButton />
    </Space>
  );
};

export default SearchBox;
