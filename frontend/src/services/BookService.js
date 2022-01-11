import axios from "axios";
import {baseBackendUrl} from "../env/environment";

export function getBooks(){
    return axios.get(baseBackendUrl + 'book');
}

export function saveBook(bookRequest){
    return axios.post(baseBackendUrl + 'book', bookRequest);
}