export default (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.INTEGER
        },
        published: {    
            type: DataTypes.BOOLEAN
        },  
    }, {
        timestamps: false // this will deactivate the timestamp columns
    }); // here products is the table name
    return Product;
}