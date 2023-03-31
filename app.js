const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOvervide = require('method-override')

const routes = require('./routes')

require('./config/mongoose')

const port = 3000
const app = express()





// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOvervide('_method'))
app.use(routes)

// setting static files
app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})