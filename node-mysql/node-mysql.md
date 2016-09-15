# install
``` javascript
npm install mysql //稳定版
npm install mysqljs/mysql //最新版
```
# introduction
```js
var msyql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'user',
    password : 'password',
    database : 'database'
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution',function(err,rows,fields){
    if(err){
        throw err;
    }
    console.log('The solution is :',row[0].solution);
});
connection.end();
```
# Establishing connections
``` js
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'',
    user:'',
    password:''
});
connection.connect(function(err){
    if(err){
        console.error('error connecting:'+err.stack);
        return ;
    }
    console.log('connected is id ' + connection.threadId);
});
```

``` javascript
var mysql = require('mysql');
var connection = mysql.createConnectino({});
connection.query("SELECT 1",function(err,rows){
    // connected ! unless 'err' is set
});
```

# ssl options
``` javascript
var connection = mysql.createConnection({
    host:'',
    ssl:{
        ca:fs.readFileSync(__dirname + '/mysql-ca.crt');
    }
});
```

``` javascript
var connection = mysql.createConnection({
    host:'',
    ssl :{
        rejectUnauthorized:false
    }
});
```

# terminating connections 

``` javascript
connection.end(function(err){
    // The connection is terminate now
});
```

``` javascript
connection.destroy();
```

# pooling connections
``` javascript
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host:'',
    user:'',
    password:'',
    database:''
});
pool.query('SELECT 1 + 1 As solution ',function(err, rows, fields){
    if(err) throw err;
    console.log('The solution is :',rows[0].solution);
});
```

``` javascript
var mysql = require('mysql');
var pool = mysql.createPool({
    host:'',
    user:'',
    password:'',
    database:''
});
pool.getConnection(function(err, connection){
    //connected! unless err is set
});
```

``` javascript
var mysql = require('mysql');
var pool = mysql.createPool({});

pool.getConnection(function(err,connection){
    connection.query('SELECT something FROM sometable',function(err,rows){
        // And done with the connection.
        connection.release();
        // Don't use the connection here, it has been returned to the pool.
    });
});
```

# connection
``` javascript
pool.on('connection',function(connection){
    connection.query('SET SESSION auto_increment_increment = 1');
});
```

# enqueue
```javascript
pool.on('enqueue',function(){
    console.log('waiting for availabel connection slot');
});
```

# closing all the connections in a pool
``` javascript
pool.end(function(err){
    //all connections in the pool have ended
});
```

# poolcluster
``` javascript
var poolCluster = mysql.createPoolCluster();
poolCluster.add(config);
poolCluster.add('MASTER',masterConfig);
poolCluster.add('SLAVE1',slave1Config);
poolCluster.add('SLAVE2',slave2Config);

poolCluster.remove('SLAVE2');
poolCluster.remove('SLAVE*');

poolCluster.getConnection(function(err,connection){});
poolCluster.getConnection('MASTER',function(err,connection){});

poolCluster.on('remove',function(nodeId){
    console.log('REMOVED NODE :'+ nodeId);
})

poolCluster.getConnection('SLAVE*','ORDER',function(err,connection){});

poolCluster.of('*').getConnection(function(err,connection){});

var pool = poolCluster.of('SLAVE*','RANDOM');
pool.getConnection(function(err,connection){});
pool.getConnection(function(err,connection){});

poolCluster.end(function(err){});
```

# poolCluster options
```javascript
var clusterConfig = {
    removeNodeErrorCount:1,
    defaultSelector:'ORDER'
}

var poolCluster = mysql.createPoolCluster(clusterConfig);
```

```
connection.changeUser({user:'john'},function(err){
    if(err) throw err;
});
```

# performing queries
``` javascript
connection.query(
    'SELECT * FROM book WHERE author = "david"',
    function(errow,results,fields){
    //error will be an Error if one occurred during the query
    //results will contain the results of the query
    // fields will contain information about the returned results fields(if any)
});
```

``` javascript
connection.qurey(
    'select * from book from author = ?',
    ['david'],
    function(error,results,fields){
        // do something
    }
);
```

``` javascript
connection.query({
    sql : 'select * from book where author = ?',
    timeout : 40000,
    values : ['david']
},function(error,results,fields){

});
```

``` javascript
connection.query(
    {
        sql:'select * from book where author = ?',
        timeout:40000,
    },
    ['david'],
    function(error,results,fields){
        //do something
    }
);
```

``` javascript
var userId = 'some user provided value';
var sql = 'select * from users where id = '+connection.escape(userId);

connection.query(sql,function(err,results){

});
```

