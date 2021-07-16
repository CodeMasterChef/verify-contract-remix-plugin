import { PluginApi, IRemixApi, PluginClient, Api } from "@remixproject/plugin"

type RemixClient = PluginApi<Readonly<IRemixApi>> &
  PluginClient<Api, Readonly<IRemixApi>>

export const getEtherScanApi = (networkName: string) => {
  if(networkName === 'bsc_mainnet') {
    return 'https://api.bscscan.com/api'
  } else if (networkName === 'bsc_testnet') {
    return 'https://api-testnet.bscscan.com/api'
  } else if (networkName === 'main') {
    return 'https://api.etherscan.io/api'
  } else {
    return `https://api-${networkName}.etherscan.io/api`
  }
}

export const getNetworkName = async (client: RemixClient) => {
  const network = await client.call("network", "detectNetwork")
  if (!network) {
    throw new Error("no known network to verify against")
  }
  let name = network.name!.toLowerCase()
  if( name === 'custom') {
    console.log(network?.id)
    if( Number(network?.id) === 56) {
      name = 'bsc_mainnet'
    } else if (Number(network?.id) === 97) {
      name = 'bsc_testnet'
    }
  }
  // TODO : remove that when https://github.com/ethereum/remix-ide/issues/2017 is fixed
  return name === "görli" ? "goerli" : name
}

export const getReceiptStatus = async (
  receiptGuid: string,
  apiKey: string,
  etherscanApi: string
) => {
  const params = `guid=${receiptGuid}&module=contract&action=checkverifystatus&apiKey=${apiKey}`
  try {
    const response = await fetch(`${etherscanApi}?${params}`, {
      method: "GET",
    })
    const { result } = await response.json()
    return result
  } catch (error) {
    console.log("Error", error)
  }
}
