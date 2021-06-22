const axios = require('axios');


// Ropa MLU1430


module.exports = async (request, response) => { 
    const products = await axios.get(`https://api.mercadolibre.com/categories/${request.params.id}`);
    response.json({
        category: products.data
    });
}