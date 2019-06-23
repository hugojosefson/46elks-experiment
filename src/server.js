import { PORT, ELKS_PORT, ADMIN_PORT } from './config'
import publicApp from './public-app'
import elksApi from './elks-api'
import adminApi from './admin-api'

const listenListener = (name, port) => err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`${name} listening on port ${port}`)
  }
};

[
  [publicApp, PORT, 'Public app'],
  [elksApi, ELKS_PORT, 'Elks API'],
  [adminApi, ADMIN_PORT, 'Admin API']
].forEach(([app, port, name]) => app.listen(port, listenListener(name, port)))
