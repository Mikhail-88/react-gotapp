import React, { Component } from 'react';
import Service from '../../services/service';
import ItemDetails, { Field } from '../itemDetails';

export default class HouseItem extends Component {
  gotService = new Service();

  render() {
    return (
      <ItemDetails 
        itemId={this.props.houseId}
        getData={this.gotService.getHouse}
        history={this.props.history}
      >
          <Field field="region" label="Region" />
          <Field field="words" label="Words" />
          <Field field="founded" label="Founded" />
          <Field field="coatOfArms" label="Coat Of Arms" />
      </ItemDetails>
    );
  };
}