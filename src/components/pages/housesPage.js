import React, { Component } from 'react';
import Service from '../../services/service';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import { withRouter } from 'react-router-dom';

class HousesPage extends Component {
  gotService = new Service();

  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }
  
  render() {
    const { error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    return (
      <ItemList 
        onItemSelected={(itemId) => {
          this.props.history.push(itemId);
        }}
        getData={this.gotService.getAllHouses}
        renderItem={(item) => item.name}
      />
    );
  };
}

export default withRouter(HousesPage);