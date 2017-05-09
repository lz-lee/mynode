var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')
var app = express()

app.get('/', function(req, res, next) {
	// 用superagent去抓取网页内容
	superagent.get('https://cnodejs.org/')
		.end(function(err, sres) {
			if (err) {
				// 常规错误处理
				return next(err)
			}

			// sres.text里存储着网页的html内容，传给cheerio.load之后，可得到一个实现jq的接口变量，命名为$
			var $ = cheerio.load(sres.text)
			var items = []
			$('#topic_list .topic_title').each(function(idx, element) {
				var $element = $(element)
				items.push({
					title: $element.attr('title'),
					href: $element.attr('href')
				})
			})
			// 向页面呈现内容
			res.send(items)
		})
})
app.listen(3000, function() {
	console.log('app is running at port 3000')
})