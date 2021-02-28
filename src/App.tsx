import React, { createRef, RefObject, useEffect, useState } from "react";

import ShopItem from "./components/ShopItem";
import MathResult from "./components/MathResult";
import { randomShop, IProduct } from "./api/RandomShop";
import "./App.scss";

interface ITotal {
  subtotal: number;
  vat: number;
  total: number;
}


export default function App() {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [costs, setCosts] = React.useState<number[]>([]);
  const [elRefs, setElRefs] = React.useState<RefObject<ShopItem>[]>([]);
  const [totals, setTotals] = React.useState<ITotal>({
    subtotal: 0,
    vat: 0,
    total: 0
  })

  // fetching data once
  useEffect(() => {
    (async () => {
      const apiProducts = await randomShop(10)
      setElRefs(apiProducts.map((_, i) => createRef()))
      setProducts(apiProducts)
    })()
  }, [])

  // recalculate totals when products costs change
  useEffect(() => {
    const subtotal = elRefs.reduce((sum, ref) => sum + ref.current!.cost, 0)
    const vat = subtotal * 0.2;
    const total = subtotal + vat
    setTotals({ subtotal, vat, total })
  }, [`${costs}`, products])


  // handle change on product cost
  const itemChangeHandler = (value: number, index: number): void => {
    const updatedCosts = [...costs];
    updatedCosts[index] = value;
    setCosts(updatedCosts);
  };

  const itemRemoveHandler = (index: number) => {
    const splicedArray = [...products]
    splicedArray.splice(index, 1)
    setElRefs(splicedArray.map((_, i) => createRef()))
    setProducts(splicedArray)
  }

  return (

    <div className="App">
      <header>
        <img src="/assets/logo-akqa.svg"></img>
      </header>

      <main>
        <section className="info">
          <h1>Your Basket</h1>
          <p>
            Items you have added to your basket are shown below
              <br />
              Adjust the quantities or remove items before continuing your
              purchase
            </p>
        </section>

        <section className="table">
          <div className="tableHead">
            <div>Products</div>
            <div>Price</div>
            <div>Qty</div>
            <div>Cost</div>
          </div>

          <div className="tableBody">
            {products.map((product: IProduct, i: number) => (
              <ShopItem
                {...product}
                ref={elRefs[i]}
                key={product.uid}
                onChange={(value: number) => itemChangeHandler(value, i)}
                onRemove={(value: string) => itemRemoveHandler(i)} />
            ))}
          </div>

          <div className="tableFoot">
            <MathResult title="Subtotal" value={totals.subtotal} />
            <MathResult title="VAT @ 20%" value={totals.vat} />
            <MathResult title="Total Cost" value={totals.total} />
          </div>
        </section>
      </main>
    </div>
  );
}
