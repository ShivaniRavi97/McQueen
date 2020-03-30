const express = require('express')
const bodyParser = require('body-parser')
var morgan=require('morgan')
var multer  = require('multer')
const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
    next();
  });

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
  });

var upload = multer({storage: storage});
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mcqueen',
    password: 'shivani123',
    port: 5432,
  })

  app.get('/', (request, response) => {
    pool.query('SELECT * FROM profile ',(error, results) => {
      if (error) {
        throw error
      }else{
        response.status(200).json(results.rows)
      }
    })
  });
  
app.post('/',(request, response) => {
  const {bookingid}=request.body
  console.log(request.body)
  pool.query('SELECT * FROM profile where bookingid = $1', [bookingid], (error, results) => {
    if (error) {
      throw error
    }else if (results.rows.length===0) {
      response.status(400).json();      
    }else{
      response.status(200).json(results.rows)
    }
  })
});


app.post('/upload',upload.single('path'), function(req, res) {  
  const {id}=req.body
  const path  = req.file.filename
  console.log(req.body)
    const states='done'
    pool.query('update checkstate set states=($2) where id=($1)',[id,states], (error, results) => {
      if (error) {
        res.status(208)
      }
    })
    pool.query('INSERT INTO image(path,id) VALUES ($1,$2) ',[path,id], (error, result) => {
      if (error) {
        res.status(200).send("Image already uploaded")
      }else{
        res.status(200).send("Id Proof Uploaded.")
      }
  })
});


app.post('/tandc',(request, response) => {
  const {id,states}=request.body
  console.log(request.body)
  pool.query('update checkstate set states=($2) where id=($1)',[id,states], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).send("Terms and Conditions Accepted.")
    
  })
});

app.post('/profile',(request, response) => {
  const {id}=request.body
  pool.query('SELECT path FROM image where id=($1)',[id], (error, results) => {
    if (error) {
      throw error
    }
      response.status(200).json(results.rows)
    
  })
});

app.post('/extra',(request, response) => {
  const {id,amount}=request.body
  pool.query('INSERT INTO EXTRAS(amount,id) VALUES ($1,$2) ',[amount,id], (error, result) => {
    if (error) {
      response.status(200).send("already upgraded")
    }else{
      response.status(200).send("upgraded.")
    }  
  })
});

app.post('/displaycost',(request, response) => {
  const {id}=request.body
  pool.query('SELECT amount FROM extras where id=($1)',[id], (error, results) => {
    if (error) {
      throw error
    }else{
      response.status(200).json(results.rows)

    }  
  })
});

app.post('/proof',(request, response) => {
  const {id}=request.body
  pool.query('SELECT name FROM profile where bookingid=($1)',[id], (error, results) => {
    if (error) {
      throw error
    }else{
      response.status(200).json(results.rows)
    }  
  })
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
