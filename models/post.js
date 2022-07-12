module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        titre: {
            type: Sequelize.STRING,
        },
        message: {
            type: Sequelize.STRING,
        }
    });

    return Post;
}