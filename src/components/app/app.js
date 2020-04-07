import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, CharacterItem, HousesPage, HouseItem, BooksPage, BooksItem } from '../pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';

class App extends Component {
    state = {
        error: false,
    }

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
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <RandomChar/>
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharacterPage} exact />
                        <Route path='/characters/:id' render={({ match }) => {
                            return <CharacterItem characterId={match.params.id} />
                        }} />
                        <Route path='/houses' component={HousesPage} exact />
                        <Route path='/houses/:id' render={({ match }) => {
                            return <HouseItem houseId={match.params.id} />
                        }} />
                        <Route path='/books' component={BooksPage} exact />
                        <Route path='/books/:id' render={({ match }) => {
                            return <BooksItem bookId={match.params.id} />
                        }} />
                    </Container>
                </div>
            </Router>
        );
    }
};

export default App;