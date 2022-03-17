
const { UniLpCalcParams } = require("../../utils/constants");

/**
 * Defining a config
 * - underlying - address
 * - priceSource
 * - LP pair address (only for first base config)
 * - symbol (optional)
 * 
 * NOTE - The first config is treated as the base config. For metis it should be Metis/stableCoin
 * 
 * Defining price source
 * 0 - FIXED_USD          -> implies the fixedPrice is a constant multiple of the USD price (which is 1)
 * 1 - UNISWAP            -> implies the price is fetched from uniswap
 * 2 - POSTER             -> implies the price is posted externally
 * 3 - EXTERNAL_ORACLE    -> implies the price is read externally
 * 4 - REPOINT            -> implies the price is repointed to other asset's price
 * 5 - UNI_V2_LP          -> implies the price is computed as UniV2 LP pair
 * 6 - CURVE_LP           -> implies the price is computed as Curve Finance LP
 * 
 */

module.exports = {
  twapWindow: "3600",   // in seconds
  baseAsset: "Metis",
  UniswapV2Router: "0x1E876cCe41B7b844FDe09E38Fa1cf00f213bFf56",
  basePriceDecimals: "6",
  tokenConfigs: [
    // base config - Metis/USDC
    {
      underlying: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
      priceSource: "1",
      uniswapMarket: "0xDd7dF3522a49e6e1127bf1A1d3bAEa3bc100583B",
    },
    // USDO
    {
      underlying: "0x5801D0e1C7D977D78E4890880B8E579eb4943276",
      priceSource: "0",
      fixedPrice: "1",
    },
    // USDC
    {
      underlying: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
      priceSource: "0",
      fixedPrice: "1",
    },
    // USDT
    {
      underlying: "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",
      priceSource: "1",
      uniswapMarket: "0x1caD5f8f5D4C0AD49646B2565CC0cA725E4280EA",
    },
    // ETH
    {
      underlying: "0x420000000000000000000000000000000000000a",
      priceSource: "1",
      uniswapMarket: "0xF5988809ac97C65121e2c34f5D49558e3D12C253",
    },
    // NETT
    {
      underlying: "0x90fE084F877C65e1b577c7b2eA64B8D8dd1AB278",
      priceSource: "1",
    },
    // AGORA
    {
      underlying: "0x0ed0ca6872073e02cd3ae005baf04ba43be947fa",
      priceSource: "1",
      uniswapMarket: "0xc6Eac7FF407EdB9D27463dc1f14FDdcfdF1f887d",
    },
    // TETHYS
    {
      underlying: "0x69fdb77064ec5c84FA2F21072973eB28441F43F3",
      priceSource: "1",
      uniswapMarket: "0xc9b290FF37fA53272e9D71A0B13a444010aF4497",
    },
    // WBTC
    {
      underlying: "0xa5B55ab1dAF0F8e1EFc0eB1931a957fd89B918f4",
      priceSource: "1",
    },
    // DAI
    {
      underlying: "0x4651B38e7ec14BB3db731369BFE5B08F2466Bd0A",
      priceSource: "0",
      fixedPrice: "1",
    },
    // BUSD
    {
      underlying: "0x12d84f1cfe870ca9c9df9785f8954341d7fbb249",
      priceSource: "1",
      uniswapMarket: "0x8014c801F6cF32445D503f7BaC30976B3161eE52",
    },
    // Starstream
    {
      underlying: "0xb26f58f0b301a077cfa779c0b0f8281c7f936ac0",
      priceSource: "1",
      uniswapMarket: "0xc294087E4A8D046Af842364880aB819c0B77C2BC",
    },
    // AgoraSwap AGORA-Metis LP
    {
      underlying: "0xc6Eac7FF407EdB9D27463dc1f14FDdcfdF1f887d",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
  ],

  cTokenConfigs: {
    cTokens: [
      "0x7759eeb5365E94428BF46A26567c49c25ee5b319",   // kUSDO
      "0xcFd482DcE13cA1d27834D381AF1b570E9E6C6810",   // kMetis
      "0x6D11F074131E3FC61C983cCe538F5D0ca3553c0F",   // kUSDC
      "0x4b45B1905Cd1dC18eDad134d2E43f5043e1E157c",   // kUSDT
      "0x2E9347dda00B3ec1b188963b590ca1eCBD73145A",   // kWETH
      "0x5f87B34BFa147Ac23F25786Bba6C1b1b06B45dC8",   // kNETT
      "0x7614124928A2103901F18ED49667D824fcBf6ea1",   // kAGORA
      "0x67A1E7CE249262d35A4de4A22e850f59AeEF23BE",   // kTETHYS
      "0x94E56c0C59433599ba857a9a7243b2826745CF91",   // kWBTC
      "0x6172C42846EDC0d0e9D36a3e7D0eb7E2da4d4171",   // kDAI
      "0x985264778039B51eA8438C4fb7a5519372564e12",   // kSTARS
      "0x94D850df28BF46768A4eeABda75D027636bbEbAf",   // xm.USDC
      "0xaFdB2C16394b55d15a5aC36B5113D30eD35c2788",   // xALP (AGORA-METIS LP)
      "0xaCde0D6721fe16193Ba3cC25E547410f057Af175",   // xAGORA
      "0xc3034143816398d37Ec9447c9CA17c407e96Dc12",   // xMetis
    ],
  }
};