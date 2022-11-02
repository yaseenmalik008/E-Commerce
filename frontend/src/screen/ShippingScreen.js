import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutStep from "../Components/CheckoutStep";
import FormContainer from "../Components/FormContainer";

const ShippingScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
  

	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || ''
	);
	const [country, setCountry] = useState(shippingAddress.country || '');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate('/payment');
	};

	return (
		<Flex w='full' alignItems='center' justifyContent='center' py='5'>
			<FormContainer>
				<CheckoutStep step1 step2 />
				<Heading as='h2' mb='8' fontSize='3xl'>
					Shipping
				</Heading>

				<form onSubmit={submitHandler}>
					{/* Address */}
					<FormControl id='address'>
						<FormLabel htmlFor='address'>Address</FormLabel>
						<Input
							id='address'
							type='text'
							placeholder='Your Address'
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</FormControl>

					<Spacer h='3' />

					{/* City */}
					<FormControl id='city'>
						<FormLabel htmlFor='city'>City</FormLabel>
						<Input
							id='city'
							type='text'
							placeholder='Your City'
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</FormControl>

					<Spacer h='3' />

					{/* Postal Code */}
					<FormControl id='postalCode'>
						<FormLabel htmlFor='postalCode'>Postal Code</FormLabel>
						<Input
							id='postalCode'
							type='text'
							placeholder='Your Postal Code'
							value={postalCode}
							onChange={(e) => setPostalCode(e.target.value)}
						/>
					</FormControl>

					{/* Country */}
					<FormControl id='country'>
						<FormLabel htmlFor='country'>Country</FormLabel>
						<Input
							id='country'
							type='text'
							placeholder='Your Country'
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
					</FormControl>

					<Spacer h='3' />

					<Button type='submit' colorScheme='teal' mt='4'>
						Continue
					</Button>
				</form>
			</FormContainer>
		</Flex>
	);
};

export default ShippingScreen;
