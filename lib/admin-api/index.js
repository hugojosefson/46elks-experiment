import express from 'express';
import subroute from 'express-subroute';

import respond200 from '../respond200';
import numbersRoute from './subroutes/numbers';

const app = express();
subroute.install(app);

app.get('/health', respond200({
    _links: {
        parent: '/'
    },
    status: 'good'
}));
app.subroute('/numbers', numbersRoute);
app.get('/', respond200({
    _links: {
        health: '/health',
        numbers: '/numbers'
    }
}));

export default app;