const express = require('express')
const router = express.Router()
const mongooose = require('mongoose')
const User = mongooose.model('User')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT} = require('../keys')
const nodemailer = require('nodemailer');
const crypto = require('crypto')



router.post('/signup',(req,res)=>{
    const { name , email , password ,type } = req.body
    if(!email || !password || !name){
        res.json({error:"pls add field"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists, Please Login"})
        }
        if(type==="indirect"){
            var token=""
            crypto.randomBytes(32,(error,buffer)=>{
                    token = buffer.toString("hex")
            })
            bcrypt.hash(password,12)
            .then(hashed=>{
                const user = new User({
                    email,
                    password:hashed,
                    name,
                    isVerified:"no",
                    resetToken:token
                })
                user.save()
                .then(user=>{
                    var transporter = nodemailer.createTransport({
                        service:'gmail',
                        auth:{
                                user:'noreply.mail.it@gmail.com',
                                pass:'secrethai'
                            }
                        })
                    var mailOptions ={
                        from:{
                            name: "mail_it_verify",
                            address: 'foobar@example.com'
                        },
                        to:email,
                        subject:"Email Verification",
                        html:`
                        <p>Click on this <a href="http://localhost:3000/verify/${token}">link</a> to verify your Email</p>
                            `
                    } 
                    transporter.sendMail(mailOptions,(error)=>{
                        if(error){
                            res.status(422).json({error:error})
                        } else {
                            res.json({message:"Please verify your Email"})
                        }
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        }
        else{
        bcrypt.hash(password,12)
        .then(hashed=>{
            const user = new User({
                email,
                password:hashed,
                name,
                isVerified:"yes"
            })
            user.save()
            .then(user=>{
                const token = jwt.sign({_id:user._id},JWT)
                const {_id,name,email}= user
                res.json({token:token,user:{_id,name,email}})
            })

            .catch(err=>{
                console.log(err)
            })
        })}
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/login',(req,res)=>{
    const { email , password } = req.body
    if(!email || !password){
       return res.status(422).json({error:"provide email or pass"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
          return res.status(422).json({error:"Invalid email or password"})
        }
        if(savedUser.isVerified==="no"){
            return res.status(422).json({error:"Please verify your Email"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Success"})
                const token = jwt.sign({_id:savedUser._id},JWT)
                const {_id,name,email}= savedUser
                res.json({token:token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post('/verify-email',(req,res)=>{
    const {token} = req.body
    User.findOne({resetToken:token})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Please try again"})
        }
        user.isVerified="yes"
        user.resetToken=undefined
        user.save().then((saveduser)=>{
            res.json({message:"verified"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post('/forgot-pw',(req,res)=>{
    const {email} = req.body
    User.findOne({email:email})
    .then(user=>{
        if(user.isVerified==="no"){
            return res.status(422).json({error:"Invalid Email"})
        }
        if(!user){
            return res.status(422).json({error:"Please check the email and try again"})
        }
        crypto.randomBytes(32,(error,buffer)=>{
            if(error){
                console.log(error)
            }
            const token = buffer.toString("hex")
            user.resetToken=token
            user.expireToken = Date.now() + 3600000
            user.save()
            .then(result=>{
                var transporter = nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:'noreply.mail.it@gmail.com',
                        pass:'secrethai'
                    }
                })
                var mailOptions ={
                    from:{
                        name: "mail_it_resetpw",
                        address: 'foobar@example.com'
                    },
                    to:email,
                    subject:"Password Reset",
                    html:`
                    <p>Click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset your Password.This link will expire in 1 hour</p>
                    `
                } 
                transporter.sendMail(mailOptions,(error)=>{
                    if(error){
                        res.status(422).json({error:error})
                    } else {
                        res.json({message:"Link sent to your Email"})
                    }
                })
            })
            .catch(err=>{
                console.log(err)
            })
            .catch(err=>{
            console.log(err)
            })
        })
    })
})

router.post('/reset',(req,res)=>{
    const {password,token} = req.body
    User.findOne({resetToken:token,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Link expired please try again"})
        }
        bcrypt.hash(password,12)
        .then(hashed=>{
            user.password=hashed
            user.resetToken=undefined
            user.expireToken=undefined
            user.save()
            .then(result=>{
                res.json({message:"Password Updated"})
            })
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router