import React, { useEffect, useRef, useState } from "react";
import InputNumbers from "./Components/Input";
import "./styles.css";
export interface IGoal {
  id: number;
  title: string;
  totalAmounth: string;
  moneyByMonth: string;
}
const App: React.FC = () => {
  const [goalDatasList, setGoalDatasList] = useState<IGoal[]>([]);
  const [inputTotalAmounth, setInputTotalAmounth] = useState("");
  const [inputMoneyByMonth, setInputMoneyByMonth] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [idGoals, setIdGoals] = useState<number | null>(null);

  const inputGoal = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputGoal.current?.focus();
  }, []);

  useEffect(() => {
    function numberWithCommas(x: string) {
      return x.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    let totalAmounth = numberWithCommas(inputTotalAmounth);
    let moneyAmounth = numberWithCommas(inputMoneyByMonth);
    setInputTotalAmounth(totalAmounth);
    setInputMoneyByMonth(moneyAmounth);
  }, [inputTotalAmounth, inputMoneyByMonth]);

  function handleChangeTotalAmounth(
    ev: React.ChangeEvent<HTMLInputElement>
  ): void {
    setInputTotalAmounth(String(Number(ev.target.value) || ""));
  }

  function handleChangeByMonth(ev: React.ChangeEvent<HTMLInputElement>): void {
    setInputMoneyByMonth(String(Number(ev.target.value) || ""));
  }

  function handleChangeTitle(ev: React.ChangeEvent<HTMLInputElement>): void {
    ev.target.value = ev.target.value.replace(/\d/g, "");
    setInputTitle(ev.target.value);
  }

  function handleChangeSubmit(ev: React.FormEvent<HTMLFormElement>): void {
    ev.preventDefault();

    if (!inputTotalAmounth || !inputMoneyByMonth || !inputTitle) {
      alert("Inclua os dados");
      return;
    }
    if (Number(inputMoneyByMonth) > Number(inputTotalAmounth)) {
      alert("Total amounth must be higher than Money per month");
      return;
    }

    setGoalDatasList((prevState) => {
      const allData = prevState.find((it) => it.id === idGoals);
      if (allData) {
        allData.moneyByMonth = inputMoneyByMonth;
        allData.title = inputTitle;
        allData.totalAmounth = inputTotalAmounth;
        setIdGoals(null);
        return [...prevState];
      }
      const newDatas: IGoal = {
        id: Math.random() * 100 + 1,
        title: inputTitle,
        moneyByMonth: inputMoneyByMonth.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        totalAmounth: inputTotalAmounth.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      };
      const newGoalsData = [...prevState, newDatas];
      return newGoalsData;
    });
    setInputTitle("");
    setInputTotalAmounth("");
    setInputMoneyByMonth("");
    inputGoal.current?.focus();
  }

  return (
    <>
      <header className="header">
        <img
          src="https://assets.materialup.com/uploads/729ddd0b-3e18-47ea-a6c4-b9d4ae641f73/preview.png"
          alt=""
        />
        <h1>SavingGoal</h1>
      </header>
      <div className="container">
        <h5>
          Lets play your <strong>saving goal</strong>
        </h5>
        <div className="container-boxes">
          <div className="boxes">
            <h4>Saving Goal</h4>
            <input
              placeholder="Set your goal"
              value={inputTitle}
              onChange={handleChangeTitle}
              ref={inputGoal}
            ></input>
            {idGoals && (
              <button
                onClick={() => {
                  setInputTitle("");
                  setInputTotalAmounth("1000");
                  setInputMoneyByMonth("1");
                }}
              >
                Reset
              </button>
            )}
          </div>
          <form className="form-input-boxes" onSubmit={handleChangeSubmit}>
            <div className="inpt-boxes">
              <div className="total-input">
                <label>Total Amount</label>
                <InputNumbers
                  inputValor={inputTotalAmounth}
                  placeholder={"Set your total amount"}
                  handleChange={handleChangeTotalAmounth}
                />
              </div>
              <div className="money-per-month-input">
                <label>Money per Month</label>
                <InputNumbers
                  inputValor={inputMoneyByMonth}
                  placeholder={"Set your money by month"}
                  handleChange={handleChangeByMonth}
                />
              </div>
            </div>
            <div className="text-box">
              <p>
                {`You're planning`} <strong>{`$${inputMoneyByMonth}`}</strong>{" "}
                {`deposits by months, so you are going to reach
              your`} <strong>{`$${inputTotalAmounth}`}</strong> {`in`} <strong>{`${Math.trunc(
                  Number(inputTotalAmounth) > 0 ? Number(inputTotalAmounth.replace(".", "")) : 1 /
                    Number(inputMoneyByMonth) > 0 ? Number(inputMoneyByMonth.replace(".", "")) : 1
                )} months.`}</strong>
              </p>
            </div>
            <div className="button">
              <button>{!idGoals ? "Confirm" : "Change"}</button>
              
            </div>
          </form>
          <div className="list-boxes">
            {goalDatasList.length === 0 ? (
              <p>No goals</p>
            ) : (
              <div className="task-list">
                <ul>
                  {goalDatasList.map((item) => {
                    return (
                      <li>
                        <span
                          onClick={() => {
                            setInputTitle(item.title);
                            setInputTotalAmounth(String(item.totalAmounth));
                            setInputMoneyByMonth(String(item.moneyByMonth));
                            setIdGoals(item.id);
                          }}
                        >
                          {item.title}
                        </span>
                        <span>
                          {"$"}
                          {item.totalAmounth}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
