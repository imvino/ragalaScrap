var SqlString = require('sqlstring');
var format  = require('../../formatDT');
//movies
module.exports.moviesFunction = async (page) => {

    let column = []
    let data = []
    data['movieName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_movie').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    // data['movieName'] = await page.innerText(".chosen-single span");
    data['title'] = await page.$eval("input#MainContent_txtfunctionname", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['imageName'] = await page.$eval("input#MainContent_txtimgname", el => el.value)
    data['fileLocation'] = await page.$eval("input#MainContent_txtlocation", el => el.value)
    data['description'] = await page.$eval("input#MainContent_txtdesc", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name='ctl00$MainContent$rbactive']:checked", el => el.value)
    // console.log(data)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.moviesFunctionUpdate = async (page) => {
    let column = []
    let data = []
    data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
    data['path'] = await page.innerText("#MainContent_txtserverpath")
    data['imageAltText'] = await page.$eval("input#MainContent_txtimagealt", el => el.value)
    data['imageTitleText'] = await page.$eval("input#MainContent_txtimagetitle", el => el.value)
    data['homepageTitleText'] = await page.$eval("input#MainContent_txthomepage", el => el.value)
    data['homepageTitleDropdown'] = await page.$eval("select#MainContent_drpgaltype", el => el.value)
    data['updatedDateTime'] = await page.$eval("input#MainContent_txtadddate", el => el.value)
    data['updatedDateTime'] = format.formatDateTime(data['updatedDateTime']);
    data['noOfPhotosPages'] = await page.$eval("select#MainContent_drpmaxphotos", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.moviePhotos = async (page) => {
    let column = []
    let data = []
    data['movieName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_movie').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
    data['fileLocation'] = await page.$eval("input#MainContent_txtloc", el => el.value)
    data['imageName'] = await page.$eval("input#MainContent_txtimagename", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['description'] = await page.$eval("#MainContent_txtdesc", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.moviePhotosUpdate = async (page) => {
    let column = []
    let data = []
    // data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
    data['path'] = await page.innerText("#MainContent_txtserverpath")
    data['imageAltText'] = await page.$eval("input#MainContent_txtimagealt", el => el.value)
    data['imageTitleText'] = await page.$eval("input#MainContent_txtimagetitle", el => el.value)
    data['homepageTitleText'] = await page.$eval("input#MainContent_txthomepage", el => el.value)
    data['homepageTitleDropdown'] = await page.$eval("select#MainContent_drpgaltype", el => el.value)
    data['updatedDateTime'] = await page.$eval("input#MainContent_txtadddate", el => el.value)
    data['updatedDateTime'] = format.formatDateTime(data['updatedDateTime']);
    data['noOfPhotosPages'] = await page.$eval("select#MainContent_drpmaxphotos", el => el.value)
    // data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.moviePoster = async (page) => {
    let column = []
    let data = []
    data['movieName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_movie').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
    data['fileLocation'] = await page.$eval("input#MainContent_txtloc", el => el.value)
    data['imageName'] = await page.$eval("input#MainContent_txtimagename", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['gallery'] = await page.$eval("textarea#MainContent_txtxml", el => el.value)
    data['homepageTitle'] = await page.$eval("input#MainContent_txthomepage", el => el.value)
    data['addOnHomepage'] = await page.$eval("[name=\"ctl00$MainContent$addhomepage\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.movieReview = async (page) => {
    let column = []
    let data = []
    data['movieName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_movie').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
    data['reviewImage'] = await page.$eval("input#MainContent_txtimage", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['reviewSynopsis'] = await page.$eval("textarea#MainContent_txtsynopsis", el => el.value)
    data['reviewRating'] = await page.$eval("input#MainContent_txtrating", el => el.value)
    data['content'] = await page.$eval("input#MainContent_txtcontent", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
    data['type'] = await page.$eval("[name=\"ctl00$MainContent$rbtype\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.namesTitle = async (page) => {
    let column = []
    let data = []
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
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['banner'] = await page.$eval("input#MainContent_txtbanner", el => el.value)
    data['cast'] = await page.$eval("textarea#MainContent_txtcast", el => el.value)
    data['crew'] = await page.$eval("textarea#MainContent_txtcrew", el => el.value)
    data['music'] = await page.$eval("input#MainContent_txtmusic", el => el.value)
    data['producer'] = await page.$eval("input#MainContent_txtproducer", el => el.value)
    data['director'] = await page.$eval("input#MainContent_txtdirector", el => el.value)
    data['genre'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.querySelector('[name="ctl00$MainContent$lsttype"]').options) {
            if (option.selected && option.value != '') {
                selected.push(option.value);
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['currentProgress'] = await page.$eval("textarea#MainContent_txtprogress", el => el.value)
    data['imageLink'] = await page.$eval("input#MainContent_txtimage", el => el.value)
    data['releaseDate'] = await page.$eval("input#MainContent_txtreleasedate", el => el.value)
    data['releaseDate'] = format.formatDate(data['releaseDate']);
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    if (data['seoTitle'] === '') {
        data['seoTitle'] = await page.innerText("#MainContent_hlpseotitle");
    }
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    if (data['metaDescription'] === '') {
        data['metaDescription'] = await page.innerText("#MainContent_hlpmetadesc");
    }
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    if (data['metaKeywords'] === '') {
        data['metaKeywords'] = await page.innerText("#MainContent_hlpmetakey");
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
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
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
    let column = []
    let data = []
    data['name'] = await page.$eval("input#MainContent_txtname", el => el.value)
    data['category'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_lstcategory').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['alternateNames'] = await page.$eval("input#MainContent_txtadditionalName", el => el.value)
    data['birthday'] = await page.$eval("input#MainContent_txtbday", el => el.value)
    console.log('birth',data['birthday'])
    data['birthday'] = data['birthday']?format.formatDate(data['birthday']):'';
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
    data['expiredDate'] = data['expiredDate']?format.formatDate(data['expiredDate']):'';
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
module.exports.starPhotos = async (page) => {
    let column = []
    let data = []
    data['filmPersonalName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_fp').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['providerName'] = await page.$eval("select.form-control", el => el.value)
    data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['imageName'] = await page.$eval("input#MainContent_txtimagename", el => el.value)
    data['fileLocation'] = await page.$eval("input#MainContent_txtloc", el => el.value)
    data['description'] = await page.$eval("input#MainContent_txtdesc", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    // data['languagesWorked'] = await page.$eval("[name=\"ctl00$MainContent$chklanguages$0\"]:checked", el => el.value)
    data['languagesWorked'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.querySelectorAll('#MainContent_chklanguages input')) {
            console.log(option.checked)
            console.log(option.value)
            if (option.checked && option.value != '') {
                selected.push((option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['exclusiveGallery'] = await page.$eval("[name=\"ctl00$MainContent$rbexclusive\"]:checked", el => el.value)
    data['spicyGallery'] = await page.$eval("[name=\"ctl00$MainContent$rbspicy\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    // console.log(data)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.starPhotosUpdate = async (page) => {
    let column = []
    let data = []
    // data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
    data['path'] = await page.$eval('[name="ctl00$MainContent$txtimgloc"]', el => el.value)
    data['imageAltText'] = await page.$eval("input#MainContent_txtimagealt", el => el.value)
    data['imageTitleText'] = await page.$eval("input#MainContent_txtimagetitle", el => el.value)
    data['homepageTitleText'] = await page.$eval("input#MainContent_txthomepage", el => el.value)
    data['homepageTitleDropdown'] = await page.$eval("select#MainContent_drpgaltype", el => el.value)
    data['addedDateTime'] = await page.$eval("input#MainContent_txtadddate", el => el.value)
    data['addedDateTime'] = format.formatDateTime(data['addedDateTime']);
    data['noOfPhotosPages'] = await page.$eval("select#MainContent_drpmaxphotos", el => el.value)
    // data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['galleryType'] = await page.$eval("[name=\"ctl00$MainContent$rbgallerytype\"]:checked", el => el.value)
    // console.log(data)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}

//localevents
module.exports.localCategory = async (page) => {
    let column = []
    let data = []
    data['locationCategory'] = await page.$eval("input#MainContent_txtlocationname", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.localEvents = async (page) => {
    let column = []
    let data = []
    data['eventLocationName'] = await page.$eval('[name="ctl00$MainContent$drp_movie"]', el => el.value)
    data['eventName'] = await page.$eval("input#MainContent_txteventname", el => el.value)
    data['filmPersonals'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_lstfp').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['imageName'] = await page.$eval("input#MainContent_txtimgname", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    //data['imgName'] = await page.$eval("input#MainContent_txtimgname", el => el.value)
    data['fileLocation'] = await page.$eval("input#MainContent_txtlocation", el => el.value)
    data['description'] = await page.$eval("#MainContent_txtdesc", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
    data['photographer'] = await page.$eval("input#MainContent_txtphotographer", el => el.value)
    data['notes'] = await page.$eval("textarea#MainContent_txtnotes", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.localEventsUpdate = async (page) => {
    let column = []
    let data = []
    // data['title'] = await page.$eval("input#MainContent_txteventname", el => el.value)
    data['path'] = await page.innerText("#MainContent_txtserverpath")
    data['imageAltText'] = await page.$eval("input#MainContent_txtimagealt", el => el.value)
    data['imageTitleText'] = await page.$eval("input#MainContent_txtimagetitle", el => el.value)
    data['homepageTitleText'] = await page.$eval("input#MainContent_txthomepage", el => el.value)
    data['homepageTitleDropdown'] = await page.$eval("select#MainContent_drpgaltype", el => el.value)
    data['addedDate'] = await page.$eval("input#MainContent_txtadddate", el => el.value)
    data['addedDate'] = format.formatDateTime(data['addedDate']);
    data['noOfPhotosPages'] = await page.$eval("select#MainContent_drpmaxphotos", el => el.value)
    // data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.localLocation = async (page) => {
    let column = []
    let data = []
    data['locationCategory'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_localcat').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['locationName'] = await page.$eval("input#MainContent_txtlocationname", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['description'] = await page.$eval("input#MainContent_txtdesc", el => el.value)
    // data['city'] = await page.$eval("select.form-control", el => el.value)
    data['city'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_city').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.localSchedule = async (page) => {
    let column = []
    let data = []
    data['evenLocationName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_movie').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['eventContent'] = await page.$eval("textarea#MainContent_txteventcnt", el => el.value)
    data['eventStartDate'] = await page.$eval("input#MainContent_txtstartdate", el => el.value)
    data['eventStartDate'] = format.formatDate(data['eventStartDate']);
    data['eventEndDate'] = await page.$eval("input#MainContent_txtenddate", el => el.value)
    data['eventEndDate'] = format.formatDate(data['eventEndDate']);
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}

//articles
module.exports.articlesNews = async (page) => {
    let column = []
    let data = []
    data['movieName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_movie').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['heading'] = await page.$eval("input#MainContent_txtheading", el => el.value)
    data['filmPersonals'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_lstfp').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['newsImage'] = await page.$eval("input#MainContent_txtnewsimg", el => el.value)
    data['newsItem'] = await page.$eval("input#MainContent_txtnews", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['ottNews'] = await page.$eval("[name=\"ctl00$MainContent$rbott\"]:checked", el => el.value)
    data['highlightNews'] = await page.$eval("[name=\"ctl00$MainContent$rbnewsfocus\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.pressRelease = async (page) => {
    let column = []
    let data = []
    data['movieName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_movie').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['localLocation'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_local').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['heading'] = await page.$eval("input#MainContent_txtheading", el => el.value)
    data['pressReleaseImage'] = await page.$eval("input#MainContent_txtpressimg", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['content'] = await page.$eval("input#MainContent_txtpresscnt", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['mediaAgency'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_agency').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    data['paid'] = await page.$eval("[name=\"ctl00$MainContent$rbpaid\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.editorials = async (page) => {
    let column = []
    let data = []
    data['movieName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_movie').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['image'] = await page.$eval("input#MainContent_txtimg", el => el.value)
    data['content'] = await page.$eval("input#MainContent_txtcontent", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
module.exports.interview = async (page) => {
    let column = []
    let data = []
    data['filmPersonal'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_fp').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);

    });
    // data['movieName'] = await page.$eval('[name="ctl00$MainContent$drp_movie"]', el => el.value)
    data['movieName'] = await page.evaluate(() => {
        let selected = [];
        for (let option of document.getElementById('MainContent_drp_movie').options) {
            if (option.selected && option.value != '') {
                selected.push(parseInt(option.value));
            }
        }
        let str= JSON.stringify(selected);
        return str.substring(1, str.length-1);
    });
    data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
    data['interviewImage'] = await page.$eval("input#MainContent_txtimage", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['interviewIntro'] = await page.$eval("textarea#MainContent_txtintroduction", el => el.value)
    data['interview'] = await page.$eval("input#MainContent_txtdesc", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideourl", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['isPage3Interview'] = await page.$eval("[name=\"ctl00$MainContent$rbpage3\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    let colList = Object.keys(data)
    colList.map((v, i) => {
        column[i] = "`" + v + "`=NULLIF(" + SqlString.escape(data[v]) + ", '')";
        // column[i] = "`" + v + "`=null";
    })
    return column
}
