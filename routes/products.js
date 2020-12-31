const express = require('express');
const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const searchBaseUrl = `https://www.shopdisney.co.uk/search?q=`;

const router = express.Router();


router.get('/', (req,res) => res.send("Product Search App loading"));

router.get('/:search/:quantity', async (req,res) => {
        try {
            console.log(req.params);
            const searchItem = req.params.search;
            let keyword = searchItem.replace(/,/g, '%2C');
            const searchString = keyword.split(' ').join('+');
            const url = `${searchBaseUrl}${searchString}`;
            console.log(url);
            const response = await axios.get(url);
            console.log(Object.keys(response));
            const {data} = response;
            let doc = new JSDOM(data,{runScripts: "dangerously",resources: "usable"});
            const {window,window:{site_datalayer}} = doc;
            // console.log(site_datalayer);
            const{product} = site_datalayer;
            console.log(product);
            const state = false
            if (product !== undefined && product_availability === 'online - IN_STOCK') {
                const quantity = req.params.quantity;
                const cartBaseUrl = `https://www.shopdisney.co.uk/on/demandware.store/Sites-disneyuk-Site/en_GB/Product-AddedToCart?pid=${product_id}&quantity=${quantity}&personalised=${state}`;
                const response = await axios.get(cartBaseUrl);
                console.log("We are here");
                console.log(response);
            }
            // const {listing_products:{productName,productID}} = site_datalayer;
            // if (productName.length > 1) {
                
            // }
            res.status(200).json({
                site_datalayer
            });
        } catch (error) {
            console.log(error);
        }
    // }
    
})



module.exports = router;
// searchProduct(baseUrl, "star wars mandalorian");