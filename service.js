const express = require('express')
const app = express()
const open = require('open')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.ts')

webpackConfig.watch = true
let isRunning = false

console.log('wait...')
webpack(webpackConfig, function(err, state) {
  if(err || state.hasErrors()) {
    return console.error(err)
  }
  
  console.log(state.toString({
    chunks: false,  // 使构建过程更静默无输出
    colors: true    // 在控制台展示颜色
  }))

  exec('node main.js', function(err, stdout) {
    console.log('rebuild finished')
    if(err) {
      console.error(err)
    }
  })
  !isRunning && start()
})

function getHtml() {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/featureTestHtml.js')).toString()
  const fn = new Function('var module = {}; return  ' + html + '')
  return fn()
}

function start() {
  isRunning = true
  open('http://localhost:8002/feature-test')
  app.use('/feature-test', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(getHtml())
  })

  app.listen(8002)
}