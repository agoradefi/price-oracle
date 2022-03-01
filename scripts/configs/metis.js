
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
      uniswapMarket: "0x5Ae3ee7fBB3Cb28C17e7ADc3a6Ae605ae2465091",
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
    },
    // ETH
    {
      underlying: "0x420000000000000000000000000000000000000a",
      priceSource: "1",
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
      uniswapMarket: "0x4d0e3Dfd6640F8f50b9d72058915a7903c420CD0",
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
      uniswapMarket: "0xA0081C6D591c53Ae651bD71B8d90C83C1F1106C2",
    },
    // AgoraSwap WBTC-m.USDT LP
    {
      underlying: "0x148a0a6d6dc539ee24bea0c1ef45c4c60414711d",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
    // AgoraSwap WETH-Metis LP
    {
      underlying: "0x3d7f3003d7263678703d7f161e32f4d8560d4339",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
    // AgoraSwap AGORA-USDC LP
    {
      underlying: "0x3e49912983374d1ce0c329ca71e92c8b904b783a",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
    // AgoraSwap WETH-m.USDC LP
    {
      underlying: "0x4a726ce08321288070605d18be429e8b13e70e19",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
    // AgoraSwap AGORA-Metis LP
    {
      underlying: "0x4d0e3dfd6640f8f50b9d72058915a7903c420cd0",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
    // AgoraSwap WBTC-Metis LP
    {
      underlying: "0x53daf5f54f09f6471a5ff594f2094a2e73804a23",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
    // AgoraSwap WETH-USDT LP
    {
      underlying: "0x7c4bcb041d81f4db44bf3b2a2ce242c59aa3ab8a",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
    // AgoraSwap USDT-Metis LP
    {
      underlying: "0xd227a53cc048286e96b47f30a013f559fc8661c3",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
    // AgoraSwap Metis-USDC LP
    {
      underlying: "0xd28b586d626eba54914b7c7ccdf582711ba42588",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
  ],

  cTokenConfigs: {
    cTokens: [
      "0x7759eeb5365E94428BF46A26567c49c25ee5b319",   // kUSDO
      "0xcFd482DcE13cA1d27834D381AF1b570E9E6C6810",   // kMetis
      "0x6D11F074131E3FC61C983cCe538F5D0ca3553c0F",   // kUSDC
      "0x4b45B1905Cd1dC18eDad134d2E43f5043e1E157c",   // kUSDC
      "0x2E9347dda00B3ec1b188963b590ca1eCBD73145A",   // kWETH
      "0x5f87B34BFa147Ac23F25786Bba6C1b1b06B45dC8",   // kNETT
      "0x7614124928A2103901F18ED49667D824fcBf6ea1",   // kAGORA
      "0x67A1E7CE249262d35A4de4A22e850f59AeEF23BE",   // kTETHYS
      "0x94E56c0C59433599ba857a9a7243b2826745CF91",   // kWBTC
    ],
  }
};