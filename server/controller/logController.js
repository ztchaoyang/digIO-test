const formidable = require('formidable');
const fs = require('fs')
const Alpine = require('alpine');
const { resolve } = require('path');
const alpine = new Alpine();

exports.parse = async function parse(req, res) {

    const form = formidable({ multiples: true });
    let ipAddresses = [];
    let visitedUrls = [];
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        try {
            alpine.parseReadStream(fs.createReadStream(files.someExpressFiles.path, { encoding: "utf8" }),
                async function (data) {
                    ipAddresses.push(data.remoteHost);
                    visitedUrls.push(data.request.split(" ")[1]);
                });
        } catch (err) {
            console.error(err);
            throw "Error occored";
        }

    });
    return setTimeout(function () { res.send({ uniqueIpCount: findUniqueElements(ipAddresses).length, top3VisitedUrls: find3MostFrequent(visitedUrls), top3ActiveUrls: find3MostFrequent(ipAddresses) })}, 1000);
};

function find3MostFrequent (arr) {
    const map = {};
    arr.forEach(url => {
       if(map.hasOwnProperty(url)){
          map[url]++;
       }else{
          map[url] = 1;
       }
    });
    const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
    frequencyArr.sort((a, b) => b[1] - a[1]);
    return frequencyArr.slice(0, 3).map(el => el[0]);
 };

function findUniqueElements(arr) {
    let result1 = [];
    arr.map(el => {
        if (!result1.includes(el)) {
            result1.push(el);
        }
    });
    return result1;
}

exports.page = (req, res) => {
    return res.status(200).send(`
    <h2>Parse httpd logs</h2>
    <form action="/api/v1/logs" enctype="multipart/form-data" method="post">
      <div>File: <input type="file" name="someExpressFiles"/></div>
      <input type="submit" value="Upload" />
    </form>
  `);
};