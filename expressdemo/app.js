var express = require('express')
var app = express()

// var router = express.Router()

// router.use(function timelog(req, res, next) {
// 	console.log('time: ' + Date.now())
// 	next()
// })

// router.get('/', function(req, res) {
//   res.send('Birds home page');
// })

// router.get('/about', function(req, res) {
//   res.send('About birds');
// })

// app.use('/', router)

app.listen(3000, function() {
	console.log('app listen at port 3000')
})



app.get('/user/:id', function(req, res, next) {
	if (req.params.id == 0) next('route') 
		else next()
}, function(req, res, next) {
	res.send('regular')
})

app.get('/user/:id', function(req, res, next) {
	res.send('special')
})

