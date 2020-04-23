import React, { Component } from 'react';
import Service from '../../services/service';
import ItemDetails, { Field } from '../itemDetails';

export default class BooksItem extends Component {
  gotService = new Service();

  render() {
    return (
      <ItemDetails 
        itemId={this.props.bookId}
        getData={this.gotService.getBook}
        history={this.props.history}
      >
          <Field field="numberOfPages" label="Number Of Pages" />
          <Field field="publiser" label="Publiser" />
          <Field field="released" label="Released" />
      </ItemDetails>
    );
  };
}
