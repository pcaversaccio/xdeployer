/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendConfig, subtask, task } from "hardhat/config";
import { xdeployConfigExtender } from "./config";
import { networks, explorers } from "./networks";
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
} from "./constants";
import { RESET, GREEN, RED, YELLOW } from "./colour-codes";
import "./type-extensions";
import abi from "./abi/Create2Deployer.json";

import { NomicLabsHardhatPluginError } from "hardhat/plugins";
import "@nomicfoundation/hardhat-ethers";
import * as fs from "fs";
import path from "path";

extendConfig(xdeployConfigExtender);

task(
  "xdeploy",
  "Deploys the contract across all predefined networks",
).setAction(async (_, hre) => {
  await hre.run(TASK_VERIFY_NETWORK_ARGUMENTS);
  await hre.run(TASK_VERIFY_SUPPORTED_NETWORKS);
  await hre.run(TASK_VERIFY_EQUAL_ARGS_NETWORKS);
  await hre.run(TASK_VERIFY_SALT);
  await hre.run(TASK_VERIFY_SIGNER);
  await hre.run(TASK_VERIFY_CONTRACT);
  await hre.run(TASK_VERIFY_GASLIMIT);

  await hre.run("compile");

  if (hre.config.xdeploy.rpcUrls && hre.config.xdeploy.networks) {
    const providers: any[] = [];
    const wallets: any[] = [];
    const signers: any[] = [];
    const create2Deployer: any[] = [];
    const createReceipt: any[] = [];
    const result: any[] = [];
    const dir = "./deployments";

    let initcode: any;
    let computedContractAddress: any;
    let chainId: any;
    let idx: number;

    console.log(
      "\nThe deployment is starting... Please bear with me, this may take a minute or two. Anyway, WAGMI!",
    );

    if (hre.config.xdeploy.constructorArgsPath && hre.config.xdeploy.contract) {
      const args = await import(
        path.normalize(
          path.join(
            hre.config.paths.root,
            hre.config.xdeploy.constructorArgsPath,
          ),
        )
      );

      const contract = await hre.ethers.getContractFactory(
        hre.config.xdeploy.contract,
      );

      const ext = hre.config.xdeploy.constructorArgsPath.split(".").pop();
      if (ext === "ts") {
        initcode = await contract.getDeployTransaction(...args.data);
      } else if (ext === "js") {
        initcode = await contract.getDeployTransaction(...args.default);
      }
    } else if (
      !hre.config.xdeploy.constructorArgsPath &&
      hre.config.xdeploy.contract
    ) {
      const contract = await hre.ethers.getContractFactory(
        hre.config.xdeploy.contract,
      );
      initcode = await contract.getDeployTransaction();
    }

    for (let i = 0; i < hre.config.xdeploy.rpcUrls.length; i++) {
      providers[i] = new hre.ethers.JsonRpcProvider(
        hre.config.xdeploy.rpcUrls[i],
      );

      wallets[i] = new hre.ethers.Wallet(
        hre.config.xdeploy.signer,
        providers[i],
      );

      signers[i] = wallets[i].connect(providers[i]);

      if (
        hre.config.xdeploy.networks[i] !== "hardhat" &&
        hre.config.xdeploy.networks[i] !== "localhost"
      ) {
        create2Deployer[i] = new hre.ethers.Contract(
          CREATE2_DEPLOYER_ADDRESS,
          abi,
          signers[i],
        );

        if (hre.config.xdeploy.salt) {
          try {
            let counter = 0;
            computedContractAddress = await create2Deployer[i].computeAddress(
              hre.ethers.id(hre.config.xdeploy.salt),
              hre.ethers.keccak256(initcode.data),
            );
            if (counter === 0) {
              console.log(
                `\nYour deployment parameters will lead to the following contract address: ${GREEN}${computedContractAddress}${RESET}\n` +
                  `\n${YELLOW}=> If this does not match your expectation, given a previous deployment, you have either changed the value of${RESET}\n` +
                  `${YELLOW}the salt parameter or the bytecode of the contract!${RESET}\n`,
              );
            }
            ++counter;
          } catch (err) {
            throw new NomicLabsHardhatPluginError(
              PLUGIN_NAME,
              `The contract address could not be computed. Please check your contract name and constructor arguments.`,
            );
          }

          if ((await providers[i].getCode(computedContractAddress)) !== "0x") {
            throw new NomicLabsHardhatPluginError(
              PLUGIN_NAME,
              `The address of the contract you want to deploy already has existing bytecode on ${hre.config.xdeploy.networks[i]}.
              It is very likely that you have deployed this contract before with the same salt parameter value.
              Please try using a different salt value.`,
            );
          }

          try {
            createReceipt[i] = await create2Deployer[i].deploy(
              AMOUNT,
              hre.ethers.id(hre.config.xdeploy.salt),
              initcode.data,
              { gasLimit: hre.config.xdeploy.gasLimit },
            );

            chainId = createReceipt[i].chainId;
            idx = networks.indexOf(hre.config.xdeploy.networks[i]);

            createReceipt[i] = await createReceipt[i].wait();

            if (hre.config.xdeploy.networks[i] == "hecoMain") {
              result[i] = {
                network: hre.config.xdeploy.networks[i],
                chainId: chainId.toString(),
                contract: hre.config.xdeploy.contract,
                txHash: createReceipt[i].hash,
                txHashLink: `${explorers[idx]}transaction/${createReceipt[i].hash}`,
                address: computedContractAddress,
                addressLink: `${explorers[idx]}address/${computedContractAddress}`,
                receipt: createReceipt[i].toJSON(),
                deployed: true,
                error: undefined,
              };
            } else {
              result[i] = {
                network: hre.config.xdeploy.networks[i],
                chainId: chainId.toString(),
                contract: hre.config.xdeploy.contract,
                txHash: createReceipt[i].hash,
                txHashLink: `${explorers[idx]}tx/${createReceipt[i].hash}`,
                address: computedContractAddress,
                addressLink: `${explorers[idx]}address/${computedContractAddress}`,
                receipt: createReceipt[i].toJSON(),
                deployed: true,
                error: undefined,
              };
            }

            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }

            const saveDir = path.normalize(
              path.join(
                hre.config.paths.root,
                "deployments",
                `${hre.config.xdeploy.contract}_${hre.config.xdeploy.networks[i]}_deployment.json`,
              ),
            );

            fs.writeFileSync(saveDir, JSON.stringify(result[i]));

            console.log(
              `\n${GREEN}----------------------------------------------------------${RESET}\n` +
                `${GREEN}><><><><           XDEPLOY DEPLOYMENT ${
                  i + 1
                }           ><><><><${RESET}\n` +
                `${GREEN}----------------------------------------------------------${RESET}\n\n` +
                `Deployment status: ${GREEN}successful${RESET}\n\n` +
                `Network: ${GREEN}${result[i].network}${RESET}\n\n` +
                `Chain ID: ${GREEN}${result[i].chainId}${RESET}\n\n` +
                `Contract name: ${GREEN}${result[i].contract}${RESET}\n\n` +
                `Contract creation transaction hash: ${GREEN}${result[i].txHashLink}${RESET}\n\n` +
                `Contract address: ${GREEN}${result[i].addressLink}${RESET}\n\n` +
                `Transaction details written to: ${GREEN}${saveDir}${RESET}\n`,
            );
          } catch (err) {
            result[i] = {
              network: hre.config.xdeploy.networks[i],
              chainId: undefined,
              contract: hre.config.xdeploy.contract,
              txHash: undefined,
              txHashLink: undefined,
              address: computedContractAddress,
              addressLink: undefined,
              receipt: undefined,
              deployed: false,
              error: err,
            };

            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }

            const saveDir = path.normalize(
              path.join(
                hre.config.paths.root,
                "deployments",
                `${hre.config.xdeploy.contract}_${hre.config.xdeploy.networks[i]}_deployment_debug.json`,
              ),
            );

            fs.writeFileSync(saveDir, JSON.stringify(result[i]));

            console.log(
              `\n${RED}----------------------------------------------------------${RESET}\n` +
                `${RED}><><><><           XDEPLOY DEPLOYMENT ${
                  i + 1
                }           ><><><><${RESET}\n` +
                `${RED}----------------------------------------------------------${RESET}\n\n` +
                `Deployment status: ${RED}failed${RESET}\n\n` +
                `Network: ${RED}${result[i].network}${RESET}\n\n` +
                `Contract name: ${RED}${result[i].contract}${RESET}\n\n` +
                `Error details written to: ${RED}${saveDir}${RESET}\n\n` +
                `${RED}=> Debugging hint: Many deployment errors are due to a too low gasLimit or a reused salt parameter value.${RESET}\n`,
            );
          }
        }
      } else if (
        hre.config.xdeploy.networks[i] === "hardhat" ||
        hre.config.xdeploy.networks[i] === "localhost"
      ) {
        let hhcreate2Deployer = await hre.ethers.getContractFactory(
          "Create2DeployerLocal",
        );

        if (hre.config.xdeploy.networks[i] === "localhost") {
          hhcreate2Deployer = await hre.ethers.getContractFactory(
            "Create2DeployerLocal",
            signers[i],
          );
        }

        create2Deployer[i] = await hhcreate2Deployer.deploy();

        if (hre.config.xdeploy.salt) {
          try {
            let counter = 0;
            computedContractAddress = await create2Deployer[i].computeAddress(
              hre.ethers.id(hre.config.xdeploy.salt),
              hre.ethers.keccak256(initcode.data),
            );
            if (counter === 0) {
              console.log(
                `\nYour deployment parameters will lead to the following contract address: ${GREEN}${computedContractAddress}${RESET}\n` +
                  `\n${YELLOW}=> If this does not match your expectation, given a previous deployment, you have either changed the value of${RESET}\n` +
                  `${YELLOW}the salt parameter or the bytecode of the contract!${RESET}\n`,
              );
            }
            ++counter;
          } catch (err) {
            throw new NomicLabsHardhatPluginError(
              PLUGIN_NAME,
              `The contract address could not be computed. Please check your contract name and constructor arguments.`,
            );
          }

          try {
            createReceipt[i] = await create2Deployer[i].deploy(
              AMOUNT,
              hre.ethers.id(hre.config.xdeploy.salt),
              initcode.data,
              { gasLimit: hre.config.xdeploy.gasLimit },
            );

            chainId = createReceipt[i].chainId;
            idx = networks.indexOf(hre.config.xdeploy.networks[i]);

            createReceipt[i] = await createReceipt[i].wait();

            result[i] = {
              network: hre.config.xdeploy.networks[i],
              chainId: chainId.toString(),
              contract: hre.config.xdeploy.contract,
              txHash: createReceipt[i].hash,
              txHashLink: explorers[idx],
              address: computedContractAddress,
              addressLink: explorers[idx],
              receipt: createReceipt[i].toJSON(),
              deployed: true,
              error: undefined,
            };

            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }

            const saveDir = path.normalize(
              path.join(
                hre.config.paths.root,
                "deployments",
                `${hre.config.xdeploy.contract}_${hre.config.xdeploy.networks[i]}_deployment.json`,
              ),
            );

            fs.writeFileSync(saveDir, JSON.stringify(result[i]));

            console.log(
              `\n${GREEN}----------------------------------------------------------${RESET}\n` +
                `${GREEN}><><><><           XDEPLOY DEPLOYMENT ${
                  i + 1
                }           ><><><><${RESET}\n` +
                `${GREEN}----------------------------------------------------------${RESET}\n\n` +
                `Deployment status: ${GREEN}successful${RESET}\n\n` +
                `Network: ${GREEN}${result[i].network}${RESET}\n\n` +
                `Chain ID: ${GREEN}${result[i].chainId}${RESET}\n\n` +
                `Contract name: ${GREEN}${result[i].contract}${RESET}\n\n` +
                `Contract creation transaction: ${GREEN}${result[i].txHash}${RESET}\n\n` +
                `Contract address: ${GREEN}${result[i].address}${RESET}\n\n` +
                `Transaction details written to: ${GREEN}${saveDir}${RESET}\n`,
            );
          } catch (err) {
            result[i] = {
              network: hre.config.xdeploy.networks[i],
              chainId: undefined,
              contract: hre.config.xdeploy.contract,
              txHash: undefined,
              txHashLink: undefined,
              address: computedContractAddress,
              addressLink: undefined,
              receipt: undefined,
              deployed: false,
              error: err,
            };

            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }

            const saveDir = path.normalize(
              path.join(
                hre.config.paths.root,
                "deployments",
                `${hre.config.xdeploy.contract}_${hre.config.xdeploy.networks[i]}_deployment_debug.json`,
              ),
            );

            fs.writeFileSync(saveDir, JSON.stringify(result[i]));

            console.log(
              `\n${RED}----------------------------------------------------------${RESET}\n` +
                `${RED}><><><><           XDEPLOY DEPLOYMENT ${
                  i + 1
                }           ><><><><${RESET}\n` +
                `${RED}----------------------------------------------------------${RESET}\n\n` +
                `Deployment status: ${RED}failed${RESET}\n\n` +
                `Network: ${RED}${result[i].network}${RESET}\n\n` +
                `Contract name: ${RED}${result[i].contract}${RESET}\n\n` +
                `Error details written to: ${RED}${saveDir}${RESET}\n\n` +
                `${RED}=> Debugging hint: Many deployment errors are due to a too low gasLimit or a reused salt parameter value.${RESET}\n`,
            );
          }
        }
      }
    }
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
        E.g.: { [...], xdeploy: { networks: ["sepolia", "holesky"] }, [...] }
        The current supported networks are ${networks}.`,
    );
  }
});

subtask(TASK_VERIFY_SUPPORTED_NETWORKS).setAction(async (_, hre) => {
  const unsupported = hre?.config?.xdeploy?.networks?.filter(
    (v) => !networks.includes(v),
  );
  if (unsupported && unsupported.length > 0) {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `You have tried to configure a network that this plugin does not yet support,
      or you have misspelled the network name. The currently supported networks are
      ${networks}.`,
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
      network there is a corresponding rpcUrls entry.`,
    );
  }
});

subtask(TASK_VERIFY_SALT).setAction(async (_, hre) => {
  if (!hre.config.xdeploy.salt || hre.config.xdeploy.salt === "") {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `Please provide an arbitrary value as salt.
      E.g.: { [...], xdeploy: { salt: "WAGMI" }, [...] }.`,
    );
  }
});

subtask(TASK_VERIFY_SIGNER).setAction(async (_, hre) => {
  if (!hre.config.xdeploy.signer || hre.config.xdeploy.signer === "") {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `Please provide a signer private key. We recommend using Hardhat configuration variables.
      See https://hardhat.org/hardhat-runner/docs/guides/configuration-variables.
      E.g.: { [...], xdeploy: { signer: vars.get("PRIVATE_KEY", "") }, [...] }.`,
    );
  }
});

subtask(TASK_VERIFY_CONTRACT).setAction(async (_, hre) => {
  if (!hre.config.xdeploy.contract || hre.config.xdeploy.contract === "") {
    throw new NomicLabsHardhatPluginError(
      PLUGIN_NAME,
      `Please specify the contract name of the smart contract to be deployed.
      E.g.: { [...], xdeploy: { contract: "ERC20" }, [...] }.`,
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
      a target size of 15 million gas.`,
    );
  }
});
