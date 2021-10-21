import { useEnvironment } from "./helpers";

describe("Integration test xdeploy", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");
    it("Call xdeploy", async function () {
      await this.hre.run("compile");
      return this.hre.run("xdeploy");
    });
  });
});
