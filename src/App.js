import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import TableToolbar from './components/TableToolbar';
import Table from './components/Table';
import Chart from './components/Chart';
import {sort, edit, cancel, filter, change, save, validate, toggleCurrency} from './actions';


class App extends Component {
  render() {
    return (
      <div>
        <TableToolbar title="Каталог" filter={this.props.filter}/>
        <Table {...this.props}/>
        <Chart data={this.props.filteredData}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps (dispatch) {
  return {
    sort: (orderField) => {
      dispatch(sort(orderField));
    },
    edit: (id) => {
      dispatch(edit(id));
    },
    cancel: (id) => {
      dispatch(cancel(id));
    },
    save: (id) => {
      dispatch(save(id));
    },
    change: (id, field, value) => {
      dispatch(change(id, field, value));
    },
    validate: (id, field, value) => {
      dispatch(validate(id, field, value));
    },
    toggleCurrency: () => {
      dispatch(toggleCurrency());
    },
    filter: (value) => {
      dispatch(filter(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
