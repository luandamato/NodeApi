const express = require('express');
const payment = require('./Controllers/PaymentController');
const teste = require('./Controllers/teste');
const user = require('./Controllers/userController');
const endereco = require('./Controllers/enderecoController');
const tech = require('./Controllers/techController');

var routes = express.Router();



routes.get('/cep', teste.cep);
routes.get('/listaBancos', payment.listaBancos);
routes.get('/listaBancos/:id', payment.getBanco);

// pagamentos
routes.post('/mobile/payment/pix/destiny', payment.createDestiny);
routes.put('/mobile/payment/pix/destiny/:id', payment.updateDestiny);
routes.get('/mobile/payment/pix/destiny', payment.destinyList);
routes.get('/mobile/payment/pix/destiny/:id', payment.getDestiny);

routes.post('/mobile/payment/pix/charge', payment.createCharge);
routes.put('/mobile/payment/pix/charge/:id', payment.EditCharge);
routes.get('/mobile/payment/pix/charge/:id', payment.getCharge);
routes.delete('/mobile/payment/pix/charge/:id', payment.deleteCharge);
routes.get('/mobile/payment/pix/charge', payment.listCharge);

routes.post('/mobile/payment/pix/balance', payment.checkBalance);
routes.post('/mobile/payment/pix/notification-charge', payment.createNotificationCharge);



//curso
routes.post('/user', user.create);
routes.get('/user', user.index);
routes.get('/user-completo', user.getAll);
routes.get('/user/:userId', user.find);
routes.put('/user/:userId', user.update);

routes.post('/user/:userId/endereco', endereco.create);
routes.get('/user/:userId/endereco', endereco.index);
routes.delete('/user/:userId/endereco', endereco.delete);

routes.post('/user/:userId/tech', tech.create);
routes.get('/user/:userId/tech', tech.index);
routes.delete('/user/:userId/tech', tech.delete);



module.exports =routes;