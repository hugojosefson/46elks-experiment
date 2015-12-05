import {PORT} from './lib/config';
import app from './lib/webapp';

app.listen(PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port ' + PORT);
    }
});