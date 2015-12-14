import {ELKS_API_URI, ELKS_API_USERNAME, ELKS_API_PASSWORD} from '../../config';
import request from 'request-promise';
import _ from 'lodash';

export default app => {
    app.get('/', (req, res) => {
        request({
            uri: `${ELKS_API_URI}Numbers`,
            auth: {
                user: ELKS_API_USERNAME,
                pass: ELKS_API_PASSWORD
            },
            json: true
        }).then(
            response => res.send({
                _links: {
                    parent: '/'
                },
                _items: response.data.map(
                    number => _.assign(
                        {
                            _links: {_self: `/numbers/${encodeURIComponent(number.id)}`}
                        },
                        number
                    )
                )
            }),
            reason => res.status(500).send(reason)
        );
    });
}