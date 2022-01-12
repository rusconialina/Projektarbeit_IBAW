import * as React from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {deleteBook, getBookById, saveBook} from "../services/BookService";
import {useState} from "react";
import {BookRequest} from "../models/BookRequest";
import MuiAlert from '@mui/material/Alert';

export default function BookDetail() {
    const navigate = useNavigate();

    const [titel, setTitel] = useState(null);
    const [band, setBand] = useState();
    const [autor, setAutor] = useState();
    const [bewertung, setBewertung] = useState();
    const [datum, setDatum] = useState();
    const [keywords, setKeywords] = useState();

    // get form url, if bookId not defined then create new book otherwise update existing book in db
    const { bookId } = useParams();
    let isNewBook = true;
    if (bookId != 0){
        isNewBook = false;
        getBookById(bookId)
            .then(function (response) {

                // set html form data form http request
                setTitel(response.data.titel)
                setBand(response.data.band)
                setAutor(response.data.author)
                setBewertung(response.data.rate)
                setDatum(response.data.date)
                setKeywords(response.data.keywords)

            })
            .catch(function (error) {
                // book not found in database go back to übersicht
                navigate('/books')
            })
    }

    function message(alert){
        setTimeout(function(){
            window.alert(alert);
        },100);
    }

    function clickSave() {
        if ((titel === "") && (titel === null)) {
            return;
        }

        let bookRequest = new BookRequest(
            titel,
            band,
            autor,
            bewertung,
            datum,
            keywords
        );

        if (isNewBook){
            saveBook(bookRequest)
                .then(function (response) {
                    message("Buch wurde erstellt.");
                    navigate('/books')
                })
                .catch(function (error) {
                    message("FEHLER \nBuch konnte nicht gespeichert werden");
                });
        }else {
            //todo update book in db
        }
    }

    function clickDelete() {
        deleteBook(bookId)
            .then(function (response) {
                message("Buch wurde gelöscht");
                navigate('/books')
            })
            .catch(function (error) {
                message("FEHLER \nBuch konnte nicht gelöscht werden");
                navigate('/books')
            });
    }


    return (
        <div style={{ width: "100%" }} className='main-book'>
                <h2>Detail</h2>
            <div>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { width: "20rem", marginBottom: '1rem', marginRight:'1rem'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="outlined-basic"
                        label="Titel"
                        onChange={(e) => setTitel(e.target.value)}
                        value={titel}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Band"
                        variant="outlined"
                        onChange={(e) => setBand(e.target.value)}
                        value={band}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Autoren"
                        variant="outlined"
                        onChange={(e) => setAutor(e.target.value)}
                        value={autor}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Keywords"
                        variant="outlined"
                        onChange={(e) => setKeywords(e.target.value)}
                        value={keywords}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Bewertung"
                        variant="outlined"
                        onChange={(e) => setBewertung(e.target.value)}
                        value={bewertung}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Datum"
                        variant="outlined"
                        onChange={(e) => setDatum(e.target.value)}
                        value={datum}
                    />

                </Box>
            </div>
            <div className='button'>
                <Button onClick={clickSave} variant="contained" color="success">
                    Speichern
                </Button>
                <Button onClick={() => navigate('/books')} color="secondary">
                    Abbrechen
                </Button>
                <Button onClick={clickDelete} color="error">
                    Löschen
                </Button>
            </div>
        </div>
    );
}
