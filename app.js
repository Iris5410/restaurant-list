const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOvervide = require('method-override')

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const port = 3000
const app = express()


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOvervide('_method'))

usePassport(app)

// 所有路由裡 設定兩個由req交接給res的變數
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})