const mysql =require ("mysql2")
const config =require ('./config.js')
const connection =mysql.createConnection(config)

connection.connect((err)=>{
    if (err){
        console.error(err)
    }else {
        console.log("database is conected ")
    } 
})
module.exports=connection