import express from 'express';
import auth from './routes/auth.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', auth);

app.listen(8000, () => console.log('server running'));