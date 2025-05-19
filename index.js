var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
var app = express();

const storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null,'public/');
  },
  filename:function (req,file,cb){
    cb(null,Date.now()+'-'+file.originalname)
  }
})

const upload = multer({storage:storage});
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.set(express.urlencoded({extended:false}));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  console.log(req.file);
  const data = {
    name:req.file.filename,
    type:req.file.mimetype,
    size:req.file.size
  }
  res.json(data);
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
