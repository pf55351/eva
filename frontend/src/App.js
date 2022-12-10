import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bulma/css/bulma.min.css";
import { Form } from "react-bulma-components";
import {
  Button,
  Heading,
  Footer,
  Container,
  Content,
  Hero,
  Block,
  Notification,
} from "react-bulma-components";
import Alert from "./component/Alert";
import { verifyAddressService } from "./services/UtilService";
import Message from "./Message";

function App() {
  const { Input } = Form;
  const [ethAddress, setEthAddress] = useState("");
  const [colorInput, setColorInput] = useState("primary");
  const [errorMsg, setErrorMsg] = useState("");
  const [typeAlert, setTypeAlert] = useState("custom");
  const [titleAlert, setTitleAlert] = useState("");
  const [show, setShow] = useState(false);

  const verifyAddress = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (controlInput(ethAddress)) {
      const data = { ethAddress };
      verifyAddressService(data).then((result) => {
        if (result.res === "OK") {
          setTypeAlert("success");
        } else {
          setTypeAlert("danger");
        }
        setTitleAlert(result.msg);
        setShow(true);
      });
    }
  };

  const controlInput = (addr) => {
    let errorMsg = "";
    let check = true;
    if (addr === "") {
      check = false;
      errorMsg = Message.INPUT_ERROR;
    } else if (addr.length !== 42) {
      check = false;
      errorMsg = Message.INPUT_ERROR_LENGTH;
    }
    if (!check) {
      setErrorMsg(errorMsg);
      setColorInput("danger");
    }
    return check;
  };
  const handleInputChange = (value) => {
    setColorInput("primary");
    setErrorMsg("");
    setEthAddress(value);
  };
  return (
    <>
      <Alert
        showAlert={show}
        typeAlert={typeAlert}
        titleAlert={titleAlert}
        setShowAlert={setShow}
        address={ethAddress}
      />
      <div className="App">
        <Hero size="fullheight">
          <Hero.Header>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Heading>Welcome to EVA</Heading>
              <Heading>Ethereum Verification Address</Heading>
            </header>
          </Hero.Header>
          <Hero.Body>
            <Container className="App-body">
              <Input
                size="medium"
                rounded="true"
                color={colorInput}
                className="App-item"
                value={ethAddress}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Write Ethereum address here"
              />
              {errorMsg !== "" && (
                <Block>
                  <Notification color="danger" light="true">
                    <strong>{errorMsg}</strong>
                  </Notification>
                </Block>
              )}
              <Button
                onClick={(e) => verifyAddress(e)}
                className="App-item"
                size="medium"
                rounded="true"
                color="primary"
              >
                Verify Address
              </Button>
            </Container>
          </Hero.Body>
          <Hero.Footer>
            <Footer>
              <Container>
                <Content>
                  <p>
                    <strong>EVA</strong> by{" "}
                    <a href="https://www.francescoprimerano.it" rel="noreferrer" target="_blank">
                      Francesco Primerano
                    </a>
                    . The source code is licensed under
                    <a href="http://opensource.org/licenses/mit-license.php">
                      {" "}
                      MIT
                    </a>
                  </p>
                  <p>The repository of this project is avaiable on <a href="https://github.com/pf55351/eva" rel="noreferrer" target="_blank">github</a></p>
                </Content>
              </Container>
            </Footer>
          </Hero.Footer>
        </Hero>
      </div>
    </>
  );
}

export default App;
