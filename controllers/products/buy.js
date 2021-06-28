const mercadopago = require("mercadopago");

module.exports = async (request, response) => {
  const preference = {
    items: request.body.items,
    payer: request.body.payer,
    back_urls: {
      success: `http://localhost:3000/success`,
      pending: `http://localhost:3000/pending`,
      failure: `http://localhost:3000/failure`,
    },
    payment_methods: {
      installments: 6,
      excluded_payment_methods: [
        {
          id: "amex",
        },
      ],
    },
    auto_return: "approved",
    external_reference: "federico.castanares@gmail.com",
  };

  // notification_url: 'http://localhost:4000/notificaciones'

  mercadopago.preferences
    .create(preference)
    .then(function (res) {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      global.id = res.body.id;
      response.json(res.body);
    })
    .catch(function (error) {
      console.log(error);
    });
};
