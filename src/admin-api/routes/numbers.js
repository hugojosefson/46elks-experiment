import {encode} from 'urlsafe-base64';

import {me} from '../../api';

export default (req, res) => {
    console.log('numbers');
    me('numbers').getResource((error, resource) => {
        console.log(arguments);
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(resource._embedded.numbers.map(number => {
                number._links = {
                    parent: {href: req.originalUrl},
                    configure: {href: req.originalUrl + '/' + encode(new Buffer(number._links.self.href)) + '/configure'}
                };
                delete number.id;
                return number;
            }));
        }
    });
};
