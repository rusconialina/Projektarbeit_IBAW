import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

export default function BookDetail() {
  return (
    <div style={{ width: "100%" }}>
      <div>
        <h1>Buch</h1>

        <Button variant="contained" color="success">
          Speichern
        </Button>
        <Button color="secondary">Abbrechen</Button>
        <Button color="error">Löschen</Button>
      </div>
    </div>
  );
}
