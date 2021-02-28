import React from 'react';
import { IProduct } from "src/api/RandomShop";

import './CurrencyValue.scss'

interface IPros {
  locale: string
  value: number
  code: string
  title: string
}

export default function CurrencyValue({locale,  value, code, title}:IPros) {
  
  const currencyString = value.toLocaleString(locale,{style: 'currency', currency: code})

  return (
    <var title={title} className="CurrencyValue">      
      &nbsp;{currencyString}
    </var>
  )
}