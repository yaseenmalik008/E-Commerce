import React from 'react'
import Footer from './Components/Footer'
import Header from "./Components/Header"
import HomeScreen from './screen/HomeScreen'
import {Flex} from "@chakra-ui/react"


const App = () => {
  return (
   <>
    <Header/>
    <Flex 
    as ="main"
    direction="column"
    mt = "72px"
    py = "6"
    px = "6"
    bgColor = "gray.200"
    >

   <HomeScreen/>
    </Flex>
    <Footer/>
   </>
  )
}

export default App