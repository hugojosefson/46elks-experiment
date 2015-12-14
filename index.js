import {PORT, ELKS_PORT, ADMIN_PORT} from './lib/config';
import publicApp from './lib/public-app';
import elksApi from './lib/elks-api';
import adminApi from './lib/admin-api';

[
    [publicApp, PORT, 'Public app'],
    [elksApi, ELKS_PORT, 'Elks API'],
    [adminApi, ADMIN_PORT, 'Admin API']
].forEach(([app, port, name]) => app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`${name} listening on port ${port}`);
    }
}));