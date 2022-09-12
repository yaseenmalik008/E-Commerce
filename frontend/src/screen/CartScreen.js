import React from 'react'
import {useParams,useSearchParams} from "react-router-dom"

const CartScreen = () => {
    const {id} = useParams()

    const [searchParams] = useSearchParams()
    const qty = searchParams.get('qty')
  return (
    <div>
<h1>cart Screen</h1>
    </div>
  )
}

export default CartScreen