import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Flex, Grid, Image, Heading, Text, Button } from '@chakra-ui/react';
import Rating from '../Components/Rating';

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Flex mb='5'>
        <Button as={RouterLink} to='/' colorScheme='gray'>
          Go Back
        </Button>
      </Flex>

      <Grid templateColumns='5fr 4fr 3fr' gap='10'>
        {/* Column 1 */}
        <Image src={product.image} alt={product.name} borderRadius='md' />

        {/* Column 2 */}
        <Flex direction='column'>
          <Heading as='h6' fontSize='base' color='gray.500'>
            {product.brand}
          </Heading>
          <Heading as='h2' fontSize='4xl' mb='2'>
            {product.name}
          </Heading>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <Heading
            as='h5'
            my='5'
            fontWeight='bold'
            fontSize='4xl'
            color='teal.600'
          >
            ₹{product.price}
          </Heading>
          <Text>{product.description}</Text>
        </Flex>

        {/* Column 3 */}
        <Flex direction='column'>
          <Flex justifyContent='space-between' py='2'>
            <Text>Price: </Text>
            <Text fontWeight='bold'>₹{product.price}</Text>
          </Flex>
          <Flex justifyContent='space-between' py='2'>
            <Text>Status: </Text>
            <Text fontWeight='bold'>
              {product.countInStock > 0 ? 'In stock' : 'Not available'}
            </Text>
          </Flex>

          <Button
            bgColor='gray.800'
            textTransform='uppercase'
            letterSpacing='wide'
            colorScheme='teal'
            my='2'
            disabled={product.countInStock === 0}
          >
            Add To Cart
          </Button>
        </Flex>
      </Grid>
    </>
  );
};

export default ProductScreen;
