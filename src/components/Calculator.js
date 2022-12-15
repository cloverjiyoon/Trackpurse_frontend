import React from "react";

import "./Calc/Calculator.css";

import Wrapper from "./Calc/Wrapper";
import Screen from "./Calc/Screen";
import ButtonBox from "./Calc/ButtonBox";
import CalcButton from "./Calc/CalcButton";
import CalcProvider from "./context/CalcContext";

export default function Calculator() {
  const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  return (
    <div className="justify-content max-w-xs mx-auto">
      <h1 className="py-4 font-bold text-xl">Calculator</h1>
      <div>
        <CalcProvider>
          <Wrapper>
            <Screen />
            <ButtonBox>
              {btnValues.flat().map((btn, i) => (
                <CalcButton value={btn} key={i} />
              ))}
            </ButtonBox>
          </Wrapper>
        </CalcProvider>
      </div>
    </div>
  );
}
