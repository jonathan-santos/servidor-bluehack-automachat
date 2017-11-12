var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,textoUsuario');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}));

var port = process.env.PORT || 8081;

var router = express.Router();

router.get('/', function(req, res) {
    var conversation = watson.conversation({
      username: 'e3286c5c-27a1-46ca-a7e4-8a9e7fa082cb',
      password: 'Gz3uGsMgSXO2',
      version: 'v1',
      version_date: '2017-05-26'
    });
    conversation.message({
    workspace_id: 'd6983c88-1ec9-4956-a3e5-ddda197c9392',
    input: {'text': req.get('textoUsuario')}
    }, function(err, response) {
        // console.log('req: ' + req.get('textoUsuario'));
        // console.log('response: ' + response.output.text[0]);
    if (err) {
        res.json({ success: false, message: "Error"});
    } else {
        res.json({ success: true, message: response.output.text[0]});
        // res.json({ success: true, message: '123'});
    }});
});

app.use('/api', router);

app.listen(port);
console.log('Server running on port ' + port);