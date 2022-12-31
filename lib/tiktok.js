const axios = require('axios');
const cheerio = require('cheerio');

async function TiktokDownloader(Url) {
  return new Promise(async (resolve, reject) => {
    await axios
      .request({
        url: 'https://ttdownloader.com/',
        method: 'GET',
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'en-US,en;q=0.9,id;q=0.8',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
          cookie:
            'PHPSESSID=mvco928s3rb0l05mhl7f6miffa; popCookie=1; __cf_bm=JmK9uDEmXEz_1gtMRDZryeXVLqy4P0gAEXJ6aMAw1VM-1672497468-0-AbIjou/zTz0WYPmS701uH6dWb0a6hPa8EBMS97JK+UmymH1TRS78+HfeUSoBtUZEZUuXWOglKM2MJ38aHdzgqtaTkjfR83/7/rZ2afov+nB6dVybDxZCOYCh4V66yb6xmUinzP+lN7IHXUuFcZriRbA=; amp_adc4c4=V0P3sOqj6xJ9sjvbNga6gm...1glk91o2t.1glk9s93f.0.0.0',
        },
      })
      .then((respon) => {
        console.log('searching..');
        const $ = cheerio.load(respon.data);
        const token = $('#token').attr('value');
        console.log('token: ' + token);
        axios({
          url: 'https://ttdownloader.com/search/',
          method: 'POST',
          data: new URLSearchParams(
            Object.entries({ url: Url, format: '', token: token })
          ),
          headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9,id;q=0.8',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
            cookie:
              'PHPSESSID=mvco928s3rb0l05mhl7f6miffa; popCookie=1; __cf_bm=JmK9uDEmXEz_1gtMRDZryeXVLqy4P0gAEXJ6aMAw1VM-1672497468-0-AbIjou/zTz0WYPmS701uH6dWb0a6hPa8EBMS97JK+UmymH1TRS78+HfeUSoBtUZEZUuXWOglKM2MJ38aHdzgqtaTkjfR83/7/rZ2afov+nB6dVybDxZCOYCh4V66yb6xmUinzP+lN7IHXUuFcZriRbA=; amp_adc4c4=V0P3sOqj6xJ9sjvbNga6gm...1glk91o2t.1glk9s93f.0.0.0',
            'x-requested-with': 'XMLHttpRequest',
          },
        })
          .then((res) => {
            const ch = cheerio.load(res.data);
            const result = {
              status: res.status,
              result: {
                nowatermark: ch('#results-list > div:nth-child(2)')
                  .find('div.download > a')
                  .attr('href'),
                watermark: ch('#results-list > div:nth-child(3)')
                  .find('div.download > a')
                  .attr('href'),
                audio: ch('#results-list > div:nth-child(4)')
                  .find(' div.download > a')
                  .attr('href'),
              },
            };
            console.log(result.result.nowatermark);
            resolve(result);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

module.exports = { TiktokDownloader };
