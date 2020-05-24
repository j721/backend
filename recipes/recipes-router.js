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

//POST request- creates a new recipe from validated user
router.post('/:id/user',(req,res)=>{
    const newRecipe = req.body;
    const { id } = req.params;

    Recipes.add(newRecipe, id)
    .then((addedRecipe)=>{
        res.status(200).json(addedRecipe)
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({errorMessage:
             "Please make sure that title, source, ingredients, instructions, and category are present."})
    })
})



module.exports = router;