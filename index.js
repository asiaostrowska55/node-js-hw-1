// setTimeout(() => {
//   console.log("timeout 3s");
// }, 2000);

// setImmediate(function () {
//   console.log("setImmediate callback");
// });

// process.nextTick(function () {
//   console.log("NextTick callback");
// });

// // NextTick callback
// // setImmediate callback

//commonjs

// const logger = require("./contacts");
// logger.info("uwaga, wiadomosc mess commonjs");

//ecta

import { info } from "./contacts.js";
info("uwaga, wiadomosc mess ecta");
