const express= require('express');
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(express.static(__dirname));
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: '8972ram@gmail.com',
        pass:'hvex hgxl ebph sdgu',

    }
});
app.post('/send-email',(req,res) =>{
    const{
    name, to,subject,message
    }=req.body;
    const mailoptions= {
        from:'8972ram@gmail.com', 
        to: to,
        subject:`${subject}(from ${name})`,
        text:message
    };
    transporter.sendMail(mailoptions,(error, info)=>{
        if(error){
    console.log(error);
    return res.json({success:false,error:error.toString()});
        }
       res.json({success:true}); 
    })

})
app.listen(6767,()=>console.log('server is running on http://localhost:6767'));



