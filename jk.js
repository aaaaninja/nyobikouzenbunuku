const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(
    { headless: false
    , devtools: true
    }
  )
  const page = await browser.newPage();
  await page.goto('https://www.nnn.ed.nico/oauth_login?next_url=https://www.nnn.ed.nico/home&target_type=niconico', { waitUntil: 'domcontentloaded' })
  await page.type('input#input__mailtel', process.env.DEF_USERNAME)
  await page.type('input#input__password', process.env.DEF_PASSWORD)
  await page.click('input#login__submit')
  await page.waitFor('a.sc-bdVaJa.gtVQmG')
  await page.waitFor(3000)

  const name_and_urls = await page.$$eval('a.sc-bdVaJa.gtVQmG', course_list => {
    return course_list.map(course => [course.querySelector('div.sc-bdVaJa.gRaSAC').textContent, course.href])
  })
  console.log(name_and_urls)

  debugger;
  await browser.close();
})();
