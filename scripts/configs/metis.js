
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
    },
    // Netswap USDT-USDC LP
    {
      underlying: "0x1caD5f8f5D4C0AD49646B2565CC0cA725E4280EA",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap WETH-USDT LP
    {
      underlying: "0x4Db4CE7f5b43A6B455D3c3057b63A083b09b8376",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap WETH-USDC LP
    {
      underlying: "0xF5988809ac97C65121e2c34f5D49558e3D12C253",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap WETH-Metis LP
    {
      underlying: "0x59051B5F5172b69E66869048Dc69D35dB0B3610d",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap NETT-Metis LP
    {
      underlying: "0x60312d4EbBF3617d3D33841906b5868A86931Cbd",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap USDT-Metis LP
    {
      underlying: "0x3D60aFEcf67e6ba950b499137A72478B2CA7c5A1",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap Metis-USDC LP
    {
      underlying: "0x5Ae3ee7fBB3Cb28C17e7ADc3a6Ae605ae2465091",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap WETH-NETT LP
    {
      underlying: "0xC8aE82A0ab6AdA2062B812827E1556c0fa448dd0",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap NETT-USDT LP
    {
      underlying: "0x7D02ab940d7dD2B771e59633bBC1ed6EC2b99Af1",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap NETT-USDC LP
    {
      underlying: "0x0724d37522585E87d27C802728E824862Dc72861",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Puff NETT-USDC
    {
      underlying: "0xaF8993DFdbe39A9c606D75aBA1e542D7E3090956",
      priceSource: "4",
      repointedAsset: "0x0724d37522585E87d27C802728E824862Dc72861",
    },
    // Puff Metis-USDC
    {
      underlying: "0x6c7eb3942BaF403090B89bC5032698Db5f45d273",
      priceSource: "4",
      repointedAsset: "0x5Ae3ee7fBB3Cb28C17e7ADc3a6Ae605ae2465091",
    },
    // Puff WETH-NETT
    {
      underlying: "0xeF0600F55b48983295445F230E00A8C014cF1a2E",
      priceSource: "4",
      repointedAsset: "0xC8aE82A0ab6AdA2062B812827E1556c0fa448dd0",
    },
    // Puff NETT-Metis
    {
      underlying: "0x6394B9246001460d8D78d435A6F30BA69BE41894",
      priceSource: "4",
      repointedAsset: "0x60312d4EbBF3617d3D33841906b5868A86931Cbd",
    },
    // Puff NETT-USDT
    {
      underlying: "0xeA0527234A7ACDfcB63b0B974CD416B18dc0cC33",
      priceSource: "4",
      repointedAsset: "0x7D02ab940d7dD2B771e59633bBC1ed6EC2b99Af1",
    },
    // Puff USDT-USDC
    {
      underlying: "0xE0F94fEE7a5318E10Fd0FCf23A4735208f1a7E41",
      priceSource: "4",
      repointedAsset: "0x1caD5f8f5D4C0AD49646B2565CC0cA725E4280EA",
    },
    // Puff WETH-USDT
    {
      underlying: "0x118F9bBC098647b1b73e6B1981A07f943151245D",
      priceSource: "4",
      repointedAsset: "0x4Db4CE7f5b43A6B455D3c3057b63A083b09b8376",
    },
    // Puff WETH-USDC
    {
      underlying: "0xf7283835b9F4dcB24dFB0d8ceC8651619Ccb376a",
      priceSource: "4",
      repointedAsset: "0xF5988809ac97C65121e2c34f5D49558e3D12C253",
    },
    // Puff WETH-Metis
    {
      underlying: "0xdfC367a1f270E7c2AE6129B1De3D146B69cbcc15",
      priceSource: "4",
      repointedAsset: "0x59051B5F5172b69E66869048Dc69D35dB0B3610d",
    },
    // Puff USDT-Metis
    {
      underlying: "0x41385Fe12F33cd19DdA784e073ae459050717EEB",
      priceSource: "4",
      repointedAsset: "0x3D60aFEcf67e6ba950b499137A72478B2CA7c5A1",
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
    ],
  }
};