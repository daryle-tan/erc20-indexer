import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  // ColorModeScript,
  // IconButton,
  useColorMode,
} from "@chakra-ui/react"
import { Alchemy, Network, Utils } from "alchemy-sdk"
import { useState } from "react"
// import { FaMoon, FaSun } from "react-icons/fa"

function App() {
  const [userAddress, setUserAddress] = useState("")
  const [results, setResults] = useState([])
  const [hasQueried, setHasQueried] = useState(false)
  const [tokenDataObjects, setTokenDataObjects] = useState([])
  // const { colorMode, toggleColorMode } = useColorMode()
  const [account, setAccount] = useState(null)

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)
  }

  async function getTokenBalance() {
    const config = {
      apiKey: "zqnjSXHHjA5JJ6sbz6x_1-8PgbAwFEon",
      network: Network.ETH_MAINNET,
    }

    const alchemy = new Alchemy(config)
    const data = await alchemy.core.getTokenBalances(userAddress)

    setResults(data)

    const tokenDataPromises = []

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress,
      )
      tokenDataPromises.push(tokenData)
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises))
    setHasQueried(true)
  }

  const number = "123.45678"
  const decimalIndex = number.indexOf(".")

  return (
    <>
      {/* <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound="true"
        size="lg"
        alignSelf="flex-end"
        onClick={toggleColorMode}
        margin="5px"
      /> */}
      <Box w="100vw">
        <Center>
          <Flex
            alignItems={"center"}
            justifyContent="center"
            flexDirection={"column"}
          >
            <Button
              fontSize={20}
              onClick={connectHandler}
              mt={36}
              bgColor="#65db7f"
            >
              Connect Wallet
            </Button>
          </Flex>
        </Center>
        <Center>
          <Flex
            alignItems={"center"}
            justifyContent="center"
            flexDirection={"column"}
          >
            <Heading mb={0} fontSize={36}>
              ERC-20 Token Indexer
            </Heading>
            <Text>
              Plug in an address and this website will return all of its ERC-20
              token balances!
            </Text>
          </Flex>
        </Center>
        <Flex
          w="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent={"center"}
        >
          <Heading mt={42}>
            Get all the ERC-20 token balances of this address:
          </Heading>
          <Input
            onChange={(e) => setUserAddress(e.target.value)}
            color="black"
            w="600px"
            textAlign="center"
            p={4}
            bgColor="whitesmoke"
            fontSize={24}
          />
          <Button
            fontSize={20}
            onClick={getTokenBalance}
            mt={36}
            bgColor="#65db7f"
          >
            Check ERC-20 Token Balances
          </Button>

          <Heading my={36}>ERC-20 token balances:</Heading>

          {hasQueried ? (
            <SimpleGrid w={"90vw"} columns={4} spacing={24}>
              {results.tokenBalances.map((e, i) => {
                return (
                  <Flex
                    flexDir={"column"}
                    color="white"
                    bg="blue"
                    w={"20vw"}
                    key={e.id}
                  >
                    <Box>
                      <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                    </Box>
                    <Box>
                      <b>Balance:</b>&nbsp;
                      {Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals,
                      ).slice(0, 8)}
                    </Box>
                    <Image src={tokenDataObjects[i].logo} />
                  </Flex>
                )
              })}
            </SimpleGrid>
          ) : (
            "Please make a query! This may take a few seconds..."
          )}
        </Flex>
      </Box>
    </>
  )
}

export default App
