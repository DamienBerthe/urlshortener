//require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
app.use(express.json())
const url = require('url')

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

let original = ''
let short = 1
let arr = []
app.post('/api/shorturl', function(req, res){
    original = req.body.url
    arr.push(original)
    console.log(arr)
    if(stringIsAValidUrl(original)){
      //res.json({requestBody: req.body});
      res.json({original_url: original, short_url:arr.indexOf(original)+1})
    }
    else{
      res.json({error: 'Invalid URL'})
    }
}); 

app.get('/api/shorturl/:shortURL', function(req, res){
  //res.send(req.params)
  //console.log(req.params.shortURL)
  //res.redirect(original)
  //console.log(arr[(req.params.shortURL-1)])
  res.redirect(arr[parseInt(req.params.shortURL)-1])
})

app.listen(10000)
