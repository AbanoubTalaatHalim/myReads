import React, { Component } from 'react'

class Book extends Component {

    onChangeShelf = event => {
        this.props.update(this.props.book, event.target.value)
    }

    render() {

        const {book} = this.props

        return (
            <li>
                <div key={book.id} className="book">
                    <div className="book-top">
                        <div className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${(book.imageLinks) && (book.imageLinks.thumbnail)})`
                            }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select onChange={this.onChangeShelf} defaultValue={book.shelf ? book.shelf : 'none'}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{(book.authors) && (book.authors)}</div>
                </div>
            </li>
        )
    }

}

export default Book 