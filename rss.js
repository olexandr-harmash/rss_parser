const CronJob = require('cron').CronJob;
const Parser = require('rss-parser');
const parser = new Parser();
const PostService = require('./services/posts');

//'http://lifehacker.com/rss'
async function parseRss(url) {
  let feed = await parser.parseURL(url);

  feed.items.forEach(item => {
    console.log(item)
  });

  return feed
};

const job = new CronJob('0 */30 * * * *', function() {
    // const d = new Date();
	// console.log('Midnight:', d);
    parseRss(process.env.RSS_URL)
    .then((data) => {PostService.postsUpdateMany(data.items)})
    .catch((err) => console.log(err))
});
job.start();
