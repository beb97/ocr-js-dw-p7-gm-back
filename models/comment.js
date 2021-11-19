module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        message: {
            type: Sequelize.STRING,
        }
    });

    return Comment;
}