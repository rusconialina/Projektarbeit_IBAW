import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";
import {saveBook} from "../services/BookService";
import {setAccessToken} from "../services/AuthenticationService";

export default function BookDetail() {
    const navigate = useNavigate();

    function clickSave() {
        saveBook()
            .then(function (response) {
                // todo alina write html message book is save successful for user
                navigate('books')
            })
            .catch(function (error) {
                //todo alina make a html error message for the user "das buch konnte nicht gespeichert werden" and show in html under the form
            });
    }
    

    return (
        <div style={{width: "100%"}}>
            <div>
                <h1>Buch</h1>
            </div>
            <div>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        "& > :not(style)": {m: 1, width: "25ch"},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField required id="outlined-basic" label="Titel" variant="outlined"/>
                    <TextField id="outlined-basic" label="Band" variant="outlined"/>
                    <TextField id="outlined-basic" label="Autoren" variant="outlined"/>
                    <TextField id="outlined-basic" label="Keywords" variant="outlined"/>
                    <TextField id="outlined-basic" label="Bewertung" variant="outlined"/>
                    <TextField id="outlined-basic" label="Datum" variant="outlined"/>
                </Box>
            </div>
            <div>
                <Button onClick={clickSave} variant="contained" color="success">
                    Speichern
                </Button>
                <Button color="secondary" onClick={() => navigate('/books')}>Abbrechen</Button>
                <Button color="error">Löschen</Button>
            </div>
        </div>
    );
}
