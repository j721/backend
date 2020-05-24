const db = require('../database/dbConfig');

module.exports ={
    find,
    findById,
    add,
    update,
    remove
}

// function find(){
//     return db('recipes')
// }

function find(){
    return db.select ("*")
    .from("recipes")
}


function findById(id){
    return db.select ('*')
    .from("recipes")
    .where({id})  
}

function add(recipe){
    return db('recipes')
    .insert(recipe)
    .then(ids=>{
        return findById(ids[0])
    })
}

function update (changes, id){
    return db("recipes")
    .where({id})
    .update(changes)
}

function remove(id){
    return db ("recipes")
    .where({id})
    .del()
}