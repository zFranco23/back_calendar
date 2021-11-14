const { connect } = require('mongoose');

const connectionDB = async () => {

    try{
        const connection = await  connect(process.env.DB_USER);
        console.log('Mongo atlas conectado')
    }catch(err){
        console.log(err);
        throw new Error('Error al conectar base de datos');
    }

}


module.exports = connectionDB;