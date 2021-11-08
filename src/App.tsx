import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
export interface IGoal {
  id: number;
  title: string;
  totalAmounth: number;
  moneyByMonth: number;
}
const App: React.FC = () => {
  const [goalDatasList, setGoalDatasList] = useState<IGoal[]>([]);
  const [inputTotalAmounth, setInputTotalAmounth] = useState("1000");
  const [inputMoneyByMonth, setInputMoneyByMonth] = useState("1");
  const [inputTitle, setInputTitle] = useState("");
  const inputGoal = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputGoal.current?.focus();
  }, []);
  function handleChangeTotalAmounth(
    ev: React.ChangeEvent<HTMLInputElement>
  ): void {
    if (Number(ev.target.value) <= 1) return;
    setInputTotalAmounth(ev.target.value);
  }

  function handleChangeByMonth(ev: React.ChangeEvent<HTMLInputElement>): void {
    if (Number(ev.target.value) <= 0) return;
    setInputMoneyByMonth(ev.target.value);
  }

  function handleChangeTitle(ev: React.ChangeEvent<HTMLInputElement>): void {
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
      const newDatas: IGoal = {
        id: Math.random() * 100,
        title: inputTitle,
        moneyByMonth: Number(inputMoneyByMonth),
        totalAmounth: Number(inputTotalAmounth),
      };
      const newGoalsData = [...prevState, newDatas];
      return newGoalsData;
    });
    setInputTitle("");
    setInputTotalAmounth("1000");
    setInputMoneyByMonth("1");
    inputGoal.current?.focus();
  }

  return (
    <>
      <header className="header">
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
          </div>
          <form className="form-input-boxes" onSubmit={handleChangeSubmit}>
            <div className="inpt-boxes">
              <div className="total-input">
                <label>Total Amount</label>
                <div className="totalAmonth">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Dollar sign icon</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 0C12.5523 0 13 0.447715 13 1V23C13 23.5523 12.5523 24 12 24C11.4477 24 11 23.5523 11 23V1C11 0.447715 11.4477 0 12 0Z"
                      fill="#CBD5DC"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.31802 5.31802C7.16193 4.47411 8.30653 4 9.5 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H9.5C8.83696 6 8.20107 6.26339 7.73223 6.73223C7.26339 7.20107 7 7.83696 7 8.5C7 9.16304 7.26339 9.79893 7.73223 10.2678C8.20107 10.7366 8.83696 11 9.5 11H14.5C15.6935 11 16.8381 11.4741 17.682 12.318C18.5259 13.1619 19 14.3065 19 15.5C19 16.6935 18.5259 17.8381 17.682 18.682C16.8381 19.5259 15.6935 20 14.5 20H6C5.44772 20 5 19.5523 5 19C5 18.4477 5.44772 18 6 18H14.5C15.163 18 15.7989 17.7366 16.2678 17.2678C16.7366 16.7989 17 16.163 17 15.5C17 14.837 16.7366 14.2011 16.2678 13.7322C15.7989 13.2634 15.163 13 14.5 13H9.5C8.30653 13 7.16193 12.5259 6.31802 11.682C5.47411 10.8381 5 9.69347 5 8.5C5 7.30653 5.47411 6.16193 6.31802 5.31802Z"
                      fill="#CBD5DC"
                    ></path>
                  </svg>
                  <input
                    type="number"
                    onChange={handleChangeTotalAmounth}
                    value={inputTotalAmounth}
                  />
                </div>
              </div>
              <div className="money-per-month-input">
                <label>Money per Month</label>
                <div className="moneyMonth">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Dollar sign icon</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 0C12.5523 0 13 0.447715 13 1V23C13 23.5523 12.5523 24 12 24C11.4477 24 11 23.5523 11 23V1C11 0.447715 11.4477 0 12 0Z"
                      fill="#CBD5DC"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.31802 5.31802C7.16193 4.47411 8.30653 4 9.5 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H9.5C8.83696 6 8.20107 6.26339 7.73223 6.73223C7.26339 7.20107 7 7.83696 7 8.5C7 9.16304 7.26339 9.79893 7.73223 10.2678C8.20107 10.7366 8.83696 11 9.5 11H14.5C15.6935 11 16.8381 11.4741 17.682 12.318C18.5259 13.1619 19 14.3065 19 15.5C19 16.6935 18.5259 17.8381 17.682 18.682C16.8381 19.5259 15.6935 20 14.5 20H6C5.44772 20 5 19.5523 5 19C5 18.4477 5.44772 18 6 18H14.5C15.163 18 15.7989 17.7366 16.2678 17.2678C16.7366 16.7989 17 16.163 17 15.5C17 14.837 16.7366 14.2011 16.2678 13.7322C15.7989 13.2634 15.163 13 14.5 13H9.5C8.30653 13 7.16193 12.5259 6.31802 11.682C5.47411 10.8381 5 9.69347 5 8.5C5 7.30653 5.47411 6.16193 6.31802 5.31802Z"
                      fill="#CBD5DC"
                    ></path>
                  </svg>
                  <input
                    type="number"
                    onChange={handleChangeByMonth}
                    value={inputMoneyByMonth}
                  ></input>
                </div>
              </div>
            </div>
            <div className="text-box">
              <p>
                {`You're planning $${inputMoneyByMonth} deposits by months, so you are going to reach
              your $${inputTotalAmounth} in ${(
                  Number(inputTotalAmounth) / Number(inputMoneyByMonth)
                ).toFixed(2)} months.`}
              </p>
            </div>
            <div className="button">
              <button>Confirm</button>
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
                        <span>{item.title}</span>
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
