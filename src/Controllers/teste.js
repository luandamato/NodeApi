const jsonData = require('../Config/jsonData');
var cep = require("cep-promise")

module.exports = {
    sucesso: async function(req, res) {
        try {
            let msg = 'GET_SUCCESS';
            let body = {hello: 'world', sucesso: true};
            jsonData.true_status(res, body, msg);


        } catch (error) {
            throw error
        }
    },
    
    async falha(req, res) {
        try {
            let msg = 'INVALID_AUTH';
            jsonData.unauth_status(res, msg, [])
        } catch (error) {
            throw error
        }
    },

    cep: async function(req, res) {
        try {
            let cepBusca = req.body.cep;
            //console.log(cepBusca);
            let r = await cep(cepBusca);
            let msg = 'GET_SUCCESS';
            jsonData.true_status(res, r, msg);


        } catch (error) {
            throw error
        }
    },
}
