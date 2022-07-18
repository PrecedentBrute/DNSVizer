const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-cors'), {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',    // Change your credntials here
    port: 3306,
    user: 'root',
    password: 'psindiap',
    database: 'viz'
});

con.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established."); 
    }
});



function alterV(){
    return new Promise(function(resolve, reject) {
        con.query("alter view `view` as select sub,dlb,domain,net.net_add,dlb.dlb_add,ip_add from dlb inner join net on dlb.dlb_add=net.dlb_add inner join root on root.net_add=net.net_add;", function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);
            resolve(result);
        });
    });
}


const set_ip = async (a,b,c,d) => {
    return new Promise(function(resolve, reject) {
        con.query(`call set_ip('${a}','${b}','${c}','${d}',@z)`, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);
            resolve(result);
        });
    });

}

function reset(){
    return new Promise(function(resolve, reject) {
        con.query("update queries set `Cache IP Address`=null,`Root IP Address`=null,`Net IP Address`=null,`DLB IP Address`=null,`IP Address`=null;", function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);
            resolve(result);
        });
    });
}




const get_ip = async (a)=>{
    return new Promise(function(resolve, reject) {
        con.query(`call get_ip('${a}',@x,@y,@z)`, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);
            resolve(result);
        });
    });
}

const get_cache= async ()=>{
    return new Promise(function(resolve, reject) {
        con.query(`select * from queries`, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);
            resolve(result);
        });
    });
}
const fetch_ip = async (a)=>{
    return new Promise(function(resolve, reject) {
        con.query(`select * from queries where \`Domain name\`='${a}'`, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);
            resolve(result);
        });
    });
}
function getV()
{
    return new Promise(function(resolve, reject) {

        con.query("select * from `view`", function (err, result, fields) {
            if (err) {
                reject(err);
            }
            console.log(result);
            resolve(result);
        });
    });
}

// Declare a route
fastify.get('/', async (request, reply) => {
    try{
        reply.send('Hello');
    }catch(err){
        reply.send(err);
    }
})

fastify.get('/exist', async (request, reply) => {
    
    try{
        await alterV();
        const result = await getV();
       
        reply.send(result);
    
    }catch(err){
        reply.send(err);
    }
});

fastify.get('/reset', async (request, reply) => {
    
    try{
        await reset();
       
        reply.send({message: "Due to extended time of inactivity, the cache has been reset. Please refresh the page to start again."});
    }catch(err){
        reply.send(err);
    }
});

fastify.get('/cache', async (request, reply) => {
    
    try{
        const res=await get_cache();
       
        reply.send(res);
    }catch(err){
        reply.send(err);
    }
});




fastify.post('/set', async (request, reply) => {
    const naya = request.body
    try{
        await set_ip(naya?.link, naya?.ntad, naya?.dlbadd, naya?.ipad);
        reply.send({
            message: "The IP address has been stored into the database. Run your query again on the portal to see it in action!"
        })
    }catch(err){
        reply.send(err);
    }
});

fastify.post('/get', async (request, reply) => {
    const naya = request.body
    try{
        await get_ip(naya?.link);
        const result = await fetch_ip(naya?.link);
        reply.send(result);
    }catch(err){
        reply.send(err);
    }
});

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()










