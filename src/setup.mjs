import pkg from "@terra-money/terra.js";
const { LCDClient, MnemonicKey } = pkg;
import dotenv from "dotenv";

dotenv.config();

// const terra = new LCDClient({
//   URL: "https://bombay-lcd.terra.dev",
//   chainID: "bombay-12",
// });

const terra = new LCDClient({
  URL: "https://lcd.terra.dev",
  chainID: "columbus-5",
});

const mk = new MnemonicKey({ mnemonic: process.env.MNEMONIC });
const key = process.env.MNEMONIC;

const wallet = terra.wallet(mk);
console.log(`\x1b[34m${wallet.key.accAddress}\x1b[0m`);

export default { terra, wallet };
