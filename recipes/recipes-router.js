const express = require('express');
const Recipes = require('./recipes-model');

const router = require('express').Router();

//GET request-returns array for recipes from login token
router.get('/',(req,res)=>{
    Recipes.find()
    .then(recipes=>{
        res.status(200).json(recipes)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage: "Sorry, encountered an error in retreiving recipes."})
    })
})


module.exports = router;