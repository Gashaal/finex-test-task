import styled from 'styled-components';

export default styled.input`
  background: none;
  border: 0;
  border-bottom: 1px solid #dedede;
  width: 100%;
  padding: 8px 0;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-bottom: 2px solid #0164f9;
  }
`;