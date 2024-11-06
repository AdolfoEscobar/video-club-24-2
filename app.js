const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./db');
const User = require('./models/user.model');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const actorsRouter = require('./routes/actors');
const directorsRouter = require('./routes/directors');
const genresRouter = require('./routes/genres');
const moviesRouter = require('./routes/movies');
const rolesRouter = require('./routes/roles');
const {expressjwt} = require('express-jwt')

const app = express();

const jwtKey = "4c882dcb24bcb1bc225391a602feca7c"

connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressjwt({
    secret: jwtKey, 
    algorithms: ['HS256']
}).unless({
    path: [
        "/login",
        { url: "/users", methods: ['POST'] }
    ]
}));

app.use(async (req, res, next) => {
    if (req.auth) {
        try {
            const user = await User.findById(req.auth.userId);
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/actors', actorsRouter);
app.use('/directors', directorsRouter);
app.use('/genres', genresRouter);
app.use('/movies', moviesRouter);
app.use('/roles', rolesRouter);

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
