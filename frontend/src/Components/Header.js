import React, { useState } from "react";
import { Flex, Heading, Link, Box, Icon } from "@chakra-ui/react";
import {BsCartPlus,BsFillPersonFill} from "react-icons/bs"
import {HiMenu} from "react-icons/hi"

const Header = () => {
    const [show ,setShow] = useState(false)
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
      py="6"
      px="6"
      bgColor="black"
      w="100%"
      pos="fixed"
      top="0"
      zIndex="99999"
    >
      <Heading
        as="h1"
        color="white"
        fontWeight="bold"
        size="md"
        letterSpacing="md"
      >
        <Link href="/" _hover={{color :"teal.500", textDecor : "none"}}>M&N Store</Link>
      </Heading>
      <Box display={{base : "block",md :"none"}} onClick ={()=>setShow(!show)}>
        <Icon as={HiMenu} color = "white"  w = "4" h="4" />
      </Box>

      <Box display={{base: show ? "block" : "none", md: "flex"}} width = {{base:"full",md : "auto"}}
      mt ={{base:"3", md : "0"}}>
        <Link
        href="/cart"
        fontSize="sm"
        letterSpacing="wide"
        color = "white"
        textTransform="uppercase"
        mr = "5"
        display ="flex"
        alignItems="center"
        fontWeight="bold"
        _hover = {{color : "teal.500"}}

        >
        <Icon as={BsCartPlus}  w = "4" h="4" mr = "1" />
        Cart</Link>
        <Link
        href="/login"
        fontSize="sm"
        letterSpacing="wide"
        color = "white"
        textTransform="uppercase"
        mr = "5"
        display ="flex"
        alignItems="center"
        fontWeight="bold"
        _hover = {{color : "teal.500"}}

        >
           <Icon as={BsFillPersonFill}  w = "4" h="4" mr = "1" />
        Login</Link>
      </Box>
    </Flex>
  );
};

export default Header;
