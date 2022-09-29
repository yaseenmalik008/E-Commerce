import {
  Flex,
  Box,
  Grid,
  Heading,
  Image,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { getOrderDetails,payOrder } from "../actions/orderActions";
import {PayPalButtons,PayPalScriptProvider} from "@paypal/react-paypal-js"
import Loader from "../Components/Loader";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

import Message from "../Components/Message";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state)=>state.orderPay)
  const {loading : loadingPay, success : successPay} = orderPay

 if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, currVal) => acc + currVal.price * currVal.qty,
      0
    );
  }

  useEffect(() => {
    dispatch({type : ORDER_PAY_RESET})

    if(!order || successPay){
dispatch({type : ORDER_PAY_RESET})
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId,order,successPay]);

  const successPaymentHandler = (paymentResult) =>{
    dispatch(payOrder(orderId,paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ?(
<Message type ='error'>{error}</Message>
  ) : (
    <>
      <Flex w="full" py="5" direction="column">
        <Grid templateColumns="3fr 2fr" gap="20">
          {/* column 1 */}
          <Flex direction="column">
            {/* Shipping */}
            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
                Shipping
              </Heading>
              <Text>
                Name: <strong>{order.user.name}</strong>
              </Text>
              <Text>
                Email:
                <strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </strong>
              </Text>
              <Text>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </Text>
              <Text mt="4">
                {order.isDelivered ? (
                  <Message type="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message type="warning">Not Delivered</Message>
                )}
              </Text>
            </Box>

            {/* Payment Method  */}

            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
                Payment Method
              </Heading>
              <Text>
                <strong>Method:</strong>
                {order.paymentMethod.toUpperCase()}
              </Text>
                {order.isPaid ? (
                  <Message type ='success'>Paid on {order.paidAt.split('T')[0]}</Message>
                ):(
                  <Message type ="warning">Not Paid</Message>
                )}
            </Box>

            {/* Order Items  */}

            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
                Order Items
              </Heading>
              <Box py="2">
                {order.orderItems.map((item, idx) => (
                  <Flex
                    key={idx}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Flex py="2" alignItems="center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        w="12"
                        h="12"
                        objectFit="cover"
                        mr="6"
                      />
                      <Link
                        fontWeight="bold"
                        fontSize="xl"
                        as={RouterLink}
                        to={`/products/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Flex>
                    <Text fontSize="lg" fontWeight="semibold">
                      {item.qty} x ₹{item.price} = ₹{+item.qty * item.price}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Flex>

          {/* Column 2 */}
          <Flex
            direction="column"
            bgColor="white"
            justifyContent="space-between"
            py="8"
            px="8"
            shadow="md"
            rounded="lg"
            borderColor="gray.300"
          >
            <Box>
              <Heading mb="8" as="h2" fontSize="3xl" fontWeight="bold">
                Order Summary
              </Heading>

              {/* item price */}

              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Items</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.itemsPrice}
                </Text>
              </Flex>
              {/* Shipping Price  */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Shipping</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.shippingPrice}
                </Text>
              </Flex>
              {/* Tax Price */}

              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Tax Prcie</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.taxPrice}
                </Text>
              </Flex>
              {/* Total Price */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.200"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Total Price</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.totalPrice}
                </Text>
              </Flex>
            </Box>
            {/* PAYMENT BUTTON */}
            {!order.isPaid && (
              <Box>
                {loadingPay ? (
                  <Loader />
                ) : (
                  <PayPalScriptProvider
                    options={{
                      'client-id':
                        'AUez7rOtHqw0x1r1HibslhPfdAf-u665G7vhlBS_Rwu-R6tNkygRklwX75yRWUGcFnPzu5TLq1wP5nPL',
                      components: 'buttons',
                    }}>
                    <PayPalButtons
                      createOrder={(_, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.totalPrice,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(_, actions) => {
                        return actions.order.capture().then((details) => {
                          const paymentResult = {
                            id: details.id,
                            status: details.status,
                            update_time: details.update_time,
                            email_address: details.email_address,
                          };
                          successPaymentHandler(paymentResult);
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </Box>
            )}
          </Flex>
        </Grid>
      </Flex>
    </>
  );
};

export default OrderScreen;
