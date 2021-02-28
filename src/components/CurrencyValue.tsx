import React from 'react';
import { IProduct } from "src/api/RandomShop";

import './CurrencyValue.scss'

interface IPros {
  symbol: string
  value: number
  code: string
  title: string
}

export default function CurrencyValue({symbol, value, code, title}:IPros) {
  
  return (
    <var title={title} className="CurrencyValue">
      <abbr title={code}>{symbol}</abbr>
      
      &nbsp;{value.toFixed(2)}
    </var>
  )
}