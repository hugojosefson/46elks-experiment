import express from 'express';

import respond200 from '../respond200';

export default express()
    .get('/health', respond200({status: 'good'}));