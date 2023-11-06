import { useState } from "react";

function App() {
  const [inputDay, setInputDay] = useState("");
  const [inputMonth, setInputMonth] = useState("");
  const [inputYear, setInputYear] = useState("");
  const [response, setResponse] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [inputValid, setInputValid] = useState(true);
  const [dateValid, setDateValid] = useState(true);
  const [isNumber, setIsNumber] = useState(true);

  function handleSetInputDay(e) {
    setInputDay((input) => e.target.value);
    setFormValid(true);
    setInputValid(true);
    setDateValid(true);
    setIsNumber(true);
  }

  function handleSetInputMonth(e) {
    setInputMonth((input) => e.target.value);
    setFormValid(true);
    setInputValid(true);
    setDateValid(true);
    setIsNumber(true);
  }
  function handleSetInputYear(e) {
    setInputYear((input) => e.target.value);
    setFormValid(true);
    setInputValid(true);
    setDateValid(true);
    setIsNumber(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const dayValue = e.target[0].value;
    const monthValue = e.target[1].value;
    const yearValue = e.target[2].value;

    if (isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue)) {
      console.log("not a number");
      setIsNumber(false);
      setResponse("");
    }

    if (!dayValue || !monthValue || !yearValue) {
      setFormValid(false);
      setResponse("");
    } else if ((dayValue && dayValue < 1) || dayValue > 31) {
      setInputValid(false);
      setResponse("");
    } else if ((monthValue && monthValue < 1) || monthValue > 12) {
      setInputValid(false);
      setResponse("");
    } else if (yearValue && yearValue > new Date().getFullYear()) {
      setInputValid(false);
      setResponse("");
    } else if (
      (monthValue == "4" ||
        monthValue == "6" ||
        monthValue == "9" ||
        monthValue == "11") &&
      dayValue > "30"
    ) {
      setDateValid(false);
      setResponse("");
    } else if (monthValue == "2" && dayValue > "29") {
      setDateValid(false);
      setResponse("");
    } else if (inputValid && dateValid && formValid) {
      const newDate = `${inputYear.padStart(4, "0")}-${inputMonth.padStart(
        2,
        "0"
      )}-${inputDay.padStart(2, "0")}`;
      setResponse((response) => newDate);
      setInputDay("");
      setInputMonth("");
      setInputYear("");
      setInputValid(true);
      setInputValid(true);
      setInputValid(true);
    }
  }

  return (
    <>
      <Main>
        <div className="data">
          <AllInputs onSubmit={handleSubmit}>
            <Input
              id={0}
              placeholder="DD"
              input={inputDay}
              onSetInput={handleSetInputDay}
              formValid={formValid}
              inputValid={inputValid}
              dateValid={dateValid}
              isNumber={isNumber}
            >
              Day
            </Input>
            <Input
              id={1}
              placeholder="MM"
              input={inputMonth}
              onSetInput={handleSetInputMonth}
              formValid={formValid}
              inputValid={inputValid}
              dateValid={dateValid}
              isNumber={isNumber}
            >
              Month
            </Input>
            <Input
              id={2}
              placeholder="YYYY"
              input={inputYear}
              onSetInput={handleSetInputYear}
              formValid={formValid}
              inputValid={inputValid}
              dateValid={dateValid}
              isNumber={isNumber}
            >
              Year
            </Input>
            <Button />
          </AllInputs>
          <Output>
            <Age response={response} />
          </Output>
        </div>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function AllInputs({ children, onSubmit }) {
  return (
    <form className="inputs" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function Input({
  children,
  input,
  onSetInput,
  placeholder,
  formValid,
  inputValid,
  dateValid,
  isNumber,
  id,
}) {
  return (
    <div
      className={`input-form ${inputValid ? "" : "error"} ${
        dateValid ? "" : "error"
      } ${isNumber ? "" : "error"} ${formValid ? "" : "error"}`}
    >
      <label>{children.toUpperCase()}</label>
      <input
        type="text"
        onChange={(e) => onSetInput(e)}
        value={input}
        placeholder={placeholder}
      ></input>
      <span>
        {!formValid && "This field is required"}
        {!inputValid && id === 0 && "Must be a valid day"}
        {!inputValid && id === 1 && "Must be a valid month"}
        {!inputValid && id === 2 && "Must be in the past"}
        {!dateValid && id === 0 && "Must be a valid date"}
      </span>
      <span>{!isNumber && "Input must be a number"}</span>
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

function Age({ response }) {
  const todayObject = new Date();
  const todayFormatted = `${
    1 + todayObject.getMonth()
  }/${todayObject.getDate()}/${todayObject.getFullYear()}`;

  const time =
    response &&
    new Date(todayFormatted).getTime() - new Date(response).getTime();

  const yearCalculated = response && time / (1000 * 60 * 60 * 24) / 365.25;
  const monthCalculated = response && (yearCalculated % 1) * 12;
  const daysCalculated = response && (monthCalculated % 1) * 30.42;

  const years = yearCalculated && parseInt(yearCalculated);
  const months = monthCalculated && parseInt(monthCalculated);
  const days = daysCalculated && parseInt(daysCalculated);

  return years && months && days ? (
    <>
      <p>
        <span>{years}</span>
        {years === 1 ? " year" : " years"}
      </p>
      <p>
        <span>{months}</span>
        {months === 1 ? " month" : " months"}
      </p>
      <p>
        <span>{days}</span>
        {days === 1 ? " day" : " days"}
      </p>
    </>
  ) : (
    <>
      <p>
        <span>- - </span>
        years
      </p>
      <p>
        <span>- - </span>
        months
      </p>
      <p>
        <span>- - </span>
        days
      </p>
    </>
  );
}

export default App;
