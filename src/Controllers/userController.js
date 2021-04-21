const User = require('../Model/User');

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },
    async getAll(req, res) {
        const users = await User.findAll({
            include: [
                {association: 'enderecos'}, 
                {association: 'techs',  through: {attributes: []}, attributes:['id', 'nome']}
            ]
        });

        return res.json(users);
    },
    async find(req, res) {
        var { userId } = req.params;
        const user = await User.findByPk(userId, {
            include: [{association: 'enderecos'}, {association: 'techs'}]
        });

        return res.json(user);
    },
    async create(req, res){
        var nascimento = new Date(req.body.nascimento);
        const { nome, email} = req.body;

        const user = await User.create({nome, email, nascimento});

        res.send(user);
        
    },

    async update(req, res){
        var { userId } = req.params;
        const user = await User.findByPk(userId);

        if (!user){
            return res.status(400).json({error: 'User not found'});
        }
        var nascimento = new Date(req.body.nascimento);
        const { nome, email} = req.body;

        if (nascimento){
            user.nascimento = nascimento;
        }
        if (nome){
            user.nome = nome;
        }
        if (email){
            user.email = email;
        }
        user.save();
        
        res.send(user);

    }

}