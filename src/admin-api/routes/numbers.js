import {me} from '../../api';
import _ from 'lodash';

export default (req, res) => {
    console.log('numbers');
    me('numbers').getResource((error, resource) => {
        console.log(arguments);
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(resource._embedded.numbers.map(number => {delete number._links; return number;}));
        }
    });
};
