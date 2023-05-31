import express from "express";
import {createDraft, listDraft, pickInDraft } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port = 8088;
const app = express();
app.use(bodyParser.json());
app.post("/api/create", createDraft);
app.get("/api/list", listDraft);
app.get("/api/pick", pickInDraft);
app.listen(port, () => console.log(`Server listening on ${port}`));
