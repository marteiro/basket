import { MAX_ITEM_COUNT } from '../config'

interface IResponse {
    color: string
    department: string
    id: number
    material: string
    price: number
    price_string: string
    product_name: string
    promo_code: string
    uid: string
}

export interface IProduct {
    uid: string,
    name: string,
    price: number,
    quantity: number
}

export interface ICheckoutProduct{
    uid: string,
    quantity: number
}

export const randomShop = async function (qty: number): Promise<IProduct[]> {
    const response = await (fetch(`https://random-data-api.com/api/commerce/random_commerce?size=${qty}`))
    const data = await response.json() as IResponse[]

    return data.map<IProduct>((resProd: IResponse) => (
        {
            uid: resProd.uid,
            name: resProd.product_name,
            price: resProd.price,
            quantity: Math.ceil(Math.random() * MAX_ITEM_COUNT)
        })
    )
}

export const postResults = async function(products: ICheckoutProduct[]):Promise<void>{
    const payload = JSON.stringify(products)
    console.log(payload)
    alert(`Thanks for your Purchase! This page will Reload. \n \n  ${payload}`)
    location.reload()
    // fetch('http://akqa.com/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: ,
    // })
}