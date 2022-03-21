import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
const app = express();
const PORT = 8080;

app.use(bodyParser.json());


app.get('/', (req, res) => {
    var msg = "Hello World! <br/> Consider adding \"/count?word=word_you_want_counted\" to the URL";
    msg += "<br/>so that you can see how many times your word appears in each line of";
    msg += "<br/>fileNameGoesHere";
    res.send(msg);
});

app.get('/count', (req, res) => {
    const urlObject = url.parse(req.url, true).query;
    if ('word' in urlObject){
        //add word counting logic here
        //return JSON object with word, sentences and word counts
        res.send("You were looking for "+ urlObject.word);
    } else {
        res.status(404).send("Sorry, we couldn't find what you were looking for...")
    }
});
app.listen(PORT, () => console.log('Server listening on 8080...'))