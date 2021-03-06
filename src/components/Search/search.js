import React from 'react';
import styled from 'styled-components';
import Input from '../Input';
import searchIcon from './search.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.img`
  height: 26px;
  margin-right: 10px;
`;

export default (props) => {
  const changeHandler = (event) => {
    props.filter(event.target.value);
  };

  return (
    <Wrapper>
      <SearchIcon src={searchIcon}/>
      <Input type="search" onChange={changeHandler}/>
    </Wrapper>
  )
}