const mercadopago = require("mercadopago");

module.exports = async (request, response) => {
  const mercadopago = require("mercadopago");
  mercadopago.configure({
    access_token: process.env.AccessToken,
    integrator_id: process.env.IntegratorId
  });

  const preference4MercadoLibre = {
    payer: {
      name: "Lalo",
      surname: "Landa",
      email: "test_user_63274575@testuser.com",
      phone: {
        area_code: "11",
        number: 22223333
      },
      address: {
        zip_code: "1111",
        street_name: "Falsa",
        street_number: 123
      }
    },
    items: request.body.items,
    back_urls: {
      success: `${process.env.URL_FRONT}/success`,
      pending: `${process.env.URL_FRONT}/pending`,
      failure: `${process.env.URL_FRONT}/failure`,
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
    notification_url: `${process.env.URL_BACK}/notificaciones`
  }

  const preference = {
    //payer: request.body.payer,
    items: request.body.items,
    back_urls: {
      success: `${process.env.URL_FRONT}/success`,
      pending: `${process.env.URL_FRONT}/pending`,
      failure: `${process.env.URL_FRONT}/failure`,
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
    notification_url: `${process.env.URL_BACK}/notificaciones`
  };

  mercadopago.preferences
    .create(preference4MercadoLibre)
    .then(function (res) {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      global.id = res.body.id;
      response.json(res.body);
    })
    .catch(function (error) {
      console.log(error);
    });
};
