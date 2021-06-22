const axios = require('axios');

module.exports = async (request, response) => { 
    const products = await axios.get(`https://api.mercadolibre.com/sites/MLU/search?category=${request.params.categoryId}`);
    response.json({
        products: products.data
    });
}