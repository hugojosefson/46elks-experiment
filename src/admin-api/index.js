import express from 'express';
import allowMethods from 'allow-methods';
import {respond200} from 'express-respond-simple';

import numbers from './routes/numbers';

const app = express();

app.use('/health', allowMethods('OPTIONS', 'GET'));
app.get('/health', respond200({
    _links: {
        parent: {href: '/'}
    },
    status: 'good'
}));

app.use('/numbers', allowMethods('OPTIONS', 'GET'));
app.get('/numbers', numbers);

app.use('/', allowMethods('OPTIONS', 'GET'));
app.get('/', respond200({
    _links: {
        health: {href: '/health'},
        numbers: {href: '/numbers'}
    }
}));

export default app;
