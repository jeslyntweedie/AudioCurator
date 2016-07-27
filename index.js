var express   = require('express'),
bodyParser  = require('body-parser'),
cors        = require('cors'),
mongoose    = require('mongoose');

var postCtrl = require('./postCtrl');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.post('/', postCtrl.create);
app.get('/', postCtrl.read);
app.put('/:id', postCtrl.update);
app.delete('/', postCtrl.delete);

var mongoUri = "mongodb://localhost:27017/AudioCurator";
mongoose.connect(mongoUri);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function(){
  console.log("Connected to mongoDB");
});

app.listen(8000, function(){
  console.log("listening to 8000 ");
});
