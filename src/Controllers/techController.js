const Tech = require('../Model/Tech');
const User = require('../Model/User');

module.exports = {
    async index(req, res){
        const { userId } = req.params;
        user = await User.findByPk(userId, {
            include: {association: 'techs', through: {attributes: []}}
        });

        return res.status(200).json(user.techs);
    },
    async create(req, res){
        var { userId } = req.params;
        const { nome } = req.body;
        var user = await User.findByPk(userId);
        if (!user){
            return res.status(400).json({error: 'User not found'});
        }

        const [ tech ] = await Tech.findOrCreate({
            where: { nome }
        })

        await user.addTech(tech);

        user = await User.findByPk(userId, {
            include: {association: 'techs'}
        });

        return res.status(200).json(user.techs);

        
    },

    async delete(req, res) {
        var { userId } = req.params;
        const { nome } = req.body;
        var user = await User.findByPk(userId);
        if (!user){
            return res.status(400).json({error: 'User not found'});
        }

        const tech  = await Tech.findOne({
            where: { nome }
        })

        await user.removeTech(tech);

        return res.status(200).json();

    }

}