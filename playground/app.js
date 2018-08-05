var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//require cors
var cors = require('cors');
//var config = JSON.parse(process.env.APP_CONFIG);
var url = 'mongodb://127.0.0.1:27017/conFusion';
//var url = "mongodb://" + config.mongo.user + ":" + "wannekaDB17"+ "@" +config.mongo.hostString;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',function() {
    //we're connected
    console.log('connected to the database server')
});

var index = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var productRouter = require('./routes/productRouter');
var cart = require('./routes/cart');
var checkout = require('./routes/checkout');
var about = require('./routes/about');
var allDesign = require('./routes/allDesign');
var allDesigners = require('./routes/allDesigners');
//var getDesigners = require('./routes/getDesigners');
var designer = require('./routes/designer');
var rating = require('./routes/rating');
var contact = require('./routes/contact');
var contactUs = require('./routes/contactUs');
var extra = require('./routes/extra');
var login = require('./routes/login');
var my_account = require('./routes/my-account');
var product_detail = require('./routes/product-detail');
var product_grid_right = require('./routes/product-grid-right');
var product_list_right = require('./routes/product-list-right');
var wishlist = require('./routes/wishlist');
var test = require('./routes/test');
var sales = require('./routes/sales_confirm');
var payment = require('./routes/initpay');
var order_complete = require('./routes/order-complete');
var finalOrderRouter = require('./routes/finalOrderRouter');
var thank_you = require('./routes/thank-you');
var transactions = require('./routes/transactionRouter')






var app = express();


//socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req,res,next) {
    res.io = io;
    next();
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//passport config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', index);
app.use('/users', users);
app.use('/dishes', dishRouter);
app.use('/products', productRouter);
app.use('/test',test);
app.use('/emailReceipt',sales)
//pages to render
app.use('/about', about);
app.use('/allDesign', allDesign);
app.use('/allDesigners', allDesigners);
//app.use('/getDesigners', getDesigners);
app.use('/cart', cart);
app.use('/checkout', checkout);
app.use('/contact',contact);
app.use('/contactUs',contactUs);
app.use('/designer', designer);
app.use('/extra',extra);
app.use('/login',login);
app.use('/my-account',my_account);
app.use('/product-detail',product_detail);
app.use('/product-grid-right',product_grid_right);
app.use('/product-list-right',product_list_right);
app.use('/review',rating);
app.use('/wishlist',wishlist);
app.use('/pay',payment);
app.use('/order-complete',order_complete);
app.use('/finalOrderRouter',finalOrderRouter);
app.use('/thank-you',thank_you);
app.use('/transactions',transactions);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
    //render the error to you client application
    //res.render('error-404');
    //or
    res.json({
        message:err.message,
        error:err
    });

});

module.exports = {app:app, server:server};
