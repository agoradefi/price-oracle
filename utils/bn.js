const BigNumber = require("bignumber.js");
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

const toBn = (num) => {
  if (num) return new BigNumber(num.toString());
  return new BigNumber(num);
};

const toBnFixed = (num) => {
  return toBn(num).toFixed();
};

exports.toBn = toBn;
exports.toBnFixed = toBnFixed;