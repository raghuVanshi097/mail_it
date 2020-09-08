const express = require('express')
const router = express.Router()
const mongooose = require('mongoose')
const Project = mongooose.model('Project')
const requireLogin = require('../middleware/requireLogin')
const xlsx = require('xlsx')
const fs = require('fs')
const http = require("http");
const csv = require('csv-parser')

router.post('/create',requireLogin,(req,res)=>{
    const {title,body,url} = req.body
    if(!title || !body || !url){
        return res.status(422).json({error:"Add req fields"})
    }
    if(!url.includes(".xlsx")&&!url.includes(".csv")){
        return res.status(422).json({error:"Invalid File format"})
    }
    const project = new Project({
        title:title,
        body:body,
        file:url,
        belongTo:req.user,
        isSent:false
    })
    project.save().then(result=>{
        res.json({project:result})
    })
    .catch(err=>{
        console.log(err)
    })
}) 

router.get('/myproject',requireLogin,(req,res)=>{
    Project.find({belongTo:req.user._id})
    .populate('belongTo','_id name email')
    .then(myproject=>{
        res.json({myproject:myproject})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/delete',requireLogin,(req,res)=>{
    const {id} = req.body
    Project.findOne({_id:id}).then(project=>{
        console.log(project)
        project.remove().then(result=>{
            res.json(result)
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
})

router.post("/myprojectdet",requireLogin,(req,res)=>{
    const {id} = req.body
    Project.findOne({_id:id})
    .then(project=>{
        var file = project.file
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
                const datas = xlsx.utils.sheet_to_json(ws)
                var x = Object.keys(datas[0])
                if(x.length==1){
                    for(var a=0;a<datas.length;a++){
                        datas[a].Body=project.body
                    }
                }
                else{
                for(var a=0 ; a<datas.length ; a++){
                    var z = project.body
                    var y = Object.values(datas[a])
                    if(x.length>1){
                        for(var b=1 ; b<x.length ; b++){
                            z = z.replace(x[b],y[b])
                            const del = x[b]
                            delete datas[a][del]
                            datas[a].Body=z
                        }
                    }
                }}
            res.json({details:datas,title:project.title})
            }

            else {
                fs.createReadStream(dest)
                .pipe(csv({}))
                .on('data', (data)=>datas.push(data))
                .on('end',()=>{
                    fs.unlinkSync(dest)
                    var x = Object.keys(datas[0])
                    if(x.length==1){
                        for(var a=0;a<datas.length;a++){
                            datas[a].Body=project.body
                        }
                    }
                    else{
                        for(var a=0 ; a<datas.length ; a++){
                            var z = project.body
                            var y = Object.values(datas[a])
                            if(x.length>1){
                                for(var b=1 ; b<x.length ; b++){
                                    z = z.replace(x[b],y[b])
                                    const del = x[b]
                                    delete datas[a][del]
                                    datas[a].Body=z
                                }
                            }
                        }
                    }
                    res.json({details:datas,title:project.title})
                })
            }
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router