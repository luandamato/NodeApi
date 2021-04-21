const {Model, DataTypes} = require('sequelize');

class Endereco extends Model {
    static init(sequelize){
        super.init({
            estado: DataTypes.STRING,
            cidade: DataTypes.STRING,
            bairro: DataTypes.STRING,
            rua: DataTypes.STRING,
            numero: DataTypes.STRING,
            complemento: DataTypes.STRING,
            cep: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, {foreign_key: 'userId', as: 'user'});
    }
}

module.exports = Endereco;