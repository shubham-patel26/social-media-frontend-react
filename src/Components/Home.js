import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import Footer from './Footer';
const Home = (props) => {
  return (
    <div className="home">
      <Jumbotron fluid >
        <Container fluid>
          <h1 className="display-3">Welcome to Being Social</h1>
          <p className="lead">Best platform for internship experiences.</p>
        </Container>
      </Jumbotron>
      <Footer/>
    </div>
  );
};

export default Home;