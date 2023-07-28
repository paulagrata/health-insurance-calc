const bodyParser = require('body-parser')
//https://www.youtube.com/watch?v=rin7gb9kdpk - help with getting the user data
//https://www.npmjs.com/package/body-parser
const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')
app.set("views", './views')

const port = process.env.PORT || 3000;

const udata = require("./public/js/server.js") // the the function to clac risk
const valid = require("./public/js/client.js")


// webpage routes//

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/homepage.html')

})

app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/views/form.html')
})

app.post('/form', urlencodedParser, function (req, res) {
    console.log(req.body) //testing that we got data
    var data = req.body

    valid.setData(data)
    if (valid.checkError() == "good") {

        udata.setData(data)

        //res.send("data string" + req.body.height) // for testing 

        res.render('submitted', { data: udata.getRiskData() })
    

    }else{
    

        res.render('userInputError', {err: valid.checkError()} )
    
    }

})

/// NOTE: This is a temp web route - used to look at the page ///
app.get('/submitted',(req, res) => {
    res.render('submitted')
})


app.use((req, res) => {
    res.status(404)
    res.render('404')
})

//the port
app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))

