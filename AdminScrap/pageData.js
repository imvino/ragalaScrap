var SqlString = require('sqlstring');

//movies
module.exports.namesTitle = async (page) => {
    let column=[]
    let data=[]
    data['movieName'] = await page.$eval("input#MainContent_txtname", el => el.value)
    data['language'] = await page.$eval("select#MainContent_txtlanguage", el => el.value)
    data['rating'] = await page.$eval("select#MainContent_txtContentRating", el => el.value)
    data['filmPersonals'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.querySelector('[name="ctl00$MainContent$lstfp"]').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        return JSON.stringify(selected);
    });
    data['banner'] = await page.$eval("input#MainContent_txtbanner", el => el.value)
    data['cast'] = await page.$eval("textarea#MainContent_txtcast", el => el.value)
    data['crew'] = await page.$eval("textarea#MainContent_txtcrew", el => el.value)
    data['music'] = await page.$eval("input#MainContent_txtmusic", el => el.value)
    data['producer'] = await page.$eval("input#MainContent_txtproducer", el => el.value)
    data['director'] = await page.$eval("input#MainContent_txtdirector", el => el.value)
    data['genere'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.querySelector('[name="ctl00$MainContent$lsttype"]').options) {
            if (option.selected && option.value != '') {
                selected.push(option.value);
            }
        }
        return JSON.stringify(selected);
    });
    data['currentProgress'] = await page.$eval("textarea#MainContent_txtprogress", el => el.value)
    data['imageLink'] = await page.$eval("input#MainContent_txtimage", el => el.value)
    data['releaseDate'] = await page.$eval("input#MainContent_txtreleasedate", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    if(data['seoTitle']===''){
        data['seoTitle']= await page.innerText("#MainContent_hlpseotitle");
    }
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    if(data['metaDescription']===''){
        data['metaDescription']= await page.innerText("#MainContent_hlpmetadesc");
    }
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    if(data['metaKeywords']===''){
        data['metaKeywords']= await page.innerText("#MainContent_hlpmetakey");
    }
    data['duration'] = await page.$eval("input#MainContent_txtduration", el => el.value)
    data['imdbWikiUrl'] = await page.$eval("input#MainContent_txtsameas", el => el.value)
    data['synopsis'] = await page.$eval("textarea#MainContent_txtsynopsis", el => el.value)
    data['trailer'] = await page.$eval("input#MainContent_txttrailer", el => el.value)
    data['ottUrls'] = await page.$eval("input#MainContent_otturl", el => el.value)
    data['ottPlatform'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.querySelector('[name="ctl00$MainContent$lstottplatform"]').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        return JSON.stringify(selected);
    });
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    data['monthHighlight'] = await page.$eval("[name=\"ctl00$MainContent$rbmonthfocus\"]:checked", el => el.value)
    data['yearHighlight'] = await page.$eval("[name=\"ctl00$MainContent$rbyearfocus\"]:checked", el => el.value)
    // console.log(data)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}

//starzone
module.exports.filmpersonals = async (page) => {
    let column=[]
    let data=[]
    data['name'] = await page.$eval("input#MainContent_txtname", el => el.value)
    data['category'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_lstcategory').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        return JSON.stringify(selected);
    });
    data['alternateNames'] = await page.$eval("input#MainContent_txtadditionalName", el => el.value)
    data['birthday'] = await page.$eval("input#MainContent_txtbday", el => el.value)
    data['birthPlace'] = await page.$eval("input#MainContent_txtbirthPlace", el => el.value)
    data['height'] = await page.$eval("input#MainContent_txtheight", el => el.value)
    data['weight'] = await page.$eval("input#MainContent_txtweight", el => el.value)
    data['nationality'] = await page.$eval("input#MainContent_txtnationality", el => el.value)
    data['parents'] = await page.$eval("input#MainContent_txtparent", el => el.value)
    data['spouse'] = await page.$eval("input#MainContent_txtspouse", el => el.value)
    data['children'] = await page.$eval("input#MainContent_txtchildren", el => el.value)
    data['siblings'] = await page.$eval("input#MainContent_txtsibling", el => el.value)
    data['profession'] = await page.$eval("input#MainContent_txthasOccupation", el => el.value)
    data['languages'] = await page.$eval("input#MainContent_txtknowsLanguage", el => el.value)
    data['instagram'] = await page.$eval("input#MainContent_txtinstagram", el => el.value)
    data['twitter'] = await page.$eval("input#MainContent_txttwitter", el => el.value)
    data['facebook'] = await page.$eval("input#MainContent_txtfacebook", el => el.value)
    data['wikiUrl'] = await page.$eval("input#MainContent_txtsameas", el => el.value)
    data['contact'] = await page.$eval("input#MainContent_txtcontact", el => el.value)
    data['website'] = await page.$eval("input#MainContent_txtwebsite", el => el.value)
    data['email'] = await page.$eval("input#MainContent_txtemail", el => el.value)
    data['award'] = await page.$eval("input#MainContent_txtaward", el => el.value)
    data['netWorth'] = await page.$eval("input#MainContent_txtnetWorth", el => el.value)
    data['productionHouse'] = await page.$eval("input#MainContent_txtmemberOf", el => el.value)
    data['expiredDate'] = await page.$eval("input#MainContent_txtexpired", el => el.value)
    data['expiredPlace'] = await page.$eval("input#MainContent_txtdeathPlace", el => el.value)
    data['thumbnail'] = await page.$eval("input#MainContent_txtthumbnail", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['profile'] = await page.$eval("[name=\"ctl00$MainContent$FCKeditor1\"]", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    // console.log(data)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}