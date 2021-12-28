import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import { DataGrid } from "@mui/x-data-grid";

// Überschrift
const columns = [
  {
    field: "titel",
    minWidth: 250,
    editable: true,
    headerName: "Buch",
  },

  { field: "band", minWidth: 150, headerName: "Band" },
  { field: "autors", minWidth: 150, headerName: "Autor" },
  { field: "date", minWidth: 150, headerName: "Rückgabedatum" },
  { field: "rate", minWidth: 150, headerName: "Bewertung" },
];

export default function BooksPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/book")
      .then((response) => {
        if (response.ok) {
          return response.json();
          console.log("response");
        }
        throw response;
      })
      .then((data) => {
        setData(data);
        console.log("data");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
        console.log("error");
      })
      .finally(() => {
        setLoading(false);
        console.log("final");
      });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div>
        <h1>Bücher</h1>
        <Button variant="contained">Neu</Button>
      </div>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid columns={columns} rows={data} getRowId={(row) => row._id} />
      </div>
    </div>
  );
}
