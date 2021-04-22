var request = require('request');
const Helper = require('../Config/Helper');
const generateAuthToken = () => {

    return new Promise((resolve,reject) => {
        var options = {
        'method': 'POST',
        'url': 'https://pix-h.aarin.com.br/api/v1/oauth/token',
        'headers': {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "empresaId":"126aec53-abf9-4765-86b0-9cb989a7507b",
            "senha":"9qj4rvax33xcrgk5fpwwfb8tbkazuz2z",
            "escopo":[
                "cob.write",
                "cob.read",
                "pix.write",
                "pix.read",
                "webhook.write",
                "webhook.read",
                "account.read",
                "destiny.account.read",
                "destiny.account.write"
            ]
        })
        };
        request(options, function (error, response) {
        if (error){
            reject(error);
        } else {
            resolve(JSON.parse(response.body));
        }
        });

    });

}

exports.createDestiny = async (req,res) => {

    try {

        const required = {
            nome: req.body.nome,
            agencia: req.body.agencia,
            numeroConta: req.body.numeroConta,
            ispb: req.body.ispb,
            numeroDocumento: req.body.numeroDocumento,
            tipoDocumento: req.body.tipoDocumento,
            tipoConta: req.body.tipoConta,
            chave: req.body.chave,
            tipoChave: req.body.tipoChave
        };
        const non_required = {};

        let requestdata = await Helper.vaildObject(required, non_required, res);

        
        const token = await generateAuthToken();

        var options = {
            'method': 'POST',
            'url': 'https://pix-h.aarin.com.br/api/v1/contas-destino',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704',
                //'X-ContaBancariaId': ''
            },
            body: JSON.stringify({
                "recebedor": {
                    "nome": requestdata.nome,
                    "agencia": requestdata.agencia,
                    "numeroConta": requestdata.numeroConta,
                    "ispb": requestdata.ispb,
                    "numeroDocumento": requestdata.numeroDocumento,
                    "tipoDocumento": requestdata.tipoDocumento,
                    "tipoConta": requestdata.tipoConta
                },
                "chave": {
                    "valor": requestdata.chave,
                    "tipoChave": requestdata.tipoChave
                }
            })
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}
exports.updateDestiny = async (req,res) => {

    try {

        const required = {
            nome: req.body.nome,
            agencia: req.body.agencia,
            numeroConta: req.body.numeroConta,
            ispb: req.body.ispb,
            numeroDocumento: req.body.numeroDocumento,
            tipoDocumento: req.body.tipoDocumento,
            tipoConta: req.body.tipoConta,
            chave: req.body.chave,
            tipoChave: req.body.tipoChave
        };
        const non_required = {};

        let requestdata = await Helper.vaildObject(required, non_required, res);

        
        const { id } = req.params;
        const token = await generateAuthToken();

        const url = ('https://pix-h.aarin.com.br/api/v1/contas-destino/'+id)

        var options = {
            'method': 'PUT',
            'url': url,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            },
            body: JSON.stringify({
                "recebedor": {
                    "nome": requestdata.nome,
                    "agencia": requestdata.agencia,
                    "numeroConta": requestdata.numeroConta,
                    "ispb": requestdata.ispb,
                    "numeroDocumento": requestdata.numeroDocumento,
                    "tipoDocumento": requestdata.tipoDocumento,
                    "tipoConta": requestdata.tipoConta
                },
                "chave": {
                    "valor": requestdata.chave,
                    "tipoChave": requestdata.tipoChave
                }
            })
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}
exports.destinyList = async (req,res) => {

    try {
        
        const token = await generateAuthToken();

        var options = {
            'method': 'GET',
            'url': 'https://pix-h.aarin.com.br/api/v1/contas-destino',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            }
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}
exports.getDestiny = async (req,res) => {

    try {
        const { id } = req.params;
        const token = await generateAuthToken();

        const url = ('https://pix-h.aarin.com.br/api/v1/contas-destino/'+id)

        var options = {
            'method': 'GET',
            'url': url,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            }
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}

exports.createCharge = async (req,res) => {

    try {

        const { cpf, cnpj} = req.body;
        if (!cpf && !cnpj){
            return res.status(400).json({error: 'CPF ou CNPJ Necessarios'});
        }
        const required = {
            nome: req.body.nome,
            valor: req.body.valor,
            conta: req.body.conta
        };
        const non_required = {};

        let requestdata = await Helper.vaildObject(required, non_required, res);
        
        const token = await generateAuthToken();
        console.log('token response',token.accessToken)

        var options = {
            'method': 'POST',
            'url': 'https://pix-h.aarin.com.br/api/v1/cob',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            },
            body: JSON.stringify({
                "calendario":{
                    "expiracao":7200
                },
                "regrasSplit":[{
                    "contaDestinoId": requestdata.conta,
                    "porcentagem": 95
                }],
                "devedor":{
                    "nome":req.body.nome,
                    "cpf":req.body.cpf,
                    "cnpj":req.body.cnpj
                },
                "valor":{
                    "original":parseFloat(req.body.valor).toFixed(2)
                },
                "chave":"40a0932d-1918-4efe-846d-35a2da1690df",
                "solicitacaoPagador":"ValeYou",
            })
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }
}


exports.EditCharge = async (req,res) => {

    try {

        const { cpf, cnpj} = req.body;
        if (!cpf && !cnpj){
            return res.status(400).json({error: 'CPF ou CNPJ Necessarios'});
        }
        const required = {
            nome: req.body.nome,
            valor: req.body.valor,
        };
        const non_required = {};

        let requestdata = await Helper.vaildObject(required, non_required, res);
        
        const token = await generateAuthToken();

        const { id } = req.params;
        const url = ('https://pix-h.aarin.com.br/api/v1/cob/'+id);

        var options = {
            'method': 'PATCH',
            'url': url,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            },
            body: JSON.stringify({
                "calendario":{
                    "expiracao":10
                },
                "devedor":{
                    "nome":req.body.nome,
                    "cpf":req.body.cpf,
                    "cnpj":req.body.cnpj
                },
                "valor":{
                    "original":parseFloat(req.body.valor).toFixed(2)
                },
                "chave":"40a0932d-1918-4efe-846d-35a2da1690df",
                "solicitacaoPagador":"ValeYou",
            })
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}

exports.getCharge = async (req,res) => {

    try {
        
        const token = await generateAuthToken();

        const { id } = req.params;
        const url = ('https://pix-h.aarin.com.br/api/v1/cob/'+id);

        var options = {
            'method': 'GET',
            'url': url,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            }
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}
exports.listCharge = async (req,res) => {

    try {
        
        const token = await generateAuthToken();

        const url = ('https://pix-h.aarin.com.br/api/v1/cob');

        var options = {
            'method': 'GET',
            'url': url,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            }
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}
exports.deleteCharge = async (req,res) => {

    try {
        
        const token = await generateAuthToken();

        const { id } = req.params;
        const url = ('https://pix-h.aarin.com.br/api/v1/cob/'+id);

        var options = {
            'method': 'DELETE',
            'url': url,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            }
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}



exports.checkBalance = async (req,res) => {

    try {

        const token = await generateAuthToken();
        console.log('token response',token.accessToken)

        var options = {
            'method': 'GET',
            'url': 'https://pix-h.aarin.com.br/api/v1/contas-bancarias/saldo',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            },
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

    

}

//simulacao de pagamento
exports.createNotificationCharge = async (req,res) => {

    try {

        const required = {
            idExternoCobranca: req.body.idExternoCobranca,
            valor: req.body.valor
        };
        const non_required = {};

        let requestdata = await Helper.vaildObject(required, non_required, res);
        console.log("data", requestdata);
        
        
        const token = await generateAuthToken();
        console.log('token response',token.accessToken)

        var options = {
            'method': 'POST',
            'url': 'https://notification-sender-h.aarin.com.br/Notification',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                'Cookie': '__cfduid=d6cdc975f4609ebfd9743890458b0c89d1618311704'
            },
            body: JSON.stringify({
                "idExternoCobranca": requestdata.idExternoCobranca,
                "valor":parseFloat(requestdata.valor).toFixed(2),
                "recebedor":{
                    "nome":"Empresa de Tecnologia S.A",
                    "ispb":"12345678",
                    "agencia":"0001",
                    "conta":"00000003446",
                    "nrCpfCnpj":"12312312312",
                    "tpPessoa":"NATURAL_PERSON"
                },
                "tpTransacao": "CRD"
            })
        };
        request(options, function (error, response) {

            console.log('\nbody',options.body)

            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                console.log('\n\nresponse', response.body);
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}








exports.listaBancos = async (req,res) => {

    try {

       
        var options = {
            'method': 'GET',
            'url': 'https://brasilapi.com.br/api/banks/v1'
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}
exports.getBanco = async (req,res) => {

    try {

       const { id } = req.params;
       const url = ("https://brasilapi.com.br/api/banks/v1/" + id);
        var options = {
            'method': 'GET',
            'url': url
        };
        request(options, function (error, response) {
            if (error){
                res.send({
                    status : 0,
                    message : error.message
                });
            } else {
                res.send({
                    status : 1,
                    message : JSON.parse(response.body)
                });
            }
        });
        
    } catch (error) {
        console.log('Error',error);
        res.send({
            status : 0,
            message : error.message
        });
    }

}