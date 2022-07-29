module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        pseudo: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            len: [2, 30]
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return User;
}