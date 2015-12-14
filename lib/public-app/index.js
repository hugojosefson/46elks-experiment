import express from 'express';
import subroute from 'express-subroute';

import respond200 from '../respond200';

const app = express();
subroute.install(app);

app.get('/health', respond200({status: 'good'}));

export default app;