const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://utsav:utsav@ds119064.mlab.com:19064/utsav', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/user', (req, res) => {
   
    var empid=req.query.id;
   
  db.collection('utsav').find({"EMP_CODE":empid}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {utsav: result})
  })
})

//app.post('/quotes', (req, res) => {
//  db.collection('utsav').save(req.body, (err, result) => {
//    if (err) return console.log(err)
//    console.log('saved to database')
//    res.redirect('/')
//  })
//})
//
//app.put('/quotes', (req, res) => {
//  db.collection('quotes')
//  .findOneAndUpdate({name: 'Yoda'}, {
//    $set: {
//      name: req.body.name,
//      quote: req.body.quote
//    }
//  }, {
//    sort: {_id: -1},
//    upsert: true
//  }, (err, result) => {
//    if (err) return res.send(err)
//    res.send(result)
//  })
//})
//
//app.delete('/quotes', (req, res) => {
//  db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
//    if (err) return res.send(500, err)
//    res.send('A darth vadar quote got deleted')
//  })
//})
