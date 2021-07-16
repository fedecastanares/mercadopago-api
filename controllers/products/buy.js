const mercadopago = require("mercadopago");

module.exports = async (request, response) => {
  mercadopago.configure({
    access_token: process.env.AccessToken,
    integrator_id: process.env.IntegratorId,
  });

  const preference = {
    payer: {
      name: "Lalo",
      surname: "Landa",
      email: "test_user_63274575@testuser.com",
      phone: {
        area_code: "11",
        number: 22223333,
      },
      address: {
        zip_code: "1111",
        street_name: "Falsa",
        street_number: 123,
      },
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
      excluded_payment_types: [
        {
          id: "atm",
        },
      ],
    },

    auto_return: "approved",
    external_reference: "federico.castanares@gmail.com",
    notification_url: `${process.env.URL_BACK}/notificaciones`,
  };


  /*
  const obj = {
    payer: {
      name: "Lalo",
      surname: "Landa",
      email: "test_user_63274575@testuser.com",
      phone: { area_code: "11", number: 22223333 },
      address: { zip_code: "1111", street_name: "Falsa", street_number: 123 },
    },
    items: [
      {
        title: "Samsung Galaxy S9",
        description: "Samsung Galaxy S9",
        picture_url:
          "https://d391ci4kxgasl8.cloudfront.net/fit-in/524x480/filters:fill(FFFFFF):quality(90):format(webp)/_img_productos/samsung-galaxy-s20fe-preventa-fit2-foto-lavanda2.jpg",
        unit_price: 45000,
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:3000/success",
      pending: "http://localhost:3000/pending",
      failure: "http://localhost:3000/failure",
    },
    payment_methods: {
      installments: 6,
      excluded_payment_methods: [
        {
          id: "amex",
        },
      ],
      excluded_payment_types: [
        {
          id: "atm",
        },
      ],
    },
    auto_return: "approved",
    external_reference: "federico.castanares@gmail.com",
    notification_url: "http://localhost:4000/notificaciones",
  };
  */

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
