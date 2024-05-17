module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("test", {
        test1: {
            type: Sequelize.STRING
        },
        test2: {
            type: Sequelize.STRING
        }
    });

    return Test;
};