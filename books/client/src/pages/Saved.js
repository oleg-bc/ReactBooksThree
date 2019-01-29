import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Saved extends Component {
    state = {
        books: [],
        title: "",
    };

componentDidMount() {
     this.loadBooks();
}


loadBooks = () => {
    API.getBooks().then(res =>{
        this.setState({ books: res.data, title: ""})
        console.log(this.state.books)
    }                                     )
        .catch(err => console.log(err));
};

deleteBook = (event,id) => {
  console.log("id to be deleted:"+id)
  API.deleteBook(id)
      .then(res => {this.loadBooks()})
      .catch(err => console.log(err));
};

render() {
    return (
        <Container fluid>
        <Row>
        <Col size="md-12">
        <div class="jt">
        <Jumbotron>
        <h1>React Google Book Search</h1>
        <h3> Search for and Save Books of Interest</h3>
        </Jumbotron></ div> 
         {this.state.books.length ? (
          <List>                
        {this.state.books.map(book => (
      <ListItem key={book.id}>
      <a href={book.link}>
     </a>
           
    <FormBtn id={book.id} value={book.id}
     onClick={((e) => this.deleteBook(e,book._id))}
    >
    Delete
    </FormBtn>          
    
    <div className="row">
    <a href={book.link}> 
    <strong>
    {book.title} by {book.author}
    </strong>
    </a>
    </div>                      
    <div className="row">
    <img className="col-lg-2" src={book.image} >
    </img>
    <p className="col-md-10">
    {book.title}
    </p>
    </div>

    </ListItem>
))}
    </List>
) : (
    <h3>No Results to Display</h3>
)}
</Col>
</Row>
</Container>
);
}
}

export default Saved;