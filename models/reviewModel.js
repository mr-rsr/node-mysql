export default (sequelize, DataTypes) => {
 const Review = sequelize.define('review', {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        productId: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false // this will deactivate the timestamp columns
    }); // here review is the table name

    return Review; 
}