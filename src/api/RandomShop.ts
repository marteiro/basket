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

export const randomShop = async function (qty: number): Promise<IProduct[]> {
  const response = await (fetch(`https://random-data-api.com/api/commerce/random_commerce?size=${qty}`))
  const data = await response.json() as IResponse[]

  return data.map<IProduct>((resProd: IResponse) => (
    {
      uid: resProd.uid,
      name: resProd.product_name,
      price: resProd.price,
      quantity: Math.ceil(Math.random() * 5)
    })
  )
}