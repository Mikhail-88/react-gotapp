import React, {Component} from 'react';
import './itemDetails.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import { Button } from 'reactstrap';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field] || 'no data'}</span>
        </li>
    );
}

export {Field};

export default class ItemDetails extends Component {
    state = {
        item: null,
        isLoading: true,
        error: false,
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.itemId !== this.props.itemId) {
            this.updateItem();
        }
    }

    onDetailsLoaded = (item) => {
        this.setState({
            item,
            isLoading: false
        });
    }

    onError = () => {
        this.setState({
            error: true,
            item: null,
        });
    }
    
    updateItem() {
        const { itemId, getData } = this.props;

        if (!itemId) {
            return;
        }

        this.setState({
            isLoading: true
        })

        getData(itemId)
            .then(item => this.onDetailsLoaded(item))
            .catch(this.onError)
    }

    render() {
        const { item, isLoading, error } = this.state;
        const errorMessage = error && <ErrorMessage />;
        const loading = isLoading && <Spinner />;

        return (
            <div className="char-details rounded">
                {errorMessage || loading || 
                    <>
                        <h4>{item.name || 'no data'}</h4>
                        <ul className="list-group list-group-flush">
                            {React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item});
                            })}
                        </ul>
                        <Button color="info" onClick={() => this.props.history.goBack()}>
                            Back
                        </Button>
                    </>
                }
            </div>
        );
    }
}

