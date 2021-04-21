const Endereco = require('../Model/Endereco');
const User = require('../Model/User');
var cep = require("cep-promise")

module.exports = {
    async index(req, res){
        var { userId } = req.params;
        const user = await User.findByPk(userId, {
            include: {association: 'enderecos'}
        });
        
        return res.json(user.enderecos);
    },
    async create(req, res){
        var { userId } = req.params;
        const user = await User.findByPk(userId);
        if (!user){
            return res.status(400).json({error: 'User not found'});
        }


        const { Cep, numero, complemento} = req.body;
        let end = await cep(Cep);
        if (!end.city){
            return res.status(400).json({error: 'CEP not found'});
        }
        const endereco = await Endereco.create({
            estado: end.state,
            cidade: end.city,
            bairro: end.neighborhood,
            rua: end.street,
            numero,
            complemento,
            cep: end.cep,
            userId,
        });

        res.send(endereco);
        
    },

    async delete(req, res){
        const { userId } = req.params;
        const end  = await Endereco.findOne({
            where: { userId }
        });

        end.destroy();
        end.save();
        return res.status(200).json();
    }

}