const express = require('express');
const Province = require("../model/province.model");
const Joi = require('joi');
const router = express.Router();

const schema = Joi.object().keys({
    name: Joi.string().min(4).max(20).required(),
    num: Joi.number().required()
})

const getProvinces=(req,res)=>{
    Province.find({})
    .then((foundProvinces) => {
        res.status(200).send(foundProvinces);
    })
    .catch(err => {
        console.error(err);
        res.send("Failed");
    })
}
const addProvince=(req,res)=>{

    const newProvince=new Province();
    newProvince.name = req.body.name;
    newProvince.num = req.body.num;
    newProvince.save()
        .then(savedOne => {
            res.send(savedOne);
        })
        .catch(err => {
            res.status(400).send(err);
        })
}

const updateProvince = (req, res) => {
    const result = schema.validate(req.body);
    if (result.error) {
        res.send(result.error.details[0].message).status(400);
        return;
    }

    Province.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(province => {
            res.send(province).status(201);
        })
        .catch(err => {
            res.send(err).status(400);
        })
}
const deleteProvince = (req, res) => {
    Province.findByIdAndRemove(req.params.id)
        .then(province => res.send(province))
        .catch(err => res.send(err).status(404));
}

router.get("/",getProvinces);
router.post("/",addProvince);
router.put("/:id",updateProvince);
router.delete("/:id",deleteProvince);
module.exports =router;