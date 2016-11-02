'use strict';

const cheerio = require('cheerio');
const request = require('request');

let mac = [], tricks = [];

request('http://www.macdigger.ru/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var arr = [];
        $('.post').each(function () {
            var post = {};
            post.date = $(this).find(".post-meta").text();
            post.title = $(this).find(".title").text();
            post.content = $(this).find(".entry").text();
            mac.push(post);
        });
    }
});

request('https://css-tricks.com/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('.article-card').each(function () {
            var post = {};
            post.date = $(this).find(".bar-time").text();
            post.title = $(this).find(".read-article").text();
            post.author = $(this).find(".author-byline").text();
            post.content = $(this).find(".text-block").text();
            tricks.push(post);
        });
    }
});

module.exports = {mac, tricks};