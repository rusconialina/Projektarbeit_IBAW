import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//todo ID
//getRowId
//Wenn Neu -> Speichern=Create, Löschen disable
//Wenn ID -> Speichern=Update
const buttonSave = "create";
if (false) {
  buttonSave = "update";
}

//todo Abbrechen -> reload Übersicht

export default function BookDetail() {
  function clickSave() {
    console.log("TEST");
  }

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
        <Button onClick={clickSave} variant="contained" color="success">
          Speichern
        </Button>
        <Button color="secondary">Abbrechen</Button>
        <Button color="error">Löschen</Button>
      </div>
    </div>
  );
}
