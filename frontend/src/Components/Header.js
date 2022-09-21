import React, { useState } from "react";
import {Link as RouterLink,useNavigate} from "react-router-dom"
import { Flex, Heading, Link, Box,Button, Icon,MenuButton,Menu,MenuList,MenuItem } from "@chakra-ui/react";
import {BsCartPlus,BsFillPersonFill} from "react-icons/bs"
import {HiMenu} from "react-icons/hi"
import {useDispatch,useSelector} from 'react-redux'
import { logout } from "../actions/userAction";
import { IoChevronDown } from 'react-icons/io5';


const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [show ,setShow] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const  logoutHandler = ()=>{
      dispatch((logout()))
      navigate('/')
    }
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
        <Link as ={RouterLink} to="/" _hover={{color :"teal.500", textDecor : "none"}}>M&N Store</Link>
      </Heading>
      <Box display={{base : "block",md :"none"}} onClick ={()=>setShow(!show)}>
        <Icon as={HiMenu} color = "white"  w = "4" h="4" />
      </Box>

      <Box display={{base: show ? "block" : "none", md: "flex"}} width = {{base:"full",md : "auto"}}
      mt ={{base:"3", md : "0"}}>
        <Link as= {RouterLink}
        to="/cart"
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

        {userInfo ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<IoChevronDown />} _hover = {{textdecor:'none' ,opacity : '0.7'}}>
              {userInfo.name}
            </MenuButton>
            <MenuList>
              <MenuItem as = {RouterLink} to= "/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>
              Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link as={RouterLink}
        to="/login"
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
        )}

     
      </Box>
    </Flex>
  );
};

export default Header;
