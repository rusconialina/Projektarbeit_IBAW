import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {getBookById, saveBook} from "../services/BookService";
import {useState} from "react";
import {BookRequest} from "../models/BookRequest";

export default function BookDetail() {
    const navigate = useNavigate();

    const [titel, setTitel] = useState('');
    const [band, setBand] = useState('');
    const [autor, setAutor] = useState('');
    const [bewertung, setBewertung] = useState('');
    const [datum, setDatum] = useState('');
    const [keywords, setKeywords] = useState('');

    // get form url, if bookId not defined then create new book otherwise update existing book in db
    const { bookId } = useParams();
    let isNewBook = true;
    if (bookId !== 0){
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
                    // todo alina write html message book is save successful for user
                    navigate('books')
                })
                .catch(function (error) {
                    //todo alina make a html error message for the user "das buch konnte nicht gespeichert werden" and show in html under the form
                });
        }else {
            //todo update book in db
        }
    }


    function clickDelete() {

    }




    return (
        <div style={{ width: "100%" }}>
            <div>
                <h1>Detail</h1>
            </div>
            <div>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
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
            <div>
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
