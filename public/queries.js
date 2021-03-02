const express = require("express");
const cors = require('cors');
const sql = require('mysql');
const mysql = require('./dbcon');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('./css'));
const path = require("ejs");

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const corsOptions = {
    origin: "http://flip3.engr.oregonstate.edu:4169",
    optionsSuccessStatus: 200
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('mysql', mysql);


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/index.html', function (req, res) {
    res.render('index');
});

/* checks Guide credentials. If exists, logs then in. */
app.get("GuideLogin/:firstName:lastName:password", (req, res) => {
    let mysql = req.app.get('mysql');
    let out = mysql.query(`SELECT firstName
                 from UserLogins
                 WHERE UserLogins.password = ? 
                   and UserLogins.lastName = ? 
                   and UserLogins.firstName = ?`, [req.params.password, req.params.lastName, req.params.firstName],
                function (err, rows) {
                    if (err) throw err;
                    let context = {title: 'Guide info', items: rows};
                    res.render('GuideLogin', context);
                });
    console.log(out)
});

// Select a Guide from the GuideAccounts table given email and password.
app.post("/GuideSignup.html", (req, res) => {
    let mysql = req.app.get('mysql');
    let sql = `SELECT UserID, lastName, firstName, email FROM UserSignUps WHERE email = ? AND password = ?`;
});











