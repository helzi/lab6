const express = require('express');
const crud = require('./database.js');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.result = [];
app.listen(8080, function () {
    console.log('nasluchujemy na 8080');
});
// app.get('/', (req, resp) => {
//     try {
//         // should get records from db here
//         // let data1 = fs.readFileSync('./mojewiadomosci.json');

//         app.result = JSON.parse(crud.readRecords);
//     } catch (e) {};
//     resp.render('index.ejs', {
//         wiadomosci: app.result
//     });
// });

app.post('/wiadomosci', (req, resp) => {
    let nowaWiadomosc = {
        "imie": req.body.imie,
        "nazwisko": req.body.nazwisko,
        "wiadomosc": req.body.wiadomosc
    };
    
    crud.createRecord(nowaWiadomosc.imie, nowaWiadomosc.nazwisko, nowaWiadomosc.wiadomosc);
    resp.render('index.ejs', {
        wiadomosci: app.result
    });
    resp.end();
});