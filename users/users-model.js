const db = require('../database/dbConfig');

module.exports ={
    add,
    findById, 
    find, 
    findBy

}

function findBy(filter){
    return db('users').where(filter);
}


function find(){
    return db('users').select( 'username', 'password', 'email')
}

function add(user){
    return db('users').insert(user)
    .then(ids=>{
        return db('users').where({id: ids[0]}).first()
    })
}

function findById(id){
    return db('users').where({id}).first();
}