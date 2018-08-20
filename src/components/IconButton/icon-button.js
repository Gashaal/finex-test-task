import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #eff0f3;
  outline: none;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
`;
const Icon = styled.img`
  height: 20px;
`;

export default (props) => {
  return (
    <Button onClick={props.clickHandler}>
      <Icon src={props.icon}/>
    </Button>
  )
}