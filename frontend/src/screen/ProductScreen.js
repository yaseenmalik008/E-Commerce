import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Flex, Grid, Image, Text, Button, Heading } from "@chakra-ui/react";
import Rating from "../Components/Rating";
import products from "../products";

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((prod) => prod._id === id);
  return (
    <>
      <Flex mb="5">
        <Button as={RouterLink} to="/" color="black">
          Go Back
        </Button>
      </Flex>

      <Grid templateColumns="5fr 4fr 3fr" gap="10">
        {/* {column 1}  */}
        <Image src={product.image} alt={product.name} borderRadius="md" />

        {/* column 2 */}
        <Flex direction="column">
          <Heading as="h6" fontSize="base" color="gray.500">
            {product.brand}
          </Heading>
          <Heading as="h2" fontSize="4xl" color="black" mb="2">
            {product.name}
          </Heading>
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />

          <Heading
            as="h5"
            py="5"
            fontWeight="bold"
            fontSize="4xl"
            color="teal.600"
          >
            ₹{product.price}
          </Heading>
          <Text>{product.description}</Text>
        </Flex>

        {/* column 3 */}
        <Flex direction="column">
        <Flex justifyContent="space-between" py = "2">
<Text>Status:</Text>
<Text fontWeight="bold">
{product.countInStock>0 ?" In Stock" : "Out Of Stock"}
</Text>
        </Flex>

<Button
bgColor="grey.200"
textTransform="uppercase"
letterSpacing="wide"
color ="teal"
my = "2"
disabled ={product.countInStock===0}
>
    Add To Cart
</Button>
        </Flex>
      </Grid>
    </>
  );
};

export default ProductScreen;
