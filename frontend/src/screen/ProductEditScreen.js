import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";


const ProductEditScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id: productId } = useParams();

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [countInStock, setCountInStock] = useState('');

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/uploads', formData, config);
			setImage(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			navigate(`/admin/productlist`);
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [dispatch, navigate, productId, product, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		);
	};

  return (
    <>
      <Link as={RouterLink} to="/admin/productlist">
        Go Back
      </Link>

      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            Edit Product
          </Heading>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message type="error">{errorUpdate}</Message>}

          {loading ? (
						<Loader />
					) : error ? (
						<Message type='error'>{error}</Message>
					) : (
						<form onSubmit={submitHandler}>
							{/* NAME */}
							<FormControl id='name' isRequired>
								<FormLabel>Name</FormLabel>
								<Input
									type='text'
									placeholder='Enter name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</FormControl>
							<Spacer h='3' />


             {/* PRICE */}
							<FormControl id='price' isRequired>
								<FormLabel>Price</FormLabel>
								<Input
									type='number'
									placeholder='Enter price'
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</FormControl>
							<Spacer h='3' />

							{/* IMAGE */}
							<FormControl id='image'>
								<FormLabel>Image</FormLabel>
								<Input
									type='text'
									placeholder='Enter image url'
									value={image}
									onChange={(e) => setImage(e.target.value)}
								/>
								<Input
									type='file'
									id='image-file'
									onChange={uploadFileHandler}
								/>
							</FormControl>
							<Spacer h='3' />

              {/* description */}
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <Spacer h="3" />

              {/* brand  */}
              <FormControl id="brand" isRequired>
                <FormLabel>Brand</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </FormControl>

              <Spacer h="3" />

              {/* category  */}

              <FormControl id="category" isRequired>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormControl>

              <Spacer h="3" />

              {/* Count In Stock  */}

              <FormControl id="countInStock" isRequired>
                <FormLabel>Count In Stock</FormLabel>
                <Input
                  type="number"
                  placeholder="Product In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </FormControl>

              <Spacer h="3" />

              <Button
                type="submit"
                isLoading={loading}
                colorScheme="teal"
                mt="4"
              >
                Update
              </Button>
            </form>
          )}
        </FormContainer>
      </Flex>
    </>
  );
};

export default ProductEditScreen;
