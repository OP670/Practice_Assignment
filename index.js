import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.get('/', (req, res) => {
    var msg = "Hello World! <br/> Consider adding \"/count?word=word_you_want_counted\" to the URL";
    msg += "<br/>so that you can see how many times your word appears in each line of";
    msg += "<br/>fileNameGoesHere";
    res.send(msg);
});

app.listen(PORT, () => console.log('Server listening on 8080...'))