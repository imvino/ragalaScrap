module.exports.auth = async function (context) {
    const page = await context.newPage();
    await page.goto('https://www.ragalahari.com/newadmin/Login.aspx');
    await page.fill('input#Login1_UserName', 'viswalatha'); //suresh
    await page.fill('input#Login1_Password', 'ragalahari9('); //Bujjinana99
    await page.click('input#Login1_LoginButton')

}
