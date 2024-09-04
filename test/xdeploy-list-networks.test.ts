import { useEnvironment } from "./helpers";

describe("Plugin test xdeploy: Printing the supported networks table", function () {
  useEnvironment("hardhat-project-with-constructor");
  it("list supported networks table successfully", async function () {
    return this.hre.run("xdeploy", { listNetworks: true });
  });
});
