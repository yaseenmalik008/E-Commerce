import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Footer from './Components/Footer'
import Header from "./Components/Header"
import HomeScreen from './screen/HomeScreen'
import {Flex} from "@chakra-ui/react"


const App = () => {
  return (
   <BrowserRouter>
    <Header/>
    <Flex 
    as ="main"
    direction="column"
    mt = "72px"
    py = "6"
    px = "6"
    bgColor = "gray.200"
    >

   <Routes>
    <Route  path = "/" element ={<HomeScreen/>}/>
   </Routes>
    </Flex>
    <Footer/>
   </BrowserRouter>
  )
}

export default App