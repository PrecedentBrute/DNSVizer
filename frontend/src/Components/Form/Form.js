import React, {useState} from "react";
import "./Form.scss"
import axios from "axios";
import { toast } from 'react-toastify';

const Form = () => {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const checkURL = () => {
        return text.length > 6;
    }
 

  const finalCheck = () => {
    return checkURL();
  }

  const handleSubmit = () => {
    console.log(text);
    const data={
      link:text
    }

    axios.post("https://localhost:5000", {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*"
      },
      data
      })      
      .then((response) => {
          
      })
      .catch((error) => {
          
      })
    setText("");
    
  }
 
    
    return (
      <div className="form-container">
        <input
          type="text"
          placeholder="username"
          onChange={handleChange}
          value={text}
        />
        <div className="rules">
          <ul>
            <li className={checkURL() ? "passed" : "missing"}>
              Enter a valid URL
            </li>
          </ul>
        </div>
        <button disabled={finalCheck() ? false : true} onClick={handleSubmit}> SUBMIT </button>
      </div>
    );
};

export default Form;


