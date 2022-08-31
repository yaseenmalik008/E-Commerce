import React from 'react'
import {Heading,Grid} from "@chakra-ui/react"
import Product from '../Components/Product'
import products from "../products"

const HomeScreen = () => {
  return (
    <>
<Heading as = "h2" mb="8" fontSize="3xl">
    Latest Product
</Heading>

<Grid templateColumns={{sm:'1fr',md:'1fr 1fr', lg:'1fr 1fr 1fr', xl:'1fr 1fr 1fr 1fr' }} gap='8'>
{products.map((prod)=>(
    <Product product ={prod}/>
))}
</Grid>
    </>
  )
}

export default HomeScreen