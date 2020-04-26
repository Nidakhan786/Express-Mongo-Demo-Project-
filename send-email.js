var nodemailer = require('nodemailer');
const userControllr = require('../controllers/User');

var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user: 'nida.cse96@gmail.com',
        pass: 'nntriplebond'
    }
});

var mailOptions ={
    from: 'nida.cse96@gmail.com',
    to: 'nidaslife23@gmail.com',
    subject: 'Sending Email using Node js',
    text:`Hello this is just a test`
}

transporter.sendMail(mailOptions,function(err,info){
    if(err){
        console.log(err);
    }
    else{
        console.log("Email Send" + info.response);
    }
})