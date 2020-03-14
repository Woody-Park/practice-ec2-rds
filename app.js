// const express = require("express");
// const bodyParser = require("body-parser");
// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
// const sequelize =  require("./models").sequelize;
// const dbinfo = require("./config/config.json");
// const commentsRouter = require("./routes/comments");
// const path = require('path');

// const morgan = require('morgan');



// let app = express();
// const port = 5000;
// sequelize.sync()
// .then(()=> {
//     console.log(`✓ DB연결이 잘 되어있어요! 
//     연결 된 DB: ${dbinfo.development.database},
//     사용자 정보: ${dbinfo.development.username}`)
// });

// app.get('/', (req, res) => {
//     res.status(200).send('연결 Success');
//     console.log('요청 성공입니다.')
//   })
  

// app.use(morgan('dev')); // 로그 관리 미들웨어 


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/comments', commentsRouter);

// app.use(function(req, res, next){
//     next(createError(404));
// });


// app.set('port', port);
// app.listen(app.get('port'), () => {
//   console.log(`우린 준비되었어 PORT:${app.get('port')}번으로 들어와`);
// });




//   module.exports = app;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');
var sequelize = require('./models').sequelize;

var app = express();
sequelize.sync();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;