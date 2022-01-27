import * as React from "react";
import {deleteBook, getBookById, saveBook, updateBook} from "../services/BookService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Collapse} from "@mui/material";
import {BookRequest} from "../models/BookRequest";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import deLocale from 'date-fns/locale/de';

export class BookForm extends React.Component {

    constructor(props) {
        super(props)

        // get props
        this.bookId = this.props.bookId;
        this.navigate = this.props.navigate;

        this.isNewBook = true;
        if (this.bookId != 0) {
            this.isNewBook = false;
        }

        this.state = {
            info: {
                severity: 'warning',
                isOpen: false,
                message: ''
            },
            titel: null,
            volume: '',
            autor: '',
            genre: '',
            rate: '',
            date: ''
        }
    }

    componentDidMount() {
        const self = this;

        if (!this.isNewBook){
            getBookById(this.bookId)
                .then(function (response) {
                    self.setState({
                        titel: response.data.titel,
                        volume: response.data.volume,
                        autor: response.data.autor,
                        genre: response.data.genre,
                        rate: response.data.rate,
                        date: response.data.date
                    })
                })
                .catch(function (error) {
                    // book not found in database go back to übersicht
                    this.navigate('/books')
                })
        }
    }

    clickSave = () => {
        const self = this;
        let bookRequest = new BookRequest(
            this.state.titel,
            this.state.volume,
            this.state.autor,
            this.state.genre,
            this.state.rate,
            this.state.date
        );

        if (this.isNewBook){
            saveBook(bookRequest)
                .then(function (response) {
                    self.setNewMessage('info', "Buch wurde erstellt.")
                    self.navigate('/books')
                })
                .catch(function (error) {
                    self.setNewMessage('error', "Buch wurde erstellt.")
                });
        }else {
            updateBook(self.bookId, bookRequest)
                .then(function (response) {
                    self.setNewMessage('error', "Buch wurde aktualisiert.")
                    self.navigate('/books')
                })
                .catch(function (error) {
                    self.setNewMessage('error', "Änderungen konnten nicht gespeichert werden.")
                });
        }
    }

    clickCancel = () => {
        this.navigate('/books')
    }

    clickDelete = () => {
        const self = this;

        deleteBook(this.bookId)
            .then(function (response) {
                self.setNewMessage('info', "Buch wurde gelöscht")
                self.navigate('/books')
            })
            .catch(function (error) {
                self.setNewMessage('error', "FEHLER \nBuch konnte nicht gelöscht werden")
                self.navigate('/books')
            });
    }

    setNewMessage (severity, message) {
        this.setState({
            info: {
            severity: severity,
                isOpen: true,
                message: message
            }
        })
    }

    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        // todo form validation


        this.setState({
            [name]: value
        })
    };

    render() {
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
                            name="titel"
                            onChange={this.formValChange}
                            value={this.state.titel}
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Band"
                            variant="outlined"
                            name="volume"
                            onChange={this.formValChange}
                            value={this.state.volume}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Autoren"
                            variant="outlined"
                            name="autor"
                            onChange={this.formValChange}
                            value={this.state.autor}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Genre"
                            variant="outlined"
                            name="genre"
                            onChange={this.formValChange}
                            value={this.state.genre}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Bewertung"
                            variant="outlined"
                            name="rate"
                            onChange={this.formValChange}
                            value={this.state.rate}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Rückgabedatum"
                                name="date"
                                mask={"__.__.____"[deLocale]}
                                value={this.state.date}
                                onChange={this.formValChange}
                                renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder}/>}
                            />
                        </LocalizationProvider>

                    </Box>

                </div>
                <div className='button'>
                    <Button onClick={this.clickSave} variant="contained" color="success">
                        Speichern
                    </Button>
                    <Button onClick={this.clickCancel} color="secondary">
                        Abbrechen
                    </Button>
                    <Button onClick={this.clickDelete} color="error">
                        Löschen
                    </Button>
                </div>

                <Collapse in={this.state.info.isOpen}>
                    <Alert
                        className="alert"
                        id="alertText"
                        severity={this.state.info.severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    this.state.info.isOpen = false
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {this.state.info.message}
                    </Alert>
                </Collapse>

            </div>
        );
    }
}