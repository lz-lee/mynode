var eventproxy = require('eventproxy')
var superagent = require('superagent')
var cheerio = require('cheerio')

// url 模块是标准库里的
var url = require('url')

var cnodeUrl = 'https://cnodejs.org/'

superagent.get(cnodeUrl)
	.end(function(err, res) {
		if (err) {
			return console.error(err)
		}
		// 得到url数组
		var topicUrl = []
		var $ = cheerio.load(res.text)
		$('#topic_list .topic_title').each(function(idx, element) {
			var $element = $(element)
			// url 的resolve(from, to)方法把一个目标 URL 解析成相对于一个基础 URL
			var href = url.resolve(cnodeUrl, $element.attr('href'))
			topicUrl.push(href)
		})

		// 得到eventproxy实例
		var ep = new eventproxy()

		// after方法适合重复的操作 ，将handler注册到N次相同事件的触发上。达到指定的触发数，handler将会被调用执行，每次触发的数据，将会按触发顺序，存为数组作为参数传入
		ep.after('topic_html', topicUrl.length, function(topics) {
			topics = topics.map(function(topicPair) {
				var topicUrl = topicPair[0]
				var topicHtml = topicPair[1]
				var $ = cheerio.load(topicHtml)
				return ({
					title: $('.topic_full_title').text().trim(),
					href: topicUrl,
					comment1: $('.reply_content').eq(0).text().trim()
				})
			})
			console.log('final:')
			console.log(topics)
		})

		topicUrl.forEach(function(item) {
			superagent.get(item)
				.end(function(err, res) {
					if (err) console.error(err)
					console.log('fetch: ' + item + ' successful!')
					ep.emit('topic_html', [item, res.text])
				})
		})
	})

