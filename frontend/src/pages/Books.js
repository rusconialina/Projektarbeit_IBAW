import {useState, useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {getBooks} from "../services/BookService";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
    {
        "field": "titel",
        "minWidth": 250,
        "headerName": "Buch",
    },
    {field: "volume", minWidth: 50, headerName: "Band"},
    {field: "autor", minWidth: 150, headerName: "Autor"},
    {field: "date", minWidth: 105, headerName: "Datum", type:"date"},
    {field: "rate", minWidth: 50, headerName: "Bewertung",},
    {field: "genre", minWidth: 150, headerName: "Genre"},
];


export default function BooksPage() {
  const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState();

    useEffect(() => {

        getBooks()
            .then(function (response) {
                setData(response.data);
            })
            .finally(() => setLoading(false));

    }, []);

    return (
        <div style={{width: "100%"}} className="main">
            <Collapse in={open}>
                <Alert
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
                    sx={{ mb: 2 }}
                >
                    Close me!
                </Alert>
            </Collapse>
            <div className='main-book'>
                <p>
                    <Button className="button-new" onClick={() => navigate('/books/0')} variant="outlined">
                        Neues Buch erstellen
                    </Button>
                </p>
            </div>
            <div style={{height: 500, width: "100%"}} className='grid'>
                <DataGrid
                    autoHeight="true"
                    columns={columns}
                    rows={data}
                    loading={loading}
                    getRowId={(row) => row._id}
                    onRowClick={(params, event) => {
                      navigate('/books/' + params.id)
                      ;
                    }}
                    hideFooter= "true"
                />
            </div>
        </div>
    );
}
