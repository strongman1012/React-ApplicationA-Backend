import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import articleRoutes from './routes/articleRoutes';
import contentRoutes from './routes/contentRoutes';
import config from './config/config';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const API_VERSION = 'v0';
app.use(`/api/${API_VERSION}`, articleRoutes);
app.use(`/api/${API_VERSION}`, contentRoutes);

const PORT = config.port;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
