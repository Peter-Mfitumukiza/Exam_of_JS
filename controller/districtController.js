const express = require('express');
const District = require("../model/district.model");
const Joi = require('joi');
const Province = require('../model/province.model');
const router = express.Router();

const schema = Joi.object().keys({
    name: Joi.string().min(4).max(20).required(),
    province: Joi.string().required(),
    num:Joi.number().required()
})

const getDistricts=(req,res)=>{
    District.find({})
    .then((foundDistricts) => {
        res.status(200).send(foundDistricts);
    })
    .catch(err =>{
        console.error(err);
        res.send("Failed");
    })
}
const addDistrict=(req,res)=>{

    const result = schema.validate(req.body);
    if (result.error) {
        res.send(result.error.details[0].message).status(400);
        return;
    }
    const newDistrict=new District();
    newDistrict.name = req.body.name;
    newDistrict.province=req.body.province;
    newDistrict.num = req.body.num;
    newDistrict.save()
        .then(savedOne => {
            res.send(savedOne);
        })
        .catch(err => {
            res.status(400).send(err);
        })
}

const updateDistrict = (req, res) => {
    const result = schema.validate(req.body);
    if (result.error) {
        res.send(result.error.details[0].message).status(400);
        return;
    }

    District.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(district => {
            res.send(district).status(201);
        })
        .catch(err => {
            res.send(err).status(400);
        })
}
const deleteDistrict = (req, res) => {
    District.findByIdAndRemove(req.params.id)
        .then(district => res.send(district))
        .catch(err => res.send(err).status(404));
}
const checkProvince=(req,res,next)=>{
    Province.findOne({'name':req.body.province},(err,result)=>{
        if(result){
            next();
        }else{
            res.send("Register the province first");
        }
    })
}

router.get("/",getDistricts);
router.post("/",checkProvince,addDistrict);
router.put("/:id",updateDistrict);
router.delete("/:id",deleteDistrict);
module.exports =router;