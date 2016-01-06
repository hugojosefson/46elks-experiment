import express from 'express';
import allowMethods from 'allow-methods';
import {respond200} from 'express-respond-simple';

import log from '../log';
import numbers from './routes/numbers';
import configureNumber from './routes/numbers/configure-post';

const app = express();

app.use(log);

app.use('/health', allowMethods(['OPTIONS', 'GET']));
app.get('/health', respond200({
    _links: {
        parent: {href: '/'}
    },
    status: 'good'
}));

app.use('/numbers/:uri/configure', allowMethods(['OPTIONS', 'POST']));
app.post('/numbers/:uri/configure', configureNumber);

app.use('/numbers', allowMethods(['OPTIONS', 'GET']));
app.get('/numbers', numbers);

app.use('/', allowMethods(['OPTIONS', 'GET']));
app.get('/', respond200({
    _links: {
        health: {href: '/health'},
        numbers: {href: '/numbers'}
    }
}));

export default app;
