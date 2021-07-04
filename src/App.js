import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import List from './List'
import Search from './Search';


class BooksApp extends React.Component {
  state = {
    books: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
      this.setState({books})
  }

  update = (book, shelfName) => {

    const bookFromState = this.state.books.find(b => b.id === book.id);

    if (bookFromState) {
      bookFromState.shelf = shelfName;
      BooksAPI.update(book, shelfName)
        .then(this.setState(currentState => ({
          books: currentState.books
        })))
    } else if(book.shelf === undefined) {
        book.shelf = shelfName;
        BooksAPI.update(book, shelfName)
          .then(this.setState(prevState => ({
            books: prevState.books.concat(book)
          })))
    }
  }; 

  render() {

    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
           <>
            <List books={books} update={this.update} />
            <Link to="/Search" className="open-search">Add a book</Link>
          </>
        )} />

        <Route exact path="/Search" render={() => (
          <Search books={books} update={this.update} />
        )} />
      </div>
    )
  }
}

export default BooksApp
