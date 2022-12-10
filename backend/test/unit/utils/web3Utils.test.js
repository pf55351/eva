const { isValidEthAddress } = require("../../../utils/web3Utils");

describe("web3Utils", () => {
  describe("failure cases", () => {
    describe.each([
      {
        ethAddress: undefined,
        result: false,
      },
      {
        ethAddress: null,
        result: false,
      },
      {
        ethAddress: 0x19c326fff9a1018c3841817cfc26c58558f61144,
        result: false,
      },
    ])(".testing $ethAddress", ({ ethAddress, result }) => {
      test(`expted returns ${result}`, async () => {
        //expect(isValidEthAddress(ethAddress)).toStrictEqual(result);
        expect(await isValidEthAddress(ethAddress)).toBe(result);
      });
    });
  });
  describe("success cases", () => {
    describe.each([
      {
        ethAddress: "0x19C326FFF9a1018c3841817CFc26c58558F61143",
        result: true,
      },
      {
        ethAddress: "0x19C326FFF9a1018c3841817CFc26c58558F61144",
        result: false,
      },
    ])(".testing $ethAddress", ({ ethAddress, result }) => {
      test(`expted returns ${result}`, async () => {
        expect(await isValidEthAddress(ethAddress)).toBe(result);
      });
    });
  });
});
