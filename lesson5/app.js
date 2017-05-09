var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')

var url = require('url')

var cnodeUrl = 'https://cnodejs.org/'
var num = 0
var urls = []

// 获取需要抓取数据的网页数组
superagent.get(cnodeUrl)
	.end(function(err, res) {
		if (err) {
			return console.error(err)
		}
		var $ = cheerio.load(res.text)
		$('#topic_list .topic_title').each(function(idx, element) {
			var $element = $(element)
			var href = url.resolve(cnodeUrl, $element.attr('href'))
			urls.push(href)
		})
	})

// 抓取单个页面的需要的数据
function fetchUrl(url, callback){
	num++
	console.log('现在并发抓取的网页数是：' + num, '正抓取的是： ' + url)
	superagent.get(url)
		.end(function(err, res) {
			if (err) return console.error(err)
				var $ = cheerio.load(res.text)
				var temp = $('.changes span').eq(0).text();
				num--
				// 注意callback的第二个参数，
				callback(null, temp)
		})
}

// start
var app = express()

app.get('/', function(req, res, next) {
	// 并发数为5
	// 对每个元素之行第一个回调函数
	// 所有执行完后执行第二个回调
	async.mapLimit(urls, 5, function(url, callback) {
		fetchUrl(url, callback)
	}, function(err, result) {
		res.send(result)
	})

})

app.listen(3000, function() {
	console.log('app is listening at port 3000')
})
