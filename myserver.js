const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs');
app.result = [];
app.listen(8080, function () {
    console.log('nasluchujemy na 8080');
});
app.get('/', (req, resp) => {
    try {
        let data1 = fs.readFileSync('./mojewiadomosci.json');
        app.result = JSON.parse(data1);
    } catch (e) {};
    resp.render('index.ejs', {
        wiadomosci: app.result
    });
});

app.post('/wiadomosci', (req, resp) => {
    let nowaWiadomosc = {
        "imie": req.body.imie,
        "nazwisko": req.body.nazwisko,
        "wiadomosc": req.body.wiadomosc
    };
    app.result.push(nowaWiadomosc);
    let data = JSON.stringify(app.result);
    fs.writeFileSync('./mojewiadomosci.json', data);
    let data1 = fs.readFileSync('./mojewiadomosci.json');
    app.result = JSON.parse(data1);
    resp.render('index.ejs', {
        wiadomosci: app.result
    });
    resp.end();
});