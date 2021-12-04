import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
//import { DataGridPro } from "@mui/x-data-grid-pro"; // Lizenz nötig...

// Überschrift
const columns = [
  {
    field: "book",
    minWidth: 150,
    resizeable: true,
    editable: true,
    headerName: "Buch",
    description:
      "The identification used by the person with access to the online service.",
  },
  { field: "autor", headerName: "Autor" },
];

// Datensätze
const rows = [
  {
    id: 1,
    book: "@MUIsdfhdwghvjdwihvdcw",
    autor: "Max Muster",
  },
  {
    id: 2,
    book: "@MUI",
    autor: "Max Muster",
  },
  {
    id: 3,
    book: "@MUI",
    autor: "Max Muster",
  },
  {
    id: 4,
    book: "@MUI",
    autor: "Max Muster",
  },
];

// Table
export default function ColumnSizingGrid() {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
