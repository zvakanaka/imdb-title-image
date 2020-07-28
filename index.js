#!/usr/bin/env node

const { window } = require('page-evaluate');
const request = require('request');
const fs = require('fs');

function strBeforeDot(str) {
    const regexArr = str.match(/(.*)\./);
    if (regexArr) {
      return regexArr[1];
    }
    return str;
}

function cleanTitle(str) {
    const beforeDotStr = strBeforeDot(str);
    return beforeDotStr.toLowerCase().replace(/[_\-'"]/g, ' ');
}

(async () => {
    if (process.argv.length < 3) {
	console.log('Usage:\n\timdb-title-image "movie name"');
    }
    const originalTitle = process.argv[2];
  const title = cleanTitle(process.argv[2]);

  const { document: findListDocument } = await window(`https://www.imdb.com/find?q=${encodeURIComponent(title)}&s=tt&ttype=ft&ref_=fn_ft`);
  const firstResult = findListDocument.querySelector('.findList a');
  if (firstResult === null) {
    throw new Error(`Could not find result for ${title}`)
  }
  const resultPageUrl = `https://www.imdb.com${firstResult.href}`;
  console.log(resultPageUrl);
  const { document } = await window(resultPageUrl);
  const titleImgSrc = document.querySelector('.poster img').src;
  console.log(titleImgSrc);

  request(titleImgSrc).pipe(fs.createWriteStream(`thumbs/${strBeforeDot(originalTitle)}.jpg`));
})();
