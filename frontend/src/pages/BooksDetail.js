import * as React from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {deleteBook, getBookById, saveBook, updateBook} from "../services/BookService";
import {useState} from "react";
import {BookRequest} from "../models/BookRequest";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";


export default function BookDetail() {
    const navigate = useNavigate();

    const [titel, setTitel] = useState(null);
    const [volume, setVolume] = useState();
    const [autor, setAutor] = useState();
    const [rate, setRate] = useState();
    const [date, setDate] = useState();
    const [genre, setGenre] = useState();

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState();
    const [alertText, setAlertText] = useState();

    // get form url, if bookId not defined then create new book otherwise update existing book in db
    const { bookId } = useParams();
    let isNewBook = true;
    if (bookId != 0){
        isNewBook = false;
        getBookById(bookId)
            .then(function (response) {
                // todo update geht nicht wegen aktualisierung
                // todo anzeige beim ersten laden des details

                // set html form data form http request
                setTitel(response.data.titel)
                setVolume(response.data.volume)
                setAutor(response.data.autor)
                setRate(response.data.rate)
                setDate(response.data.date)
                setGenre(response.data.genre)
            })
            .catch(function (error) {
                // book not found in database go back to übersicht
                navigate('/books')
            })
    }

    function clickSave() {
        // check required input
        if ((titel === "") || (titel === null)) {
            setAlertText("Bitte einen Titel eingeben.");
            setOpen(true);
            setSeverity("warning");
            return;
        }

        // Check Date input
        if ((date !== "") && (date !== null) && (date !== undefined)){
            let checkDate = true;
            if (date.length !== 10) {
                checkDate = false;
            }
            if (date.substring(4, 5) !== '-' || date.substring(7, 8) !== '-') {
                checkDate = false;
            }
            if (checkDate){
                let year = date.substring(0, 4);
                let month = date.substring(5, 7);
                let day = date.substring(8, 10);
                if (year < 1000 || year > 3000)  {
                    setAlertText("Datum ausserhalb des erlaubten Zeitraumes.");
                    setOpen(true);
                    setSeverity("warning");
                    return;
                }
                if(month > 12 || day > 31){
                    //Auf die Prüfung von effektive Tage pro Monat wird verzichtet.
                    setAlertText("Datum existiert nicht. Bitte im Format yyyy-MM-dd eingeben.");
                    setOpen(true);
                    setSeverity("warning");
                    return;
                }
            }else{
                setAlertText("Falsches Datumsformat. Bitte im Format yyyy-MM-dd eingeben.");
                setOpen(true);
                setSeverity("warning");
                return;
            }
        }

        let bookRequest = new BookRequest(
        titel,
        volume,
        autor,
        date,
        rate,
        genre
        );

        if (isNewBook){
            saveBook(bookRequest)
                .then(function (response) {
                    message("Buch wurde erstellt.");
                    //todo alert in books
                    navigate('/books')
                })
                .catch(function (error) {
                    setAlertText("Buch konnte nicht gespeichert werden");
                    setOpen(true);
                    setSeverity("error");
                });
        }else {
            console.log(bookRequest);
            updateBook(bookId, bookRequest)
                .then(function (response) {
                    message("Buch wurde aktualisiert.");
                    //todo alert in books
                    navigate('/books')
                })
                .catch(function (error) {
                    setAlertText("Änderungen konnten nicht gespeichert werden");
                    setOpen(true);
                    setSeverity("error");
                });
        }
    }

    function clickDelete() {
        deleteBook(bookId)
            .then(function (response) {
                message("Buch wurde gelöscht");
                //todo alert in books
                navigate('/books')
            })
            .catch(function (error) {
                message("FEHLER \nBuch konnte nicht gelöscht werden");
                //todo alert in books
                navigate('/books')
            });
    }

    function message(alert){
        setTimeout(function(){
            window.alert(alert);
        },100);
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
                        onChange={(e) => setVolume(e.target.value)}
                        value={volume}
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
                        label="Genre"
                        variant="outlined"
                        onChange={(e) => setGenre(e.target.value)}
                        value={genre}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Bewertung"
                        variant="outlined"
                        onChange={(e) => setRate(e.target.value)}
                        value={rate}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Datum (yyyy-MM-dd)"
                        variant="outlined"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
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
            <Collapse in={open}>
                <Alert
                    className="alert"
                    id="alertText"
                    severity={severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {alertText}
                </Alert>
            </Collapse>
        </div>
    );
}
