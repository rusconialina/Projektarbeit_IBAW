import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BookDetail() {
  return (
    <div style={{ width: "100%" }}>
      <div>
        <h1>Buch</h1>
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
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Band" variant="outlined" />
          <TextField id="outlined-basic" label="Autoren" variant="outlined" />
          <TextField id="outlined-basic" label="Keywords" variant="outlined" />
          <TextField id="outlined-basic" label="Bewertung" variant="outlined" />
          <TextField id="outlined-basic" label="Datum" variant="outlined" />
        </Box>
      </div>
      <div>
        <Button variant="contained" color="success">
          Speichern
        </Button>
        <Button color="secondary">Abbrechen</Button>
        <Button color="error">Löschen</Button>
      </div>
    </div>
  );
}
