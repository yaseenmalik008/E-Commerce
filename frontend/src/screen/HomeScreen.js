import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading, Grid } from '@chakra-ui/react';
import Product from '../Components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Heading as='h2' mb='8' fontSize='3xl'>
        Latest Products
      </Heading>

      <Grid
        templateColumns={{
          sm: '1fr',
          md: '1fr 1fr',
          lg: '1fr 1fr 1fr',
          xl: '1fr 1fr 1fr 1fr',
        }}
        gap='8'
      >
        {products.map((prod) => (
          <Product key={prod._id} product={prod} />
        ))}
      </Grid>
    </div>
  );
};

export default HomeScreen;
