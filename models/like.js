module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like",
        {
        },
        {
            uniqueKeys: {
                like_unique: {
                    fields: ['userId', 'postId']
                }
            }
        }
        );

    return Like;
}