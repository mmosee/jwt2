const db = require("../models");
const User = db.user;

const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = async (req, res) => {
    //test
    // console.log(res._eventsCount);
    // console.log(res._closed);
    // console.log(res.socket.userId);
    // console.log(res.socket.userid);
    const t1 = req.session.token;
    const t2 = req.session.userId;
    const t3 = req.session.username;
    //
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};