import React, { useState } from "react";
import CurrencyValue from "./CurrencyValue";

import './MathResult.scss'

interface IProps {
  title: string;
  value: number;
}

const MathResult: React.FC<IProps> = ({ title, value }) => {
  return (
    <fieldset className="MathResult">
      <label>{title}</label>
      <CurrencyValue
        symbol="£"
        value={value}
        title="Price"
        code="GBP" />
    </fieldset>
  );
};

export default MathResult;
