import pkg from "@terra-money/terra.js";
const { LCDClient, MnemonicKey } = pkg;
import dotenv from "dotenv";

dotenv.config();

var MNEMONIC;
var LUNA_BLUNA_PAIR;
var BLUNA;
var terra;

if (process.env.NODE_ENV === "development") {
  terra = new LCDClient({
    URL: "https://bombay-lcd.terra.dev",
    chainID: "bombay-12",
  });
  MNEMONIC = process.env.MNEMONIC_TEST;
  LUNA_BLUNA_PAIR = process.env.LUNA_BLUNA_PAIR_TEST;
  BLUNA = process.env.BLUNA_TEST;
}

if (process.env.NODE_ENV === "production") {
  terra = new LCDClient({
    URL: "https://lcd.terra.dev",
    chainID: "columbus-5",
  });
  MNEMONIC = process.env.MNEMONIC_MAIN;
  LUNA_BLUNA_PAIR = process.env.LUNA_BLUNA_PAIR_MAIN;
  BLUNA = process.env.BLUNA_MAIN;
}

const mk = new MnemonicKey({ mnemonic: MNEMONIC });

const wallet = terra.wallet(mk);
console.log(`\x1b[34m${wallet.key.accAddress}\x1b[0m`);

export default { terra, wallet, MNEMONIC, LUNA_BLUNA_PAIR, BLUNA };
