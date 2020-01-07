const express = require("express");
const vhost = require("vhost");
const proxy = require("http-proxy-middleware");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const DOMAIN = process.env.DOMAIN;
const { routes } = require("./config.json");

const app = express();

app.use(cors());

routes.forEach(({ address, subDomain }) => {
  app.use(
    vhost(`${subDomain}.mockend.lvh.me`, (req, res, next) => {
      // TODO: create a logging system for listening to all incoming requests.
      console.log(subDomain + " has been hit");
      next();
    })
  );

  app.use(vhost(`${subDomain}.mockend.lvh.me`, proxy({ target: address })));
});

app.listen(80, () => {
  console.log(`Server ready at http://${DOMAIN}:8080`);
});
