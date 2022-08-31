import React from "react";
import {Link as RouterLink} from "react-router-dom"
import { Flex, Box, Link, Image, Heading, Text } from "@chakra-ui/react";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Link as={RouterLink} to={`/product/${product._id}`} _hover={{ textDecor: "none" }}>
      <Box maxW="sm"
      borderRadius="lg"
      bgColor = "white"
      transition="all"
      _hover = {{shadow :"md"}}
      >
      
        <Image src={product.image} alt={product.name}  minH ="360px" objectFit="cover" />

        <Flex py ="5" px="4" direction="column" justifyContent="space-between">
          <Heading as = "h4" fontSize="lg" mb ="3"
          >{product.name}</Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Rating value={product.rating} />
            <Text fontSize="2xl" fontWeight="bold" color = "black"
            >₹{product.price}</Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default Product;
