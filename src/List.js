import React, { Component } from 'react';
import Shelf from './Shelf'


class List extends Component {
    render() {

        const { books, update } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                    <Shelf books={books} update={update} />
                </div>
            </div>
        );
    }
}

export default List;