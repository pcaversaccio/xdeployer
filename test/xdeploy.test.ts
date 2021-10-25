import { useEnvironment } from "./helpers";

describe("Integration test xdeploy", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");
    it("Call xdeploy with hardhat & localhost", async function () {
      return this.hre.run("xdeploy");
    });
  });
});
