import { useEnvironment } from "./helpers";
import { assert, expect } from "chai";
import { NomicLabsHardhatPluginError } from "hardhat/plugins";
import { SupportedNetwork } from "./networks";

describe("Plugin test xdeploy on Sepolia and Holešky with constructor", function () {
  describe("Hardhat Runtime Environment (HRE) extension", function () {
    useEnvironment("sepolia-holesky-project-with-constructor");
    it("calling xdeploy successfully", async function () {
      return this.hre.run("xdeploy");
    });

    it("should fail due to missing network arguments - version 1", async function () {
      this.hre.config.xdeploy.networks = [];
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "missing network arguments should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include(
              "Please provide at least one deployment network via the hardhat config.",
            );
        });
    });

    it("should fail due to missing network arguments - version 2", async function () {
      this.hre.config.xdeploy.networks = undefined;
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "missing network arguments should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include(
              "Please provide at least one deployment network via the hardhat config.",
            );
        });
    });

    it("should fail due to unsupported network argument", async function () {
      this.hre.config.xdeploy.networks = ["hardhat", "WAGMI"] as SupportedNetwork[];
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "unsupported network arguments should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include(
              "You have tried to configure a network that this plugin does not yet support,",
            );
        });
    });

    it("should fail due to unequal length of `networks` and `rpcUrls`", async function () {
      this.hre.config.xdeploy.networks = ["hardhat"];
      this.hre.config.xdeploy.rpcUrls = [
        "hardhat",
        "https://mainnet.infura.io/v3/506b137aa",
      ];
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "unequal length of `networks` and `rpcUrls` arguments should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include(
              "Please ensure that both parameters have the same length",
            );
        });
    });

    it("should fail due to missing salt value - version 1", async function () {
      this.hre.config.xdeploy.salt = undefined;
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "missing salt value should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include("Please provide an arbitrary value as salt.");
        });
    });

    it("should fail due to missing salt value - version 2", async function () {
      this.hre.config.xdeploy.salt = "";
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "missing salt value should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include("Please provide an arbitrary value as salt.");
        });
    });

    it("should fail due to missing signer - version 1", async function () {
      this.hre.config.xdeploy.signer = undefined;
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "missing signer value should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include("Please provide a signer private key.");
        });
    });

    it("should fail due to missing signer - version 2", async function () {
      this.hre.config.xdeploy.signer = "";
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "missing signer value should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include("Please provide a signer private key.");
        });
    });

    it("should fail due to missing contract - version 1", async function () {
      this.hre.config.xdeploy.contract = undefined;
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "missing contract value should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include(
              "Please specify the contract name of the smart contract to be deployed.",
            );
        });
    });

    it("should fail due to missing contract - version 2", async function () {
      this.hre.config.xdeploy.contract = "";
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "missing contract value should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include(
              "Please specify the contract name of the smart contract to be deployed.",
            );
        });
    });

    it("should fail due to exceeding gasLimit", async function () {
      this.hre.config.xdeploy.gasLimit = 15.1 * 10 ** 6;
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "too high gasLimit should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include("Please specify a lower gasLimit.");
        });
    });

    it("should fail due to existing bytecode", async function () {
      this.hre.config.xdeploy.salt = "wagmi";
      return this.hre
        .run("xdeploy")
        .then(() => {
          assert.fail("deployment request should fail");
        })
        .catch((reason) => {
          expect(reason).to.be.an.instanceOf(
            NomicLabsHardhatPluginError,
            "existing bytecode should throw a plugin error",
          );
          expect(reason.message)
            .to.be.a("string")
            .and.include(
              "The address of the contract you want to deploy already has existing bytecode",
            );
        });
    });
  });
});
