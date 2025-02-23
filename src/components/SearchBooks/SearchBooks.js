import { Input, Row } from "antd";
import styles from "../../css/SearchBooks.module.css"
import { useState } from "react"
import BookCard from "../BookCard/BookCard";
import { getBooksService } from "../../getServices/getBooksService";
import axios from "axios";

function SearchBooks() {
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(false);

    const { Search } = Input;

    const onSearch = (query) => {
        setLoading(true);
        axios.get(`${getBooksService()}/books/search?q=${query}`).then((response) => {
            if(response.status == 200) {
                setBookList(response.data)
                setLoading(false);
            }
        });
    }

    return <div className={styles.page}>
        <Search 
            className={styles.searchBar}
            placeholder="Find a book..."
            onSearch={onSearch}
        />

        {!loading ? <Row>
            {bookList.map(book => (
                <BookCard bookData={book} />
            ))}
        </Row> : <p>Loading ...</p>}



    </div>
}

export default SearchBooks;
