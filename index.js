const axios = require('axios')
const cheerio = require('cheerio')
//const request = require('request')
const pretty = require('pretty')
const DoSomething = async () => {
  try {
    const url = 'https://www.mixamo.com/#/?page=1&type=Motion%2CMotionPack'

    await axios
      .get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        },
      })
      .then((result) => {
        // request(url, (error, response, html) => {
        //   console.log(html)
        console.log(result.data)
        const load_all_data_from_url = cheerio.load(result.data)

        const productList_product_productImage = load_all_data_from_url(
          '.product-list .product-character .product-image',
        )
        const productList_product_productOverlay = load_all_data_from_url(
          '.product-list .product-character .product-overlay',
        )
        const productList_product_productDescription = load_all_data_from_url(
          '.product-list .product-character .product-description',
        )
        const products = []
        productList_product_productImage.each((imageError, productImage) => {
          productList_product_productOverlay.each(
            (overlayError, productOverlay) => {
              productList_product_productDescription.each(
                (descriptionErorr, productDescription) => {
                  const product = {
                    productImage: '',
                    productOverlay: '',
                    productDescription: '',
                  }
                  product.productImage = load_all_data_from_url(
                    productImage,
                  ).text()
                  product.productOverlay = load_all_data_from_url(
                    productOverlay,
                  ).text()
                  product.productDescription = load_all_data_from_url(
                    productDescription,
                  ).text()
                  console.log('Printing product', product)
                  products.push(product)
                },
              )
            },
          )
        })
        console.dir(products)
      })
    //})
    //   .catch((error) => {
    //     console.log(error)
    //   })
  } catch (error) {
    console.log(error)
  }
}
DoSomething()

//console.dir(products)

// const markup = `
// <ul class="fruits">
//   <li class="fruits__mango"> Mango </li>
//   <ul class= "something something-bigger">
//     <li class="inside"> Hello world</li>
//     <li class = "outside">Ha ha ha</li>
//   </ul>
//   <ul class= "something something-bigger">
//     <li class="inside"> Second world</li>
//     <li class = "outside"> Second Ha ha ha</li>
//   </ul>
//   <li class="fruits__apple"> Apple </li>
// </ul>
// `
// const $ = cheerio.load(markup)
// const loadInside = $('.fruits .something .inside')
// const loadOutside = $('.fruits .something .outside')
// const fullDetails = []
// loadInside.each((error, result) => {
//   loadOutside.each((innerError, innerResult) => {
//     const details = { inside: '', outside: '' }
//     details.inside = $(result).text()
//     details.outside = $(innerResult).text()
//     fullDetails.push(details)
//   })
// })
// console.dir(fullDetails)
// // console.log(pretty(loadData.text()))
