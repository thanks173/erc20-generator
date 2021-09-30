import config from '../config';
import utils from './utils';

import SimpleERC20 from '../abi/token/SimpleERC20.json';
import StandardERC20 from '../abi/token/StandardERC20.json';
import BurnableERC20 from '../abi/token/BurnableERC20.json';
import MintableERC20 from '../abi/token/MintableERC20.json';
import PausableERC20 from '../abi/token/PausableERC20.json';
import CommonERC20 from '../abi/token/CommonERC20.json';
import UnlimitedERC20 from '../abi/token/UnlimitedERC20.json';
import AmazingERC20 from '../abi/token/AmazingERC20.json';
import PowerfulERC20 from '../abi/token/PowerfulERC20.json';

export default {
  mixins: [
    utils,
  ],
  data () {
    return {
      web3: null,
      web3Provider: null,
      metamask: {
        installed: false,
        netId: null,
      },
      network: {
        default: config.defaultNetwork,
        current: null,
        map: {
          1: 'mainnet',
          3: 'ropsten',
          4: 'rinkeby',
          42: 'kovan',
          5: 'goerli',
          80001: 'mumbai',
          97: 'bscTestnet',
        },
        list: {
          mainnet: {
            web3Provider: `https://mainnet.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://etherscan.io',
            id: 1,
            name: 'Ethereum Mainnet',
          },
          ropsten: {
            web3Provider: `https://ropsten.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://ropsten.etherscan.io',
            id: 3,
            name: 'Ropsten Testnet',
          },
          rinkeby: {
            web3Provider: `https://rinkeby.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://rinkeby.etherscan.io',
            id: 4,
            name: 'Rinkeby Testnet',
          },
          kovan: {
            web3Provider: `https://kovan.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://kovan.etherscan.io',
            id: 42,
            name: 'Kovan Testnet',
          },
          goerli: {
            web3Provider: `https://goerli.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://goerli.etherscan.io',
            id: 5,
            name: 'Goerli Testnet',
          },
          mumbai: {
            web3Provider: 'https://rpc-mumbai.maticvigil.com',
            etherscanLink: 'https://mumbai.polygonscan.com/',
            id: 80001,
            name: 'Mumbai Testnet',
          },
          bscTestnet: {
            web3Provider: 'https://data-seed-prebsc-1-s1.binance.org:8545',
            etherscanLink: 'https://testnet.bscscan.com/',
            id: 97,
            name: 'BSC Testnet',
          },
        },
      },
      tokenList: {
        SimpleERC20,
        StandardERC20,
        BurnableERC20,
        MintableERC20,
        PausableERC20,
        CommonERC20,
        UnlimitedERC20,
        AmazingERC20,
        PowerfulERC20,
      },
      contracts: {
        token: null,
        service: null,
      },
    };
  },
  methods: {
    async initWeb3 (network, checkWeb3) {
      if (!Object.prototype.hasOwnProperty.call(this.network.list, network)) {
        throw new Error(
          `Failed initializing network ${network}. Allowed values are ${Object.keys(this.network.list)}.`,
        );
      }

      if (checkWeb3 && (typeof window.ethereum !== 'undefined')) {
        console.log('injected ethereum'); // eslint-disable-line no-console
        this.web3Provider = window.ethereum;

        this.web3 = new Web3(this.web3Provider);
        this.metamask.installed = this.web3Provider.isMetaMask;

        const netId = await this.promisify(this.web3.eth.getChainId);
        this.metamask.netId = netId;

        if (netId !== this.network.list[network].id) {
          this.network.current = this.network.list[this.network.map[netId]];
          await this.initWeb3(network, false);
        }
      } else {
        console.log('provided ethereum'); // eslint-disable-line no-console
        this.network.current = this.network.list[network];
        this.web3Provider = new Web3.providers.HttpProvider(this.network.list[network].web3Provider);
        this.web3 = new Web3(this.web3Provider);
      }
    },
    initToken (tokenType) {
      this.contracts.token = this.tokenList[tokenType];
      this.contracts.token.stringifiedAbi = JSON.stringify(this.contracts.token.abi);
    },
  },
};
