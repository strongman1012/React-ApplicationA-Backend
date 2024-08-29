import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import area1Routes from './routes/area1Routes';
import area2Routes from './routes/area2Routes';
import config from './config/config';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const API_VERSION = 'v0';
app.use(`/api/${API_VERSION}`, area1Routes);
app.use(`/api/${API_VERSION}`, area2Routes);

const PORT = config.port;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
