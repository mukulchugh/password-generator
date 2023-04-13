import { useEffect, useState } from "react";
import StrengthMeter from "./StrengthMeter";
import "./styles.css";

export default function App() {
  const [charLength, setCharLength] = useState(4);
  const [isUpper, setIsUpper] = useState(false);
  const [isLower, setIsLower] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbols, setIsSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [poorPassword, setPoorPassword] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [strongPassword, setStrongPassword] = useState(false);
  const [passwordError, setPasswordErr] = useState("");

  useEffect(() => {
    setPasswordInput(password);
    passwordStrength(password);
  }, [password]);

  const passwordStrength = (passwordin) => {
    const passwordValue = passwordin;
    const passwordLength = passwordValue.length;

    const poorRegExp = /[a-z]/;
    const weakRegExp = /(?=.*?[0-9])/;
    const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
    const whitespaceRegExp = /^$|\s+/;

    const poorPassword = poorRegExp.test(passwordValue);
    const weakPassword = weakRegExp.test(passwordValue);
    const strongPassword = strongRegExp.test(passwordValue);
    const whiteSpace = whitespaceRegExp.test(passwordValue);

    if (passwordValue === "") {
      setPasswordErr("Password is Empty");
    } else {
      // to check whitespace
      if (whiteSpace) {
        setPasswordErr("Whitespaces are not allowed");
      }
      // to check poor password
      if (
        passwordLength <= 3 &&
        (poorPassword || weakPassword || strongPassword)
      ) {
        setPoorPassword(true);
        setPasswordErr("Password is Poor");
      }
      // to check weak password
      if (
        passwordLength >= 4 &&
        poorPassword &&
        (weakPassword || strongPassword)
      ) {
        setWeakPassword(true);
        setPasswordErr("Password is Weak");
      } else {
        setWeakPassword(false);
      }
      // to check strong Password
      if (
        passwordLength >= 6 &&
        poorPassword &&
        weakPassword &&
        strongPassword
      ) {
        setStrongPassword(true);
        setPasswordErr("Password is Strong");
      } else {
        setStrongPassword(false);
      }
    }
  };

  function createPassword() {
    if (!isUpper && !isLower && !isNumber && !isSymbols) {
      alert("Please check at least one box!");
      return;
    }

    let chars = "";
    if (isUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (isNumber) chars += "0123456789";
    if (isSymbols) chars += "!@#$%^&*()";

    let newPassword = "";
    for (let i = 0; i < charLength; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars.charAt(randomIndex);
    }

    setPassword(newPassword);
  }

  function copyPassword() {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  }

  return (
    <div className="App">
      <div
        className="Container"
        style={{
          padding: 0,
          margin: 0
        }}
      >
        <input
          type="text"
          value={password}
          readOnly
          style={{
            width: "451px",
            height: "25px",
            padding: "21px"
          }}
          onInput={(e) => {
            passwordStrength(e);
          }}
        />
        <div onClick={copyPassword}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            width="20px"
            height="auto"
            style={{
              backgroundColor: "transparent"
            }}
            class="svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
            />
          </svg>
        </div>
      </div>
      <div
        className="Container"
        style={{
          width: "451px",
          height: "436px"
        }}
      >
        <div className="flex-between">
          Character Length
          <span className="counter">{charLength}</span>
        </div>
        <input
          type="range"
          min="1"
          max="32"
          class="slider"
          id="myRange"
          value={charLength}
          onChange={(e) => {
            setCharLength(e.target.value);
          }}
        />
        <div className="check-group">
          <span className="flexrow">
            <input
              type="checkbox"
              id="topping"
              name="topping"
              value="Include Uppercase Letter"
              onChange={(e) => setIsUpper(e.target.checked)}
            />
            Include Uppercase Letter
          </span>
          <span className="flexrow">
            <input
              type="checkbox"
              id="topping"
              name="topping"
              value="Include Uppercase Letter"
              onChange={(e) => setIsLower(e.target.checked)}
            />
            Include Lowercase Letter
          </span>
          <span className="flexrow">
            <input
              type="checkbox"
              id="topping"
              name="topping"
              value="Include Uppercase Letter"
              onChange={(e) => setIsNumber(e.target.checked)}
            />
            Include Numbers
          </span>
          <span className="flexrow">
            <input
              type="checkbox"
              id="topping"
              name="isSymbols"
              value="Include Symbols"
              onChange={(e) => setIsSymbols(e.target.checked)}
            />
            Include Symbols
          </span>
        </div>
        <div className="strength-container flex-between">
          STRENGTH
          <StrengthMeter
            poorPassword={poorPassword}
            weakPassword={weakPassword}
            strongPassword={strongPassword}
            passwordError={passwordError}
          />
        </div>
        <button
          className="button"
          onClick={(e) => {
            createPassword();
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
}
