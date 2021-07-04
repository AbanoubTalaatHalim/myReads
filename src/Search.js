import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import debounce from 'lodash/debounce'
import Load from './Load'
import Book from './Book'
import NoResults from './NoResults'

class Search extends Component {

    state = {
        termsToSearch: "",
        results: [],
        load: false
    }

    
    resultsQuery = debounce(async (terms) => {

        this.setState({ termsToSearch: terms, results: [], load: true })

        if (terms.length) {
            const booksFound = await BooksAPI.search(terms)
            if (booksFound.length) {
                this.booksInShelves(booksFound)
                this.setState({ results: booksFound, load: false })
            } else {
                this.setState({ results: [], load: false })
            }
        }
    }, 700)
   

    
    getEvent = (evento) => {
        this.resultsQuery(evento.target.value)
    }

    
    booksInShelves = (results) => {
        results.filter(result => this.props.books.find(book => {
            (result.id === book.id) && (result.shelf = book.shelf)
        }))
    }


    render() {

        const { termsToSearch, results, load } = this.state
        const { update } = this.props

        const resultsShow = (results.length > 0) && (termsToSearch !== "")
        const loadShow = (load) && (termsToSearch.length)

        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/" />
                        <div className="search-books-input-wrapper">
                            <input type="text"
                                placeholder="Search by title or author"
                                onChange={this.getEvent}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {
                                loadShow
                                    ? <Load />
                                    : resultsShow
                                        ? results.map(book => (
                                            <Book key={book.id}
                                                book={book}
                                                update={update}
                                            />)) 
                                        : <NoResults terms={termsToSearch} />
                            }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
};

export default Search;