import axios from "axios";
import {baseBackendUrl} from "../env/environment";

export function getBookById(bookId){
    return axios.get(baseBackendUrl + 'book/' + bookId);
}

export function getBooks(){
    return axios.get(baseBackendUrl + 'book');
}

export function saveBook(bookRequest){
    return axios.post(baseBackendUrl + 'book', bookRequest);
}

export function deleteBook(bookId){
    return axios.delete(baseBackendUrl + 'book', bookId);
}