const express = require('express');
const axios = require('axios');
const jsdom = require('jsdom');
const { randomBytes } = require('crypto');
const {JSDOM} = jsdom;
const router = express.Router();
const searchBaseUrl = `https://www.shopdisney.co.uk/search?q=`;


router.get('/', (req,res) => res.send("Product Search App loading"));

router.get('/:search/:quantity', async (req,res) => {
        try {

            const searchItem = req.params.search;
            const quantity = req.params.quantity;

            let keyword = searchItem.replace(/,/g, '%2C');
            const searchString = keyword.split(' ').join('+');
            const url = `${searchBaseUrl}${searchString}`;


            //Search for the product 
            const response = await axios.get(url);
            console.log(Object.keys(response));
            const {data} = response;

            //Convert the string html data to object 
            let doc = new JSDOM(data,{runScripts: "dangerously",resources: "usable"});
            const {window,window:{site_datalayer}} = doc;

            const{product} = site_datalayer;
            const{product_id, product_availability } = product



            //Check if the product derieved from search is not a list of items and is not out of stock 
            let cartDetails;
            if (product !== undefined) {
                if (product_availability === 'online - IN_STOCK') {

         
                    // Request body to add the product to cart 
                    const requestBody = {
                        format:"ajax",
                        quantity,
                        pid:product_id,
                        csrf_token:randomBytes(100).toString('base64')
                    }

                    const cartBaseUrl = `https://www.shopdisney.co.uk/on/demandware.store/Sites-disneyuk-Site/en_GB/Cart-AddProduct`;


                    try {
                        const response = await axios.post(cartBaseUrl,requestBody);
                        const {data} = response;
                        console.log(data)
                        cartDetails = data;
                        // const {data} = response;
                        // let doc = new JSDOM(data,{runScripts: "dangerously",resources: "usable"});
                        // const {window,window:{site_datalayer}} = doc;
                        // console.log(window);
                    } catch (error) {
                        console.log(error);
                    }

                }
            }
            res.status(200).json({
                site_datalayer,
                cartDetails
            });
        } catch (error) {
            console.log(error);
        }
    // }
    
})



module.exports = router;
