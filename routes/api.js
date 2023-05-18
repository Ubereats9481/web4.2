var express = require('express');
var router = express.Router();

const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const {startDate, endDate}=req.body;
    sql = "SELECT * FROM chicken WHERE Date >= (?) AND Date <= (?)";
    db.all(sql, [startDate, endDate], (err, rows) => {
        if (err) {
            console.log(err);
        }
        return res.status(200).send(rows);
    });
});


module.exports = router;