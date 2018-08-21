import styled from 'styled-components';

export default styled.input`
  background: none;
  border: 0;
  border-bottom: 1px solid #dedede;
  width: 100%;
  padding: 8px 0;
  font-size: 14px;
  outline: none;
  
  border-bottom: ${props => props.error ? '2px solid red' : '1px solid grey'};
  
  &:focus {
    border-bottom: 2px solid ${props => props.error ? 'red' : '#0164f9 '};
  }
`;

