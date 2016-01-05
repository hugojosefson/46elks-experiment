import express from 'express';
import allowMethods from 'allow-methods';
import {respond200} from 'express-respond-simple';

const app = express();

app.use('/health', allowMethods(['OPTIONS', 'GET']));
app.get('/health', respond200({status: 'good'}));

export default app;
