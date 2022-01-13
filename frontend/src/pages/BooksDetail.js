import * as React from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {BookForm} from "../components/BookForm";

export default function BookDetail() {
    const navigate = useNavigate();
    const { bookId } = useParams();

    return (
        <BookForm bookId={bookId} navigate={navigate} />
    );
}
