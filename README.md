# verify-contract-remix-plugin

(Forked from https://github.com/Machinalabs/remix-etherscan-plugin.git)

A plugin to verify contracts on mainnet and testnet for Etherscan and BscScan.

To verify smart contracts, the first thing you need to do is to **compile smart contracts**.

Once the contracts are compiled, go to the plugin and you can select the smart contract you wish to verify. Then, include parameters if required and just click verify.

# How to use:
## Step 1: 
Access the Plugin Manager tab, select Connect to Local Plugin:

![](https://raw.githubusercontent.com/gitvani/verify-contract-remix-plugin/master/docs/step_1.png)

## Step 2: 
Fill the information as below picture:

![](https://raw.githubusercontent.com/gitvani/verify-contract-remix-plugin/master/docs/step_2.png)

**Plugin Name** and **Display Name** we can fill anything, as long as they do not match the activated plugins.

**Url** must be `https://remix-verify-contract.surge.sh` (This is deployed web app of this source code).

**Type of connection** must be `Iframe`.


## Step 3: 
Access the plugin tab (which has ❔ icon):

![](https://raw.githubusercontent.com/gitvani/verify-contract-remix-plugin/master/docs/step_3.png)

## Step 4: 
Fill your API Key from EtherScan or BscScan:

![](https://raw.githubusercontent.com/gitvani/verify-contract-remix-plugin/master/docs/step_4.png)

You can change API later by clicking on the ⚙ icon.

## Step 5:

To verify smart contracts, the first thing you need to do is to **compile smart contracts**. Make sure you choose the Injected Web3 on Environment:

![](https://raw.githubusercontent.com/gitvani/verify-contract-remix-plugin/master/docs/step_5.1.png)

After compiling, fill inputs as below picture to verify contract:

![](https://raw.githubusercontent.com/gitvani/verify-contract-remix-plugin/master/docs/step_5.png)

**Contract**: select your contract you want to verify.

**Constructor Arguments**: hex encoded of params of constructor when you deployed contract. Use the `web3.eth.abi.encodeParameters` to encode the params of constructor.
Example, your contract has a constructor as below:
```
constructor(uint256 a, address b, bool c) public {}
```
Then, hex encode will be the result of web3.eth.abi.encodeParameters, example:
```
web3.eth.abi.encodeParameters(['uint256','address','bool'], [200,'0x4269e7F43A63CEA1aD7707Be565a94a9189967E9',true]);
```
Result:
```
0x00000000000000000000000000000000000000000000000000000000000000c80000000000000000000000004269e7f43a63cea1ad7707be565a94a9189967e90000000000000000000000000000000000000000000000000000000000000001
```
If your contract has empty constructor, no need to fill in anything.

Tips: We can use the following tool to ecode and decode: [https://adibas03.github.io/online-ethereum-abi-encoder-decoder](https://adibas03.github.io/online-ethereum-abi-encoder-decoder). This tool is **missing 0x** where the result. There must be 0x for Remix to understand as bytes.

![](https://raw.githubusercontent.com/gitvani/verify-contract-remix-plugin/master/docs/step_5.2.png)

Otherwise, use this web tool which has easy UI: https://abi.hashex.org/

Alternatively, based on the Input Data when deploying the contract on etherscan:

Example: [https://rinkeby.etherscan.io/tx/0xdd5ccabffbe48ff9655e295c024cc14868c4f1c7ad1a3f71338ee2970f28d627](https://www.notion.so/68c4f1c7ad1a3f71338ee2970f28d627)

In the Input Data section, we will have a very long string. If the constructor has 3 parameters, then the Constructor Arguments ABI-encoded will be the last 192 characters, which is equal to 64 * 3 = 192. To get the last 192 characters in Javascript:

```javascript
const s = "0000000............0000000000";
s.substr(s.length - 192, 192);
```

**Contract address**: the address of deployed contract.

# How to fork:

```
$ git clone https://github.com/gitvani/verify-contract-remix-plugin.git
$ yarn
```

# Commands:

```
# start development project
$ yarn start 

# deploy to surge
$ yarn deploy

# build production project
$ yarn build 

```

# Issues:
If you have any issues, please feel free to create an issue in our Github repository at  https://github.com/gitvani/verify-contract-remix-plugin
