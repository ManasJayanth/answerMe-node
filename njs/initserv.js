var mysql = require('mysql');
var fs = require('fs');

exports.serve = function(req, res) {
	var sql_user = 'root';
	var sql_pass = 'mysqlmypass';
	var sql_host = 'localhost';
	var link = mysql.createConnection({host: sql_host, user: sql_user, password: sql_pass});
	link.connect();
	var sql_db = 'answerMe';
	var sql_db_stmt = 'USE '+sql_db;
	link.query(sql_db_stmt,function(err) {
		if (!err) {
			console.log('Successfully connected to database ' + sql_db);
			var tables = ['questions','choices','qImgs','test','student','marks','answer'];
			var tableDef = ['create table questions(	qno int primary key,	qtext varchar(1000) not null,	nchoices int not null,	answer int);',
							'create table choices(	qno int,	cno int,	foreign key(qno) references questions(qno),	choice varchar(100) not null);',
							'create table qImgs(	qno int,	foreign key(qno) references questions(qno),	imgname varchar(100));',
							'create table test(	testid int primary key AUTO_INCREMENT,	testname varchar(50),	questions varchar(100),	testnos int,	timelimit int,	negmarking boolean);',
							'create table student (	loginid varchar(10) primary key,	name varchar(50),	password varchar(32));',
							'create table marks(	loginid varchar(10),	testid int,	marks int);',
							'create table answer(	loginid varchar(10),	testid int,	response varchar(500)	);'];
			for (var i = 0; i < tables.length; i++) {
				var tableName = tables[i];
				var sql_stmt = tableDef[i];
				link.query(sql_stmt, function(e, rows, f) {
					if (!e) {
						console.log('Successfully created the table ');
					}
					else {
						console.log('Failed to create the table\nReason : ' + e);
					}
				});
			};
			var sql_stmt = "insert into student values('1','abc',md5('xyz'));";
			link.query(sql_stmt, function(e, rows, f) {
				if (!e) {
					console.log('STUDENT table initialised with a record');
					// Finally creating the folder for the images
					fs.mkdir(__dirname + '/Qimgs',function(e){
					    if(!e || (e && e.code === 'EEXIST')){
					        console.log('Folder created!');
					    } else {
					        //debug
					        console.log(e);
					    }
					});
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.end('Server Initialised');
				}
				else {
					console.log('Failed to initialise STUDENT table\nReason : ' + e);
				}
			});
			link.end();
		} else {
			console.log('Error occured while connecting to ' + sql_db);
		}
	});
};