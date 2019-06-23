import _ from 'lodash'
import auth from 'basic-auth'

export default (req, res, next) => {
  console.log(
    JSON.stringify(
      _.assign(_.pick(req, ['method', 'url', 'originalUrl', 'query', 'params', 'body', 'headers']), { auth: auth(req) }),
      null, 2
    )
  )
  next()
}
