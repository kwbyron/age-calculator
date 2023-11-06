import { useState } from "react";

function App() {
  const [inputDay, setInputDay] = useState("");
  const [inputMonth, setInputMonth] = useState("");
  const [inputYear, setInputYear] = useState("");
  const [response, setResponse] = useState([]);

  function handleSetInputDay(e) {
    setInputDay((input) => e.target.value);
  }

  function handleSetInputMonth(e) {
    setInputMonth((input) => e.target.value);
  }
  function handleSetInputYear(e) {
    setInputYear((input) => e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newDate = [inputDay, inputMonth, inputYear];
    setResponse((response) => newDate);
    setInputDay("");
    setInputMonth("");
    setInputYear("");
    console.log(response);
  }

  return (
    <>
      <Main>
        <div className="data">
          <AllInputs onSubmit={handleSubmit}>
            <Input input={inputDay} onSetInput={handleSetInputDay}>
              Day
            </Input>
            <Input input={inputMonth} onSetInput={handleSetInputMonth}>
              Month
            </Input>
            <Input input={inputYear} onSetInput={handleSetInputYear}>
              Year
            </Input>
            <Button />
          </AllInputs>
          <Output>
            <Age />
          </Output>
        </div>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function AllInputs({ children }) {
  return (
    <form className="inputs" onSubmit={(e) => onSubmit(e)}>
      {children}
    </form>
  );
}

function Input({ children, input, onSetInput }) {
  return (
    <div className="input-form">
      <label>{children.toUpperCase()}</label>
      <input type="text" onChange={(e) => onSetInput(e)}></input>
    </div>
  );
}

function Button() {
  return (
    <button className="btn-calc-age">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="46"
        height="44"
        viewBox="0 0 46 44"
      >
        <g fill="none" stroke="#FFF" strokeWidth="2">
          <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
        </g>
      </svg>
    </button>
  );
}

function Output({ children }) {
  return <div className="output-items">{children}</div>;
}

function Age() {
  return (
    <>
      <p>
        <span>38</span> years
      </p>
      <p>
        <span>2</span> months
      </p>
      <p>
        <span>26</span> days
      </p>
    </>
  );
}

export default App;
