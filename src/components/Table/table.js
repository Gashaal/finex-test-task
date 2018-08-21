import React from 'react';
import styled from 'styled-components';
import Toggle from 'react-toggle';

import Input from '../Input';
import IconButton from '../IconButton';

import ascIcon from './asc.svg';
import descIcon from './desc.svg';
import editIcon from './edit.svg';
import saveIcon from './save.svg';
import cancelIcon from './cancel.svg';
import dollarIcon from './dollar.svg';
import rubleIcon from './ruble.svg';

import "react-toggle/style.css";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Thead = styled.thead`
  background-color: #f8f9fb;
`;

const ColumnTitle = styled.span`
  color: #82868c;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
  
  &:hover {
    color: #53565a;
  }
`;

const SortIcon = styled.img`
  height: 16px;
  margin-left: 2px;
  vertical-align: middle;
`;

const Td = styled.td`
  text-align: center;
  padding: 10px;
`;

const TdWidthToggle = Td.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  
  label {
    margin-left: 5px;
  }
`;

const TdAmount = Td.extend`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tbody = styled.tbody`
  td {
    border-bottom: 2px solid #f5f7f9;
  }
`;

const ControlsWrapper = styled.div`
  button {
    margin-left: 10px;
  }
  
  button:first-child {
    margin-left: 0;    
  }
`;

export default (props) => {
  const {filteredData, editingData, errors, orderField, orderBy, sort, edit, cancel, change, save, validate} = props;
  const tableData = Object.keys(filteredData).map((id) => {return filteredData[id]});

  const getSorting = (orderField, orderBy) => {
    let sortDesc = (a, b) => b[orderField] - a[orderField];
    let sortAsc = (a, b) => a[orderField] - b[orderField];

    // TODO - сортировка с name
    if (orderField === 'name') {
      sortDesc = (a, b) => {return b[orderField] > a[orderField]};
      sortAsc = (a, b) => {return a[orderField] > b[orderField]};
    }

    return orderBy === 'desc' ? sortDesc : sortAsc;
  };
  const sortIconSrc = orderBy === 'desc' ? descIcon: ascIcon;

  const changeHandler = (event, id, field) => {
    change(id, field, event.target.value);
    validate(id, field, event.target.value);
  };

  const tdWithInput = (editingData, row, field) => {
    let error = false;
    if (Array.isArray(errors[row.id]) && errors[row.id].indexOf(field) !== -1) {
      error = true;
    }

    const handler = (event) => changeHandler(event, row.id, field);
    const input = (value) => <Input type="number" min="0" onChange={handler} value={value} error={error}/>;
    return (
      <Td>{editingData[row.id] ? input(editingData[row.id][field]) : row[field]}</Td>
    )
  };

  return (
    <Table>
      <Thead>
        <tr>
          <Td>
            <ColumnTitle onClick={() => {sort('name')}}>Название</ColumnTitle>
            {orderField === 'name' && (<SortIcon src={sortIconSrc}/>)}
          </Td>
          <Td>
            <ColumnTitle onClick={() => {sort('quantity')}}>Количество</ColumnTitle>
            {orderField === 'quantity' && (<SortIcon src={sortIconSrc}/>)}
          </Td>
          <TdWidthToggle>
            <ColumnTitle onClick={() => {sort('price')}}>Стоимость</ColumnTitle>
            {orderField === 'price' && (<SortIcon src={sortIconSrc}/>)}

            <label>
              <Toggle
                defaultChecked={true}
                className='toggle-currency'
                icons={{
                  checked: <img src={rubleIcon} width="14px"/>,
                  unchecked: <img src={dollarIcon} width="14px"/>,
                }}
                onChange={props.toggleCurrency}
                 />
            </label>
          </TdWidthToggle>
          <Td></Td>
        </tr>
      </Thead>
      <Tbody>
        {tableData.sort(getSorting(orderField, orderBy)).map((row) => {
          return (
              <tr key={row.id}>
                <Td>{row.name}</Td>
                {tdWithInput(editingData, row, 'quantity')}
                {tdWithInput(editingData, row, 'price')}

                <Td>
                  {editingData[row.id] ?
                    (<ControlsWrapper>
                    <IconButton icon={saveIcon} clickHandler={() => {save(row.id)}}/>
                    <IconButton icon={cancelIcon} clickHandler={() => {cancel(row.id)}}/>
                    </ControlsWrapper>)
                    : (<IconButton icon={editIcon} clickHandler={() => {edit(row.id)}}/>)}
                </Td>
              </tr>
            )
        })}
      </Tbody>
      <tfoot>
        <tr>
          <Td></Td><Td></Td><Td></Td>
          <TdAmount>
            <span>Сумма: {props.amount}</span>
            <img src={props.currency === 'ruble' ? rubleIcon : dollarIcon} width="14px"/>
          </TdAmount>
        </tr>
      </tfoot>
    </Table>
  )
}
