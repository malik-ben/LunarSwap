import pkg from "@terra-money/terra.js";
const { LCDClient, MnemonicKey } = pkg;
const terra = new LCDClient({
  URL: "https://lcd.terra.dev",
  chainId: "columbus-3",
});

const mk = new MnemonicKey();
const wallet = terra.wallet(mk);
console.log(wallet.key.accAddress)
console.log(wallet.key.mnemonic)

// const  neww = async () => {
//   console.log(await wallet.accountNumber());
//   console.log(await wallet.sequence());
// };
// neww()