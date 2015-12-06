import _ from 'lodash';

export default (req, res, next) => {
    console.log(
        JSON.stringify(
            _.assign(_.pick(req, ['method', 'url', 'originalUrl', 'query', 'body', 'headers']), {auth: auth(req)}),
            null, 2
        )
    );
    next();
};