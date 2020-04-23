import React from 'react';
import ItemList from './itemList';
import { mount } from 'enzyme';
import Service from '../../services/service';

describe('Testing <ItemList/>', () => {
  const gotService = new Service();
  const listComponent = mount(<ItemList
    getData={gotService.getAllHouses}
    renderItem={({ name }) => name} />
  );

  it('Click on item list must render all list in 1 instance', () => {
    listComponent.setState({itemList: [{name: 'test1', id: 1}, {name: 'test2', id: 2}]});
    listComponent.find('.list-group-item:first-child').simulate('click');
    expect(listComponent.find('ul')).toHaveLength(1);
  });
});