```javascript
connection.query(
    'select * from user where id = ?',
    [userId],
    function(error,results){
        //...
    }
);
```

```javascript
connection.query(
    'update users set foo = ?,baz = ?,bar = ? where id = ?',
    ['a','b','c',userId],
    function(err,results){
        //...
    }
);
```

``` javascript
var post = {id:1,title:'hello mysql'};
var query = connection.query(
    'insert into posts set ? ',
    post,
    function(err,results){
        //..
    }
);
console.log(query.sql);
```

``` javascript

var query = 'select * from posts where title = ' + mysql.escape('hellow mysql')
console.log(query);
```

``` javascript
var sorter = 'date';
var sql = 'select * from posts order by '+connection.escapedId(sorter);
connection.query(
    sql,
    function(err,results){
        //...
    }
);
```

``` javascript
var sorter = 'date';
var sql = 'select * from posts order by '+connection.escapeId('posts.'+sorter);

connection.query(
    sql,
    function(err,results){
        //...
    }
);
```

``` javascript
var userId = 1;
var columns = ['username','email'];
var query = connection.query(
    'SELECT ?? from ?? where id = ?',
    [columns,'users',userId],
    function(err,results){
        //...
    }
);
console.log(query.sql);
```

``` javascript
var sql = 'select * from ?? where ?? = ?';
var inserts = ['users','id',suerId];
sql = mysql.format(sql,inserts);
```

# custom format
``` javascript
connection.config.queryFormat = function(query,values){
    if(!values){
        return query;
    }
    return query.replace(/\:(\w+)/g,function(text,key){
        if(values.hasOwnProperty(key)){
            return this.escape(values[key]);
        }
        return text;
    }.bind(this));
}
```

```javascript
connection.query(
    'insert into posts set ?',
    {title:'test'},
    function(err,result){
        if(err) throw err;
        console.log(result.insertId);
    }
);
```

``` javascript
connection.query(
    'delete from posts where title = "title"',
    function(err,result){
        if(err) throw err;
        console.log('delete '+ result.affectedRows + 'rows');
    }
);
```

``` javascript
connection.query(
    'update posts set ...',
    function(err,result){
        if(err) throw err;
        console.log('changed '+ result.changedRows + 'rows');
    }
);
```

```javascript
connection.connect(
    function(err){
        if(err) throw err;
        console.log('connected as id '+ connection.threadId);
    }
);
```

```javascript
var query = connection.query('select * from posts');

query
    .on('error',function(err){
        //handle error , an end event will be emitted after this as well
    })
    .on('fields',function(fields){
        // the field packets form the rows to follow
    })
    .on('result',function(row){
        connection.pause();
        processRow(row,function(){
            connection.resume();
        });
    })
    .on('end',function(){

    })
```

```javascript
connection.query(
    'select * from posts'
).stream({highWaterMark:5})
.pipe();
```

```javascript
var connection = mysql.createConnection({
    multipleStatements:true
})
```

``` javascript
connection.query(
    'select 1;select 2',
    function(err,results){
        if(err) throw err;
        console.log(results[0]);
        console.log(results[1]);
    }
);
```

```javascript
var query = connection.query('select 1;select 2');

query
    .on('fields',function(fields,index){

    })
    .on(
        'result',
        function(row,index){

        }
    );
```

```javascript
var options = {sql:'',nestTables:true}
connection.query(options,function(err,results){

});
```

```javascript
var options = {sql:'',nestTables:'_'};
connection.query(options,function(err,results){
    
});
```

```javascript
connection.beginTransaction(
    function(err){
        if(err){
            throw err;
        }
        connection.query(
            'insert into posts set title = ?',
            title,
            function(err,result){
                if(err){
                    return connection.rollback(function(){
                        throw err;
                    });
                }
                var log = 'post '+result.insertId+'added';

                connection.query(
                    'insert into log set data=?',
                    log,
                    function(err,result){
                        if(err){
                            return connection.rollback(function(){
                                throw err;
                            });
                        }
                        connection.commit(function(err){
                            if(err){
                                return connection.rollback(function(){
                                    throw err;
                                });
                            }
                            console.log('success !');
                        });
                    }
                );
            }
        );
    }
);
```

# ping
```javascript
connection.ping(function(err){
    if(err){
        throw err;
    }
    console.log('server responded to ping ');
});
```

# timeout 
```javascript
connection.query(
    {sql:'select count(*) as count from big_table',timeout:60000},
    function(err,rows){
        if(err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT'){
            throw new Error('too long to count table rows !');
        }
        if(err){
            throw err;
        }
        console.log(rows[0].count + 'rows');
    }
);
```

