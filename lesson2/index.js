var express = require('express')

var utility = require('utility')
// 创建实例
var app = express()

app.get('/', function(req, res) {
	// req.query 获取请求url中的查询参数
	var q = req.query.q

	// md5 加密
	var md5Value = utility.md5(q)

	res.send(md5Value)
})

app.listen(3000, function() {
	console.log('app is running at port 3000')
})