const express = require('express')
const router = express.Router()
const mongooose = require('mongoose')
const xlsx = require('xlsx')
const fs = require('fs')
const http = require("http");
const nodemailer = require('nodemailer');
const requireLogin = require('../middleware/requireLogin');
const Project1 = mongooose.model('Project')
const csv = require('csv-parser')


var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'noreply.mail.it@gmail.com',
        pass:'secrethai'
    }
})

router.post('/mail',requireLogin,(req,res)=>{
    const { id,name,title,body,file,Email } = req.body
    
    var dest = file.includes(".xlsx") ? id+".xlsx" : id+".csv";
    const datas=[]
    const createFile = fs.createWriteStream(dest);
    const request = http.get(file, (response) => {
    response.pipe(createFile);
    });

    createFile.on('finish', () => {
        
        createFile.close()
        
        if(file.includes(".xlsx")){
        const wb = xlsx.readFile(dest)
        fs.unlinkSync(dest)
        const ws = wb.Sheets["Sheet1"]
        datas = xlsx.utils.sheet_to_json(ws)
        var x = Object.keys(datas[0])
            
        for(var b=0 ; b<datas.length ; b++){
            var flag=0
            var z = body
            var email = Object.values(datas[b])[0]
            var y = Object.values(datas[b])
            if(x.length>1){
                for(var a=1 ; a<x.length ; a++){
                    z = z.replace(x[a],y[a])
                    const del = x[a]
                    delete datas[b][del]
                    datas[b].Body=z
                }
            }else{
                datas[b].Body=z
            }
            var mailOptions ={
                from:{
                    name: name,
                    address: 'foobar@example.com'
                    },
                to:email,
                subject:title,
                text:z
            } 
            
            transporter.sendMail(mailOptions).catch(err=>{
                flag=1
                datas[b].Status="Failed"
            })
            if(flag==0){
                datas[b].Status="Success"
                }
            }
            
            const newWb= xlsx.utils.book_new()
            const newWs=xlsx.utils.json_to_sheet(datas)
            xlsx.utils.book_append_sheet(newWb,newWs,"Sheet1")
            xlsx.writeFile(newWb,id+'abc.xlsx')
            var mailOptions ={
                from:{
                    name: "mailit_report",
                    address: 'foobar@example.com'
                },
                to: Email,
                subject:"Project Report",
                attachments: [
                    {   
                        filename: 'Report.xlsx',
                        path: id+'abc.xlsx'
                    }]
            } 
            transporter.sendMail(mailOptions,(error)=>{
                if(error){
                    res.status(422).json({error:error})
                    fs.unlinkSync(id+'abc.xlsx')
                } else {
                    fs.unlinkSync(id+'abc.xlsx')
                    res.json({message:"success"})
                    Project1.findOne({_id:id}).then(project=>{
                        project.isSent=true
                        project.save()
                        .then(result=>{
                            console.log(result)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
            })
        } 
        
        else {
            fs.createReadStream(dest)
            .pipe(csv({}))
            .on('data', (data)=>datas.push(data))
            .on('end',()=>{
                fs.unlinkSync(dest)
                console.log(datas)
                var x = Object.keys(datas[0])
                for(var b=0 ; b<datas.length ; b++){
                    var flag=0
                    var z = body
                    var email = Object.values(datas[b])[0]
                    var y = Object.values(datas[b])
                    if(x.length>1){
                        for(var a=1 ; a<x.length ; a++){
                            z = z.replace(x[a],y[a])
                            const del = x[a]
                            delete datas[b][del]
                            datas[b].Body=z
                        }
                    }else{
                        datas[b].Body=z
                    }
                    var mailOptions ={
                        from:{
                            name: name,
                            address: 'foobar@example.com'
                            },
                        to:email,
                        subject:title,
                        text:z
                    } 
                    
                    transporter.sendMail(mailOptions).catch(err=>{
                        flag=1
                        datas[b].Status="Failed"
                    })
                    if(flag==0){
                        datas[b].Status="Success"
                    }
                }
                    
                const newWb= xlsx.utils.book_new()
                const newWs=xlsx.utils.json_to_sheet(datas)
                xlsx.utils.book_append_sheet(newWb,newWs,"Sheet1")
                xlsx.writeFile(newWb,id+'abc.xlsx')
                var mailOptions ={
                    from:{
                        name: "mailit_report",
                        address: 'foobar@example.com'
                    },
                    to: Email,
                    subject:"Project Report",
                    attachments: [
                        {   
                            filename: 'Report.xlsx',
                            path: id+'abc.xlsx'
                        }]
                } 
                transporter.sendMail(mailOptions,(error)=>{
                    if(error){
                        res.status(422).json({error:error})
                        fs.unlinkSync(id+'abc.xlsx')
                    } else {
                        fs.unlinkSync(id+'abc.xlsx')
                        res.json({message:"success"})
                        Project1.findOne({_id:id}).then(project=>{
                            project.isSent=true
                            project.save()
                            .then(result=>{
                                console.log(result)
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                })
            })
        }
    })
})


module.exports = router