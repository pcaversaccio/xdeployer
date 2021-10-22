import { extendConfig, subtask, task } from "hardhat/config";
import { xdeployConfigExtender } from "./config";
import { networks } from "./networks";
import { 
  CREATE2_DEPLOYER_ADDRESS,
  AMOUNT,
  GASLIMIT,
  PLUGIN_NAME,
  TASK_VERIFY_NETWORK_ARGUMENTS
} from "./constants";
import "./type-extensions";
import abi from "./abi/Create2Deployer.json";

import { NomicLabsHardhatPluginError } from "hardhat/plugins";
import "@nomiclabs/hardhat-ethers";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";

extendConfig(xdeployConfigExtender);

task("xdeploy", "Deploys the contract across all defined networks")
  .setAction(async (_, hre) => {
    if (hre.config.xdeploy.rpcUrls !== undefined && hre.config.xdeploy.networks !== undefined 
      && hre.config.xdeploy.rpcUrls.length == hre.config.xdeploy.networks.length) {
      let providers: Array<any> = [];
      let wallets: Array<any> = [];
      let signers: Array<any> = [];
      let create2Deployer: Array<any> = [];
      let createReceipt: Array<any> = [];
      let initcode: any;
      
      if (hre.config.xdeploy.constructorArgsPath !== undefined && hre.config.xdeploy.contract !== undefined) {
        const args = (await import(hre.config.xdeploy.constructorArgsPath));
        const Contract = await hre.ethers.getContractFactory(hre.config.xdeploy.contract);
        initcode = await Contract.getDeployTransaction(...args.data);
      } else if (hre.config.xdeploy.contract !== undefined) {
        const Contract = await hre.ethers.getContractFactory(hre.config.xdeploy.contract);
        initcode = await Contract.getDeployTransaction();
      }

      for (let i = 0; i < hre.config.xdeploy.rpcUrls.length; i++) {
        providers[i] = new hre.ethers.providers.JsonRpcProvider(hre.config.xdeploy.rpcUrls[i]);
        wallets[i] = new hre.ethers.Wallet(hre.config.xdeploy.signer, providers[i]);
        signers[i] = wallets[i].connect(providers[i]);
        
        if(hre.config.xdeploy.networks[i] !== "hardhat") {
          create2Deployer[i] =  new hre.ethers.Contract(CREATE2_DEPLOYER_ADDRESS, abi, signers[i]);
          if (hre.config.xdeploy.salt !== undefined){
            createReceipt[i] = await create2Deployer[i].deploy(AMOUNT, hre.ethers.utils.id(
              hre.config.xdeploy.salt), initcode.data, { gasLimit: GASLIMIT }
            )
            await createReceipt[i].wait();
            console.log(
              `${hre.config.xdeploy.networks[i]} deployment successful with hash: ${createReceipt[i].hash}`
            );
          }
        } else if (hre.config.xdeploy.networks[i] === "hardhat") {
          const hhcreate2Deployer = await hre.ethers.getContractFactory("Create2Deployer");
          create2Deployer[i] = await hhcreate2Deployer.deploy();
          if (hre.config.xdeploy.salt !== undefined){
            createReceipt[i] = await create2Deployer[i].deploy(AMOUNT, hre.ethers.utils.id(
              hre.config.xdeploy.salt), initcode.data, { gasLimit: GASLIMIT }
            )
            await createReceipt[i].wait();
            console.log(
              `${hre.config.xdeploy.networks[i]} deployment successful with hash: ${createReceipt[i].hash}`
            );
          }
        }
      }
    }
  });

subtask(TASK_VERIFY_NETWORK_ARGUMENTS)
  .setAction(async (_,hre) => {
    if (hre.config.xdeploy.networks === undefined || hre.config.xdeploy.networks.length == 0) {
      throw new NomicLabsHardhatPluginError(
        PLUGIN_NAME,
        `Please provide at least one deployment network via the hardhat config.
        E.g.: { [...], xdeploy: { networks: ["rinkeby", "kovan"] }, [...] }
        The current supported networks are ${networks}.`
      );
    }
  });
