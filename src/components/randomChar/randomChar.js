import React, {Component} from 'react';
import { Button } from 'reactstrap';
import './randomChar.css';
import Service from '../../services/service';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {
    gotService = new Service();

    state = {
        character: {},
        isLoading: true,
        error: false,
    }

    componentDidMount() {
        this.updateCharacter();
    }
    
    onError = () => {
        this.setState({
            error: true,
            isLoading: false,
        });
    }

    onCharacterLoaded = (character) => {
        this.setState({
            character,
            isLoading: false,
        });
    }

    onChangeCharacter = () => {
        this.setState({
            isLoading: true,
        });

        this.updateCharacter();
    }

    updateCharacter() {
        const id = Math.floor(Math.random() * 140 + 25);

        this.gotService.getCharacter(id)
            .then(character => this.onCharacterLoaded(character))
            .catch(this.onError);
    }

    render() {
        const { character, isLoading, error } = this.state;
        const errorMessage = error && <ErrorMessage />;
        const loading = isLoading && <Spinner />;

        return (
            <div className="random-block rounded">
                <h4>Random Character</h4>
                {errorMessage || loading || <View character={character} />}
                <Button outline color="info" onClick={this.onChangeCharacter}>
                    Next character
                </Button>
            </div>
        );
    };
};

const View = ({ character: { name, gender, born, died, culture } }) => (
    <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">Name</span>
            <span>{name || 'no data'}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender </span>
            <span>{gender || 'no data'}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born </span>
            <span>{born || 'no data'}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died </span>
            <span>{died || 'no data'}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture </span>
            <span>{culture || 'no data'}</span>
        </li>
    </ul>
);