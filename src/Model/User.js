const {Model, DataTypes} = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            nascimento: DataTypes.DATE,
        }, {
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models.Endereco, { foreign_key: 'userId', as: 'enderecos' });
        this.belongsToMany(models.Tech, { foreign_key: 'UserId', through: 'user_techs', as: 'techs'});

    }
}

module.exports = User;