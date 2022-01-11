import {useState, useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {getBooks} from "../services/BookService";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

// Überschrift
const columns = [
    {
        "field": "titel",
        "minWidth": 250,
        "headerName": "Buch",
    },

    {field: "band", minWidth: 150, headerName: "Band"},
    {field: "autors", minWidth: 150, headerName: "Autor"},
    {field: "date", minWidth: 150, headerName: "Rückgabedatum"},
    {field: "rate", minWidth: 150, headerName: "Bewertung"},
];


export default function BooksPage() {
  const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        getBooks()
            .then(function (response) {
                setData(response.data);
            })
            .finally(() => setLoading(false));

    }, []);

    return (
        <div style={{width: "100%"}}>
            <div>
                <h1>Bücher</h1>
            </div>

            <Button onClick={() => navigate('/books/0')} color="secondary">
                Neues Buch erstellen
            </Button>

            <div style={{height: 500, width: "100%"}}>
                <DataGrid
                    autoHeight="true"
                    columns={columns}
                    rows={data}
                    loading={loading}
                    getRowId={(row) => row._id}
                    onRowClick={(params, event) => {
                      navigate('/books/' + params.id);
                    }}
                />
            </div>
        </div>
    );
}
