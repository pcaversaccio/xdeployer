/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendConfig, subtask, task } from "hardhat/config";
import { xdeployConfigExtender } from "./config";
import { networks } from "./networks";
import {
  CREATE2_DEPLOYER_ADDRESS,
  AMOUNT,
  PLUGIN_NAME,
  TASK_VERIFY_NETWORK_ARGUMENTS,
  TASK_VERIFY_SUPPORTED_NETWORKS,
  TASK_VERIFY_EQUAL_ARGS_NETWORKS,
  TASK_VERIFY_SALT,
  TASK_VERIFY_SIGNER,
  TASK_VERIFY_CONTRACT,
  TASK_VERIFY_GASLIMIT,
  TASK_VERIFY_DEPLOYER_ADDRESS,
} from "./constants";
import "./type-extensions";
import abi from "./abi/Create2Deployer.json";

import { NomicLabsHardhatPluginError } from "hardhat/plugins";
import "@nomiclabs/hardhat-ethers";
import { IDeploymentParams, IDeploymentResult } from "./types";

extendConfig(xdeployConfigExtender);

task(
  "xdeploy",
  "Deploys the contract across all predefined networks"
).setAction(async ({ contract, constructorArgs }, hre) => {
  console.log(`Deployment of ${contract} through xdeployer starting now !`);

  await hre.run(TASK_VERIFY_NETWORK_ARGUMENTS);
  await hre.run(TASK_VERIFY_SUPPORTED_NETWORKS);
  await hre.run(TASK_VERIFY_EQUAL_ARGS_NETWORKS);
  await hre.run(TASK_VERIFY_SALT);
  await hre.run(TASK_VERIFY_SIGNER);
  await hre.run(TASK_VERIFY_CONTRACT, { contract });
  await hre.run(TASK_VERIFY_GASLIMIT);
  await hre.run(TASK_VERIFY_DEPLOYER_ADDRESS);

  await hre.run("compile");

  if (hre.config.xdeploy.rpcUrls && hre.config.xdeploy.networks) {
    const providers: Array<any> = [];
    const wallets: Array<any> = [];
    const signers: Array<any> = [];
    const create2Deployer: Array<any> = [];
    const createReceipt: Array<any> = [];
    const result: Array<any> = [];
    let initcode: any;

    const Contract = await hre.ethers.getContractFactory(contract);
    if (constructorArgs && contract) {
      initcode = await Contract.getDeployTransaction(...constructorArgs);
    } else if (!constructorArgs && contract) {
      initcode = await Contract.getDeployTransaction();
    }

    for (let i = 0; i < hre.config.xdeploy.rpcUrls.length; i++) {
      providers[i] = new hre.ethers.providers.JsonRpcProvider(
        hre.config.xdeploy.rpcUrls[i]
      );
      wallets[i] = new hre.ethers.Wallet(
        hre.config.xdeploy.signer,
        providers[i]
      );
      signers[i] = wallets[i].connect(providers[i]);

      let computedContractAddress: string;
      if (
        hre.config.xdeploy.networks[i] !== "hardhat" &&
        hre.config.xdeploy.networks[i] !== "localhost"
      ) {
        if (!hre.config.xdeploy.deployerAddress) {
          throw new Error("Deployer address undefined");
        }

        create2Deployer[i] = new hre.ethers.Contract(
          hre.config.xdeploy.deployerAddress,
          abi,
          signers[i]
        );

        if (hre.config.xdeploy.salt) {
          try {
            computedContractAddress = await create2Deployer[i].computeAddress(
              hre.ethers.utils.id(hre.config.xdeploy.salt),
              hre.ethers.utils.keccak256(initcode.data)
            );
          } catch (err) {
            throw new Error(
              "Contract address could not be computed, check your contract name and arguments"
            );
          }
          try {
            createReceipt[i] = await create2Deployer[i].deploy(
              AMOUNT,
              hre.ethers.utils.id(hre.config.xdeploy.salt),
              initcode.data,
              { gasLimit: hre.config.xdeploy.gasLimit }
            );

            createReceipt[i] = await createReceipt[i].wait();

            result[i] = {
              network: hre.config.xdeploy.networks[i],
              contract: contract,
              address: computedContractAddress,
              receipt: createReceipt[i],
              deployed: true,
              error: undefined,
            };
          } catch (err) {
            result[i] = {
              network: hre.config.xdeploy.networks[i],
              contract: contract,
              address: computedContractAddress,
              receipt: undefined,
              deployed: false,
              error: err,
            };
          }
        }
      } else if (
        hre.config.xdeploy.networks[i] === "hardhat" ||
        hre.config.xdeploy.networks[i] === "localhost"
      ) {
        const hhcreate2Deployer = await hre.ethers.getContractFactory(
          "Create2DeployerLocal"
        );
        create2Deployer[i] = await hhcreate2Deployer.deploy();

        if (hre.config.xdeploy.salt) {
          try {
            computedContractAddress = await create2Deployer[i].computeAddress(
              hre.ethers.utils.id(hre.config.xdeploy.salt),
              hre.ethers.utils.keccak256(initcode.data)
            );
          } catch (err) {
            throw new Error(
              "Contract address could not be computed, check your contract name and arguments"
            );
          }
          try {
            createReceipt[i] = await create2Deployer[i].deploy(
              AMOUNT,
              hre.ethers.utils.id(hre.config.xdeploy.salt),
              initcode.data,
              { gasLimit: hre.config.xdeploy.gasLimit }
            );

            createReceipt[i] = await createReceipt[i].wait();

            result[i] = {
              network: hre.config.xdeploy.networks[i],
              contract: contract,
              address: computedContractAddress,
              receipt: createReceipt[i],
              deployed: true,
              error: undefined,
            };
          } catch (err) {
            result[i] = {
              network: hre.config.xdeploy.networks[i],
              contract: contract,
              address: computedContractAddress,
              receipt: undefined,
              deployed: false,
              error: err,
            };
          }
        }
      }
    }
    return result;
  }
});

