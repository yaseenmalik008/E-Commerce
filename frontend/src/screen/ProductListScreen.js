import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAdd, IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { deleteProduct, listProducts } from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    //CREATE PRODUCT
  };

  return (
    <>
      <Flex mb="5" alignItems="center" justifyContent="space-between">
        <Heading as="h1" fontSize="3xl" mb="5">
          Product
        </Heading>
        <Button onClick={createProductHandler} colorScheme="teal">
          <Icon as={IoAdd} mr="2" fontSize="xl" fontWeight="bold" /> Create
          Product
        </Button>
      </Flex>

      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box bgColor="white" rounded="lg" shadow="lg" py="5" px="5">
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>PRICE</Th>
                <Th>CATEGORY</Th>
                <Th>BRAND</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr ket={product._id}>
                  <Td>{product._id}</Td>
                  <Td>{product.name}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.category}</Td>
                  <Td>{product.brand}</Td>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="5"
                        as={RouterLink}
                        to={`/admin/product/${product._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <Icon as={IoTrashBinSharp} color="white" size="sm" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};
export default ProductListScreen;
