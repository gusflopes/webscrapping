const puppeteer = require('puppeteer');

async function scrapElement(page, xpath, property) {
  const [element] = await page.$x(xpath);
  const rawData = await element.getProperty(property);
  return await rawData.jsonValue();
}

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const imgURL = await scrapElement('//*[@id="ebooksImgBlkFront"]', 'src');
  const title = await scrapElement(page, '//*[@id="ebooksProductTitle"]', 'textContent');
  const price = await scrapElement(page, '/html/body/div[2]/div/div[2]/div[7]/div[1]/div/div/div/table/tbody/tr[2]/td[2]/span', 'textContent');
  

  /*
  const [imgElement] = await page.$x('//*[@id="ebooksImgBlkFront"]');
  const src = await imgElement.getProperty('src');
  const imgURL = await src.jsonValue()

  const [titleEl] = await page.$x('//*[@id="ebooksProductTitle"]');
  const txt = await titleEl.getProperty('textContent');
  const title = await txt.jsonValue()

  const [priceEl] = await page.$x('/html/body/div[2]/div/div[2]/div[7]/div[1]/div/div/div/table/tbody/tr[2]/td[2]/span');
  const txt2 = await priceEl.getProperty('textContent');
  const price = await txt2.jsonValue()
  */


  console.log({imgURL, title, price});

  browser.close();

}

scrapeProduct('https://www.amazon.com.br/JavaScript-Guia-Definitivo-David-Flanagan-ebook/dp/B016N7G8EK/ref=sr_1_2?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=javascript&qid=1578681232&s=digital-text&sr=1-2')
