import React, { useState, useEffect } from "react";
import banner from "./banner.svg";
import testFaucet from "./test-faucet.svg";
import Web3 from "web3";
import "./index.css";
import CryptoFaucet from "./contracts/sepolia/Faucet.json";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";

const web3 = new Web3(Web3.givenProvider);
const faucetAddress = "0x00045D1e40aFedd667de452544c56093630F0643";
const faucetContractInstance = new web3.eth.Contract(
  CryptoFaucet.abi,
  faucetAddress,
);

function Faucet() {
  const [account, setAccount] = useState(""); // The user's account address
  const [tokens, setTokens] = useState([]); // The list of available tokens
  const [selectedToken, setSelectedToken] = useState(""); // The selected token name
  const [loading, setLoading] = useState(false);
  const [tokenSymbols, setTokenSymbols] = useState({});

  async function load() {
    setLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      // Get the test tokens from the faucet contract
      const tokenNames = [
        "Aave",
        "CakeToken",
        "DeboToken",
        "Dogecoin",
        "USDCoin",
        "Uniswap",
        "TetherToken",
        "ShibaInu",
      ];

      const tokenAddresses = await Promise.all(
        tokenNames.map((name) =>
          faucetContractInstance.methods.testTokens(name).call(),
        ),
      );

      const tokenBalances = await Promise.all(
        tokenAddresses.map((address) => web3.eth.getBalance(address, account)),
      );

      const tokenSymbols = await Promise.all(
        tokenNames.map((name) =>
          faucetContractInstance.methods.testTokenSymbols(name).call(),
        ),
      );

      const tokenList = tokenNames.map((name, index) => ({
        name,
        address: tokenAddresses[index],
        balance: web3.utils.fromWei(tokenBalances[index], "ether"),
        symbol: tokenSymbols[index],
      }));

      setTokens(tokenList);

      setTokenSymbols(
        tokenNames.reduce((acc, name, index) => {
          acc[name] = tokenSymbols[index];
          return acc;
        }, {}),
      );
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  function handleSelect(event) {
    setSelectedToken(event.target.value);
  }

  async function handleRequest() {
    setLoading(true);
    try {
      await faucetContractInstance.methods.requestTokens(selectedToken).send({
        from: account,
      });

      load();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      <div className="text-center">
        <Container className="container">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <br />
              <img
                src={banner}
                alt="Banner"
                style={{ width: "auto", height: "auto" }}
              />
              <br />
              <img
                src={testFaucet}
                alt="test-faucet"
                style={{ width: "auto", height: "auto" }}
              />
              <br />
              <p className="text-center" style={{ color: "white" }}>
                ----------------------------------------------------------------------------------------------------
              </p>

              <p className="text-center">
                <a style={{ color: "#742525" }}>Your Address:{"  "}</a>
                <a style={{ color: "#cc8e08" }}>{account}</a>
              </p>
              <p className="text-center">
                <a style={{ color: "#742525" }}>Faucet Address:{"  "}</a>
                <a style={{ color: "#cc8e08" }}>{faucetAddress}</a>
              </p>
              <p className="text-center" style={{ color: "#cc8e08" }}>
                Install MetaMask 🦊 and switch to the Sepolia Network
              </p>
              <br />
              <Card className="text-center" style={{ color: "grey" }}>
                <Card.Header>
                  ---------- Available tokens ----------
                </Card.Header>

                <ListGroup variant="flush">
                  {tokens.map((token) => (
                    <ListGroup.Item key={token.name}>
                      <a style={{ color: "#742525" }}>
                        {token.name}:{"  "}
                      </a>
                      <a style={{ color: "#cc8e08" }}>{token.address}</a>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>

              <Form>
                <br />
                <Container className="container">
                  <Row className="text-center" style={{ color: "grey" }}>
                    <Form.Group controlId="tokenSelect">
                      <Form.Label>
                        ---------- Select a token ----------
                      </Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedToken}
                        onChange={handleSelect}
                      >
                        <option value=""></option>
                        {tokens.map((token) => (
                          <option key={token.name} value={token.name}>
                            {token.name}:{"  "}
                            {token.symbol}
                          </option>
                        ))}
                      </Form.Control>
                      <br />
                    </Form.Group>
                    <Button
                      variant="warning"
                      onClick={handleRequest}
                      disabled={!selectedToken || loading}
                    >
                      Request Tokens
                    </Button>
                  </Row>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default Faucet;
