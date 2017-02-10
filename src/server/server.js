import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../../webpack.config'


const PORT = 3000
const server = express()


delete process.env.BROWSER


/**
 ***************************************
 * PING endpoint
 ***************************************
 */
server.get('/ping', (req, res) => {
  res.header('Content-Type', 'text/plain')
  res.send(new Date().toISOString())
})


const compiler = webpack(webpackConfig)
const middleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  watchOptions: {
    poll: true,
  },
  stats: {
    colors: true,
  },
})

/**
 * Configuring middlewares
 */
server.use(middleware)
server.use(webpackHotMiddleware(compiler))


server.use(express.static(path.join(__dirname, '../app')))
server.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/index.html'))
})


/*
 *************************************************
 * Running the server
 *************************************************
 */
server.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error(err)
  }
  console.log('Listening at http://0.0.0.0:%s/', PORT)
})

