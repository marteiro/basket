import React, { createRef, FormEvent, RefObject, useEffect } from 'react'

import ShopItem from './components/ShopItem'
import MathResult from './components/MathResult'
import { randomShop, IProduct, postResults, ICheckoutProduct } from './api/RandomShop'
import './App.scss'
import TableHead from './components/TableHead'
import { FETCH_N_ITEMS } from './config'

interface ITotal {
    subtotal: number;
    vat: number;
    total: number;
}

export default function App(): JSX.Element {
    const [products, setProducts] = React.useState<IProduct[]>([])
    const [costs, setCosts] = React.useState<number[]>([])
    const [elRefs, setElRefs] = React.useState<RefObject<ShopItem>[]>([])
    const [totals, setTotals] = React.useState<ITotal>({
        subtotal: 0,
        vat: 0,
        total: 0
    })

    // fetching data once
    useEffect(() => {
        (async () => {
            const apiProducts = await randomShop(FETCH_N_ITEMS)
            setElRefs(apiProducts.map(() => createRef()))
            setProducts(apiProducts)
        })()
    }, [])

    // recalculate totals when products costs change
    useEffect(() => {
        const subtotal = elRefs.reduce((sum, ref) =>
            sum + (ref.current ? ref.current.cost : 0)
        , 0)
        const vat = subtotal * 0.2
        const total = subtotal + vat
        setTotals({ subtotal, vat, total })
    }, [`${costs}`, products])

    // handle change on product cost
    const itemChangeHandler = (value: number, index: number): void => {
        const updatedCosts = [...costs]
        updatedCosts[index] = value
        setCosts(updatedCosts)
    }

    // submit results to api
    const itemRemoveHandler = (index: number) => {
        const splicedArray = [...products]
        splicedArray.splice(index, 1)
        setElRefs(splicedArray.map(() => createRef()))
        setProducts(splicedArray)
    }

    const submitResults = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault()

        postResults(
            elRefs.reduce<ICheckoutProduct[]>((acc, ref) => {
                if (!ref.current) { return acc }

                return [...acc, {
                    uid: ref.current.uid,
                    quantity: ref.current.quantity
                }]

            }, [])
        )
    }

    return (

        <div className="App">
            <header>
                <img src="/assets/logo-akqa.svg"></img>
            </header>

            <main>
                <form>
                    <section className="info">
                        <h1>Your Basket</h1>
                        <p>
                            Items you have added to your basket are shown below
                            <br />
                            Adjust the quantities or remove items before continuing yourpurchase
                        </p>
                    </section>

                    <section className="table">
                        <TableHead />

                        {/* Product Loop */}
                        <div className="tableBody">
                            {products.map((product: IProduct, i: number) => (
                                <ShopItem
                                    {...product}
                                    ref={elRefs[i]}
                                    key={product.uid}
                                    onChange={(value: number) => itemChangeHandler(value, i)}
                                    onRemove={() => itemRemoveHandler(i)} />
                            ))}
                        </div>

                        {
                            // Empity Basket Condition 
                            products.length == 0
                                ? (
                                    <strong className="empityCard">
                                        No Products in the Basket, refresh the page to view more items.
                                    </strong>

                                )
                                : (
                                    <>
                                        {/* Subtotal, Vat and Total */}
                                        <div className="tableFoot">
                                            <MathResult title="Subtotal" value={totals.subtotal} />
                                            <MathResult title="VAT @ 20%" value={totals.vat} />
                                            <MathResult title="Total Cost" value={totals.total} />
                                        </div>

                                        {/* No Product Warn */}
                                        <div className="buttonPlacer">
                                            <button type="submit" onClick={submitResults}>Buy Now</button>
                                        </div>
                                    </>
                                )
                        }

                    </section>

                </form>
            </main>

            <footer>
                <small className="footerContent">
                    <strong>
                        2013 AKQA Ltd. 
                    </strong>
                    &nbsp;
                    Registered in England: 2964394
                </small>
            </footer>
        </div>
    )
}
