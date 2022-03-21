import express from 'express';
import bodyParser from 'body-parser'

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.listen(PORT, () => console.log('Server listening on 8080...'))