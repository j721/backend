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
        res.status(500).json({errorMessage: "Sorry, encountered an error in retrieving recipes."})
    })
})

// GET  recipes by id from recipes list
router.get('/:id/recipe',(req,res)=>{
    const { id } = req.params;

    Recipes.findById(id)
    .then((recipes)=>{
        if(recipes.length){
            res.status(200).json(recipes)
        }else{
            res.status(404).json({errorMessage: "Could not find recipe by that id."})
        }
    })
    .catch((err)=>{
        res.status(500).json({errorMessage: "Sorry, could not retrieve recipes data."})
    })
})

//GET recipe created specifically by the user from userID
router.get('/:id/')


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



//PUT request- updates the recipe by id


//DELETE request- remove a recipe by id

module.exports = router;