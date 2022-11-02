import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Grid,Spacer } from "@chakra-ui/react";
import Product from "../Components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import CaptionCarousel from "../Components/CaptionCarousel";
import HomeBannerOne from "../Components/BannerOne";
import HomeBannerTwo from "../Components/BannerTwo";


const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <CaptionCarousel />

      <Spacer h="5" />

      <HomeBannerOne/>

<Spacer h= '5'/>

      <Heading as="h2" mb="8" fontSize="3xl">
        Latest Products
      </Heading>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid
          templateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr",
          }}
          gap="8"
        >
          {products.map((prod) => (
            <Product key={prod._id} product={prod} />
          ))}
        </Grid>
      )}

      <HomeBannerTwo/>

    </div>
  );
};

export default HomeScreen;