subtask(TASK_VERIFY_NETWORK_ARGUMENTS).setAction(async (_, hre) => {
  if (
    !hre.config.xdeploy.networks ||
    hre.config.xdeploy.networks.length === 0
  ) {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `Please provide at least one deployment network via the hardhat config.
        E.g.: { [...], xdeploy: { networks: ["rinkeby", "kovan"] }, [...] }
        The current supported networks are ${networks}.`
    );
  }
});

subtask(TASK_VERIFY_DEPLOYER_ADDRESS).setAction(async (_, hre) => {
  if (
    !hre.config.xdeploy.deployerAddress ||
    hre.config.xdeploy.deployerAddress === "" ||
    !hre.ethers.utils.isAddress(hre.config.xdeploy.deployerAddress)
  ) {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `The deployer contract address that you specified `
    );
  }
});

subtask(TASK_VERIFY_SUPPORTED_NETWORKS).setAction(async (_, hre) => {
  const unsupported = hre?.config?.xdeploy?.networks?.filter(
    (v: string) => !networks.includes(v)
  );
  if (
    hre.config.xdeploy.deployerAddress === CREATE2_DEPLOYER_ADDRESS &&
    unsupported &&
    unsupported.length > 0
  ) {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `You have tried to configure a network that this plugin does not yet support,
      or you have misspelled the network name. The currently supported networks are
      ${networks}.`
    );
  }
});

subtask(TASK_VERIFY_EQUAL_ARGS_NETWORKS).setAction(async (_, hre) => {
  if (
    hre.config.xdeploy.networks &&
    hre.config.xdeploy.rpcUrls &&
    hre.config.xdeploy.rpcUrls.length !== hre.config.xdeploy.networks.length
  ) {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `The parameters "network" and "rpcUrls" do not have the same length.
      Please ensure that both parameters have the same length, i.e. for each
      network there is a corresponding rpcUrls entry.`
    );
  }
});

subtask(TASK_VERIFY_SALT).setAction(async (_, hre) => {
  if (!hre.config.xdeploy.salt || hre.config.xdeploy.salt === "") {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `Please provide an arbitrary value as salt.
      E.g.: { [...], xdeploy: { salt: "WAGMI" }, [...] }.`
    );
  }
});

subtask(TASK_VERIFY_SIGNER).setAction(async (_, hre) => {
  if (!hre.config.xdeploy.signer || hre.config.xdeploy.signer === "") {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `Please provide a signer private key. We recommend using a .env file.
      See https://www.npmjs.com/package/dotenv.
      E.g.: { [...], xdeploy: { signer: process.env.PRIVATE_KEY }, [...] }.`
    );
  }
});

subtask(TASK_VERIFY_CONTRACT).setAction(async ({ contract }) => {
  if (!contract || contract === "") {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `Please specify the contract name of the smart contract to be deployed.
      E.g.: { [...], xdeploy: { contract: "ERC20" }, [...] }.`
    );
  }
});

subtask(TASK_VERIFY_GASLIMIT).setAction(async (_, hre) => {
  if (
    hre.config.xdeploy.gasLimit &&
    hre.config.xdeploy.gasLimit > 15 * 10 ** 6
  ) {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `Please specify a lower gasLimit. Each block has currently 
      a target size of 15 million gas.`
    );
  }
});

export { CREATE2_DEPLOYER_ADDRESS, IDeploymentParams, IDeploymentResult };
