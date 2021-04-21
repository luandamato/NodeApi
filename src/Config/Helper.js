module.exports = {
    vaildObject: async function (required, non_required, res) {
        let message = '';
        let empty = [];
        let table_name = (required.hasOwnProperty('table_name')) ? required.table_name : 'users';
        
        for (let key in required) {
            if (required.hasOwnProperty(key)) {
                if (required[key] == undefined || required[key] == '') {
                    empty.push(key);
                }
            }
        }

        if (empty.length != 0) {
            message = empty.toString();
            if (empty.length > 1) {
                message += res.__('REQUIRED_MULTIPLE')
            } else {
                message += res.__('REQUIRED_SINGLE')
            }
            res.status(400).json({
                'success': false,
                'msg': message,
                'code': 400,
                'body': {}
            });
            return;
        } else {
            const marge_object = Object.assign(required, non_required);
            delete marge_object.checkexit;

            for(let data in marge_object){
                if(marge_object[data]==undefined){
                    delete marge_object[data];
                }else{
                    if(typeof marge_object[data]=='string'){
                        marge_object[data]=marge_object[data].trim();
                    } 
                }
            }

            return marge_object;
        }
    },
    
    error: function(res,err){
		console.log(err);
		console.log('error');
		// console.log(JSON.stringify(ReferenceError));
		// console.log(ReferenceError);
		// return false;
			let code=(typeof err==='object') ? ((err.statusCode) ? err.statusCode : ((err.code) ? err.code : 403)) : 403;
			let message=(typeof err==='object')? (err.message) : err;
			// console.log(code);
			// console.log(message);
			// return false;
			res.status(code).json({
				'success':false,
				'error_message':message,
				'code':code,
				'body':[]
			});
    },
    
    getBcryptHash: async (keyword) => {
        const saltRounds = 10;
        var myPromise = await new Promise(function (resolve, reject) {
            bcrypt.hash(keyword, saltRounds, function (err, hash) {
                if (!err) {

                    resolve(hash);
                } else {
                    reject('0');
                }
            });
        });
        // required.password= crypto.createHash('sha1').update(required.password).digest('hex');
        keyword = myPromise;
        return keyword;
    },

    comparePass: async (requestPass, dbPass) => {
        const match = await bcrypt.compare(requestPass, dbPass);
        return match;
    },

    sendMail: function(object){
		const nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport('SMTP',contant.mail_auth);
        
		var mailOptions = object;
		transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
           /*  console.log(info); */
			console.log('Email sent: ' + info.messageId);
		}
		});
    },
    Notification: function(object){
        var FCM = require('fcm-node');
        var serverKey = 'YOURSERVERKEYHERE'; //put your server key here
        var fcm = new FCM(serverKey);
     
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: '', 
            /* collapse_key: 'your_collapse_key', */
            
            notification: {
                title: 'Title of your push notification', 
                body: 'Body of your push notification' 
            },
            
            data: {  //you can send only notification or only data(or include both)
                my_key: 'my value',
                my_another_key: 'my another value'
            }
        };
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });


    },
     /* send_emails: function(otp,data,resu) {
        
        try {
            const nodemailer = require('nodemailer');
        
                var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'test978056@gmail.com',
                pass: 'cqlsys123'
                }
                });
                var mailOptions = {
                from: 'test978056@gmail.com',
                to: data[0].email,
                subject: 'Streetfood: Forgot password',
                html: 'Click here for change password <a href="http://192.168.1.120:3000/api/url/' + auth_key + '"> Click</a>'
                
                };                
                transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                console.log(error);
                } else {
                console.log(info);
                res.send('Email send');
                }
              });
             return resu;
        } catch (err) {
          throw err;
        }
        }, */
            
    createSHA1: function() {
        let key = 'abc'+new Date().getTime();
        return crypto.createHash('sha1').update(key).digest('hex');        
    }
      
}