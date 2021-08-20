import SweetAlert from "react-bootstrap-sweetalert";
import {Button} from "react-bulma-components";

function Alert({typeAlert,titleAlert,showAlert,setShowAlert,address}) {
 const hideAlert = () => setShowAlert(false);

 
  
 return (
    <div>
      <SweetAlert show={showAlert} showConfirm={false} type={typeAlert}  title={titleAlert} onConfirm={hideAlert} >
       {typeAlert==='success' && <p>More info are avaiable <a href={`https://etherscan.io/address/${address}`} rel="noreferrer" target="_blank">here</a></p>}
        <div>
        <Button onClick={() => hideAlert()}
              className="App-item"
              rounded="true"
              color={typeAlert}
            >
              Ok
            </Button>
            </div>
      </SweetAlert>
    </div>
  );
}

export default Alert;
