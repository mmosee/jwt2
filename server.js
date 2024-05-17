const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ name: "nms-session", keys: ["COOKIE_SECRET"], httpOnly: true }));
app.use(bodyParser.urlencoded({extended : true}));

//database
const db = require("./app/models");
const Role = db.role;


db.sequelize.sync();

//resync db
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to nms application"});
});


//TEST1 START

app.get("/post", (req, res) => {
    const indexPath = path.join(__dirname, '/json', '/test.json');
    res.sendFile(indexPath);
});

app.post("/post", (req, res) => {
    console.log(req.body);

    const filePath = path.join(__dirname, '/json', '/test.json');
    const data = req.body;

    /*
    TEST => ./json/test.json 에 배열로 쌓임
    */
    let existingData = [];

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        if (fileContents) {
            existingData = JSON.parse(fileContents);
        }
    } catch(err) {
        if (err.code !== 'ENOENT') {
            console.error(err);
            return res.status(500).send('An error occurred while reading file.');
        }
    }

    existingData.push(data);

    // 변경된 내용을 파일에 덮어쓰기
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.send('POST request received and data appended to post.json');


    /* 
    TEST => ./json/test.json 에 덮어쓰기 
    */
    // fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    //     if(err) {
    //         console.log(err);
    //         return res.status(500).send('An error occurred while writing JSON to the file.');
    //     }
    //     res.send('POST request received and data written to test.json');
    // });

});

//TEST1 END


//TEST START

app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/app/view/index.html");
});

app.get("/signUp", (req, res) => {
    res.sendFile(__dirname + "/app/view/signUp.html");
});

app.get("/signIn", (req, res) => {
    res.sendFile(__dirname + "/app/view/signIn.html");
});

//TEST END


//routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

//set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serer is running on port ${PORT}`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user",
    });

    Role.create({
        id: 2,
        name: "moderator",
    });

    Role.create({
        id: 3,
        name: "admin",
    });
}