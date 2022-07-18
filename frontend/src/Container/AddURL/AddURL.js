import React, {useState} from "react";
import "./AddURL.scss";
import { toast } from 'react-toastify';

const AddURL = () => {
  const [link, setLink] = useState("");
  const [ntad, setNtad] = useState("");
  const [dlbadd, setDlbadd] = useState("");
  const [ipad, setIpad] = useState("");

  const validateURL = (text) => {
    let check = true;
        if(text.split(".").length < 3 || text.split(".").length > 4){
            check = false;
            return check;
        }
        text.split(".").forEach(element => {
            if(element.length === 0){
                check = false;
                return check;
            }
        });

        return check;
  }

  const validate = (field) => {
    if (field.split(".").length !== 4 || field.split(".").some(x => isNaN(x))) {
      return false;
    }
    return true;

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !validateURL(link) || !validate(ntad) || !validate(dlbadd) || !validate(ipad) ) {
        toast.error("Please fill valid addresses in all the fields.");
        return;
    }

    if ( ntad===dlbadd || ntad===ipad || dlbadd===ipad ) {
      toast.error("Error in details entered(d).");
      return;
  }

    console.log(link);
    console.log(ntad);
    console.log(dlbadd);
    console.log(ipad);

    const data = {
      link,
      ntad,
      dlbadd,
      ipad
    }

    fetch('http://localhost:3000/set', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json", 'Access-Control-Allow-Origin': "*"}
      })
      .then(response => response.json()) 
      .then(json => {
          if(json?.message !== undefined){
            toast.info(json.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              return;
          }
      })
      .catch(err => {
        toast.error('Network Error! Check your browser console.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log(err);
      });


    setLink("");
    setNtad("");
    setDlbadd("");
    setIpad("");
  };

  const updateLink = (e) => {
    setLink(e.target.value);
  };
  
  const updateNtad = (e) => {
    setNtad(e.target.value);
  };

  const updateDlbadd = (e) => {
    setDlbadd(e.target.value);
  };

  const updateIpad = (e) => {
    setIpad(e.target.value);
  };

  return (
    <div className="addurl">
      <div class="container">
        <h2 className="maintext">Add a new URL</h2>
        <form class="form">
          <fieldset class="form-fieldset ui-input __first">
            <input
              type="text"
              tabindex="0"
              value={link}
              onChange={updateLink}
            />
            <label>
              <span>URL</span>
            </label>
          </fieldset>

          <fieldset class="form-fieldset ui-input __second">
            <input value={ntad} onChange={updateNtad} tabindex="0" />
            <label>
              <span>NET Address</span>
            </label>
          </fieldset>

          <fieldset class="form-fieldset ui-input __second">
            <input value={dlbadd} onChange={updateDlbadd} tabindex="0" />
            <label>
              <span>DLB Address</span>
            </label>
          </fieldset>

          <fieldset class="form-fieldset ui-input __second">
            <input value={ipad} onChange={updateIpad} tabindex="0" />
            <label>
              <span>IP Address</span>
            </label>
          </fieldset>

          <div class="form-footer">
            <button class="btn" onClick={handleSubmit}>Update DNS</button>
          </div>
        </form>
      </div>
   
    </div>
  );
};

export default AddURL;
