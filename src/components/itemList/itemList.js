import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import { Button } from 'reactstrap';

export default class ItemList extends Component {
    state = {
        itemList: null,
        error: false,
    }

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then(itemList => this.setState({itemList}))
            .catch(this.onError);
    }

    componentDidCatch() {
        this.setState({
            itemList: null,
            error: true,
        });
    }

    onError = () => {
        this.setState({
            error: true,
            itemList: null,
        });
    }

    renderListOfItems(list) {
        const { onItemSelected, renderItem } = this.props;

        return list.map(item => {
            const label = renderItem(item);

            return (
                <li className="list-group-item" 
                    key={item.id}  
                >
                    {label}
                    <Button color="info" onClick={() => onItemSelected(item.id)}>
                        Details
                    </Button>
                </li>
            );
        });
    }

    render() {
        const { itemList, error } = this.state;
        const errorMessage = error && <ErrorMessage />;

        if (!itemList) {
            return <Spinner />
        }

        const items = this.renderListOfItems(itemList);

        return (
            <ul className="item-list list-group characters-list">
                {errorMessage || items}
            </ul>
        );
    }
}
