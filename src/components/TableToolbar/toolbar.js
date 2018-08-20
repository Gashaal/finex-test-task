import React from 'react';
import styled from 'styled-components';
import Search from '../Search';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableTitle = styled.h2`
  font-size: 20px;
  font-weight: normal;
`;

export default (props) => {
  return (
    <Wrapper>
      <TableTitle>{props.title}</TableTitle>
      <Search filter={props.filter}/>
    </Wrapper>
  )
}