//
//
// app.get("/GuideWeather.html", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `SELECT UserID, lastName, firstName, email FROM UserSignUps WHERE email = ? AND password = ?`;
//     let data = [req.query.email, req.query.password];
//     mysql.pool.query(sql, data, function (error, results, fields) {
//         const queryResults = {};
//         if (error || results[0] == null) {
//             queryResults["successful"] = false;
//         } else {
//             queryResults["successful"] = true;
//             queryResults["GuideID"] = results[0].GuideID;
//             queryResults["firstName"] = results[0].firstName;
//             queryResults["lastName"] = results[0].lastName;
//             queryResults["email"] = results[0].email;
//         }
//         res.render('GuideWeather', {data});
//     });
// });
//
// app.get("/GuideLocation.html", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `SELECT UserID, lastName, firstName, email FROM UserSignUps WHERE email = ? AND password = ?`;
//     let data = [req.query.email, req.query.password];
//     mysql.pool.query(sql, data, function (error, results, fields) {
//         const queryResults = {};
//         if (error || results[0] == null) {
//             queryResults["successful"] = false;
//         } else {
//             queryResults["successful"] = true;
//             queryResults["GuideID"] = results[0].GuideID;
//             queryResults["firstName"] = results[0].firstName;
//             queryResults["lastName"] = results[0].lastName;
//             queryResults["email"] = results[0].email;
//         }
//         res.render('GuideLocation', {data});
//     });
// });
//
// app.get("/GuideAccount.html", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `SELECT UserID, lastName, firstName, email FROM UserSignUps WHERE email = ? AND password = ?`;
//     let data = [req.query.email, req.query.password];
//     mysql.pool.query(sql, data, function (error, results, fields) {
//         const queryResults = {};
//         if (error || results[0] == null) {
//             queryResults["successful"] = false;
//         } else {
//             queryResults["successful"] = true;
//             queryResults["GuideID"] = results[0].GuideID;
//             queryResults["firstName"] = results[0].firstName;
//             queryResults["lastName"] = results[0].lastName;
//             queryResults["email"] = results[0].email;
//         }
//         res.render('GuideAccount', {data});
//     });
// });
//
// app.get("/search(old).html", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `SELECT UserID, lastName, firstName, email FROM UserSignUps WHERE email = ? AND password = ?`;
//     let data = [req.query.email, req.query.password];
//     mysql.pool.query(sql, data, function (error, results, fields) {
//         const queryResults = {};
//         if (error || results[0] == null) {
//             queryResults["successful"] = false;
//         } else {
//             queryResults["successful"] = true;
//             queryResults["GuideID"] = results[0].GuideID;
//             queryResults["firstName"] = results[0].firstName;
//             queryResults["lastName"] = results[0].lastName;
//             queryResults["email"] = results[0].email;
//         }
//         res.render('search', {data});
//     });
// });
//
//
// app.post("/GuideSignUp.html", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `INSERT INTO UserRegistrations (lastName, firstName, password, email, zipCode) VALUES (?, ?, ?, ?, ?)`;
//     let render = [req.body.lastName, req.body.firstName, req.body.password, req.body.email, req.body.zipCode];
//     mysql.pool.query(sql, inserts, function (error) {
//         let msg = ""
//         if (error) {
//             let msg = "incorrect info"
//         } else {
//             let msg = ` ${req.body.firstName}, your email is ${req.body.email} and your account is ready to use.`;
//         }
//         res.render('GuideSignUp', {});
//     });
// });
//
// // Insert new Location into GuideLocationsHistory:
// app.post("/GuideRegistration.html", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `INSERT INTO UserLocationHistory VALUES (?, ?, ?)`;
//     let inserts = [req.body.zipCode]
//     mysql.pool.query(sql, inserts, function (error, results, fields) {
//         let msg = ""
//         if (error) {
//             let msg = "incorrect info"
//         } else {
//             let msg = ` ${req.body.firstName}, your email is ${req.body.email} and your account is ready to use.`;
//         }
//         res.send({ msg });
//     });
// });
//
// // Select specific Guide:
// app.post("/getGuide.html", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `SELECT UserAccounts.GuideID FROM UserAccounts WHERE UserAccounts.GuideID = ?`;
//     let insert = [req.body.GuideID]
//     mysql.pool.query(sql, insert, function (error, results, fields) {
//         let queryResults = [];
//         results.forEach((row) => {
//             queryResults.push(row)
//         })
//         console.log(queryResults);
//         res.send(queryResults);
//     });
// });
//
//
// // Select all Guides in certain location:
// app.post("/getGuides", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `SELECT UserAccounts.isGuide FROM UserAccounts WHERE UserAccounts.locationID = ?`;
//     let insert = [req.body.GuideID]
//     mysql.pool.query(sql, insert, function (error, results, fields) {
//         let queryResults = [];
//         results.forEach((row) => {
//             queryResults.push(row)
//         })
//         console.log(queryResults);
//         res.send(queryResults);
//     });
// });
//
//
// // Delete a specific GuideLocation:
// app.post("/deleteGuideLocation", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `DELETE FROM UserLocationHistory WHERE UserLocationHistory.locationID = ?`;
//     let insert = [req.body.GuideID]
//     mysql.pool.query(sql, insert, function (error, results, fields) {
//         let queryResults = [];
//         results.forEach((row) => {
//             queryResults.push(row)
//         })
//         console.log(queryResults);
//         res.send(queryResults);
//     });
// });
//
//
// // Delete a specific GuideAccount:
// app.post("/deleteGuideAccount", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `DELETE FROM UserLogins WHERE GuideLogins.lastName = ? AND GuideLogins.firstName = ? AND GuideLogins.password = ?`;
//     let insert = [req.body.GuideID]
//     mysql.pool.query(sql, insert, function (error, results, fields) {
//         let queryResults = [];
//         results.forEach((row) => {
//             queryResults.push(row)
//         })
//         console.log(queryResults);
//         res.send(queryResults);
//     });
// });
//
// // // Insert new GuideAcccount into db
// app.post("/GuideRegistration", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `INSERT INTO GuideRegistrations (lastName, firstName, password, email, zipCode) VALUES (?, ?, ?, ?, ?)`;
//     let render = [req.body.lastName, req.body.firstName, req.body.password, req.body.email, req.body.zipCode];
//     mysql.pool.query(sql, inserts, function (error) {
//         let msg = ""
//         if (error) {
//             let msg = "incorrect info"
//         } else {
//             let msg = ` ${req.body.firstName}, your email is ${req.body.email} and your account is ready to use.`;
//         }
//         res.render('GuideSignUp', {});
//     });
// });
//
// // Select a Guide from the GuideAccounts table given email and password.
// app.get("/GuideLogin", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `SELECT GuideID, lastName, firstName, email FROM GuideSignUps WHERE email = ? AND password = ?`;
//     let data = [req.query.email, req.query.password];
//     mysql.pool.query(sql, data, function (error, results, fields) {
//         const queryResults = {};
//         if (error || results[0] == null) {
//             queryResults["successful"] = false;
//         } else {
//             queryResults["successful"] = true;
//             queryResults["GuideID"] = results[0].GuideID;
//             queryResults["firstName"] = results[0].firstName;
//             queryResults["lastName"] = results[0].lastName;
//             queryResults["email"] = results[0].email;
//         }
//         res.render('GuideLogin', {data});
//     });
// });
//
//
// // Insert new Location into GuideLocationsHistory:
// app.post("/GuideRegistration", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `INSERT INTO GuideLocationHistory VALUES (?, ?, ?)`;
//     let inserts = [req.body.zipCode]
//     mysql.pool.query(sql, inserts, function (error, results, fields) {
//         let msg = ""
//         if (error) {
//             let msg = "incorrect info"
//         } else {
//             let msg = ` ${req.body.firstName}, your email is ${req.body.email} and your account is ready to use.`;
//         }
//         res.send({ msg });
//     });
// });
//
// // Select specific Guide:
// app.post("/getGuide", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `SELECT GuideAccounts.GuideID FROM GuideAccounts WHERE GuideAccounts.GuideID = ?`;
//     let insert = [req.body.GuideID]
//     mysql.pool.query(sql, insert, function (error, results, fields) {
//         let queryResults = [];
//         results.forEach((row) => {
//             queryResults.push(row)
//         })
//         console.log(queryResults);
//         res.send(queryResults);
//     });
// });
//
//
// // Select all Guides in certain location:
// app.post("/getGuides", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `SELECT GuideAccounts.isGuide FROM GuideAccounts WHERE GuideAccounts.locationID = ?`;
//     let insert = [req.body.GuideID]
//     mysql.pool.query(sql, insert, function (error, results, fields) {
//         let queryResults = [];
//         results.forEach((row) => {
//             queryResults.push(row)
//         })
//         console.log(queryResults);
//         res.send(queryResults);
//     });
// });
//
//
//
// // Delete a specific GuideLocation:
// app.post("/deleteGuideLocation", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `DELETE FROM GuideLocationHistory WHERE GuideLocationHistory.locationID = ?`;
//     let insert = [req.body.GuideID]
//     mysql.pool.query(sql, insert, function (error, results, fields) {
//         let queryResults = [];
//         results.forEach((row) => {
//             queryResults.push(row)
//         })
//         console.log(queryResults);
//         res.send(queryResults);
//     });
// });
//
//
// // Delete a specific GuideAccount:
// app.post("/deleteGuideAccount", (req, res) => {
//     let mysql = req.app.get('mysql');
//     let sql = `DELETE FROM GuideLogins WHERE GuideLogins.lastName = ? AND GuideLogins.firstName = ? AND GuideLogins.password = ?`;
//     let insert = [req.body.GuideID]
//     mysql.pool.query(sql, insert, function (error, results, fields) {
//         let queryResults = [];
//         results.forEach((row) => {
//             queryResults.push(row)
//         })
//         console.log(queryResults);
//         res.send(queryResults);
//     });
// });

app.set('port', process.argv[2]);

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') 
    + '; press Ctrl-C to terminate.');}
    );

     