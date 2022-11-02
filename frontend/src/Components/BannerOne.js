import { Flex, Heading, Box, Text, Link, Icon } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

export const HomeBannerOne = () => {
  return (
    <Flex width="auto">
      <Box
        my="0"
        width={{ lg: "100%", md: "100%", base: "100%" }}
        height={{ lg: "400px", md: "2xl", base: "300px" }}
        backgroundImage="url('/images/banner/Banner16.jpg')"
        backgroundSize={{ lg: "", md: "cover", base: "cover" }}
        backgroundPosition={{ lg: "center", md: "center", base: "center" }}
        backgroundRepeat="no-repeat"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading
          mx={{ lg: "8rem", md: "4rem", base: "1rem" }}
          alignContent="center"
          color="white"
          as="h2"
          fontSize={{ lg: "3rem", md: "2rem", base: "2rem" }}
          fontWeight="bold"
          textShadow="1px 1px black"
        >
          New Clothes, <br />
          New Passion.
          <Text
            textShadow="none"
            fontSize={{ lg: "1.5rem", md: "1rem", base: "1rem" }}
          >
            Make people fall in love <br />
            with your clothes.
          </Text>
        </Heading>
        <Box
          p="5"
          display="flex"
          flexDirection="column"
          mx={{ lg: "8rem", md: "4rem", base: "1rem" }}
          w="180px"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            m="2"
            p="2"
            bgColor="black"
            color="white"
            boxShadow="2px 2px white"
            borderRadius="1px"
            _hover={{
              bgColor: "white",
              color: "gray.800",
              boxShadow: "2px 2px black",
            }}
          >
            <Link as={RouterLink} to="/women">
              Shop Women
            </Link>
            <Icon mx="2" w="4" h="4" mr="1" as={AiOutlineArrowRight} />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            m="2"
            p="2"
            bgColor="black"
            color="white"
            boxShadow="2px 2px white"
            _hover={{
              bgColor: "white",
              color: "gray.800",
              boxShadow: "2px 2px black",
            }}
          >
            <Link as={RouterLink} to="/men">
              Shop Men
            </Link>
            <Icon mx="2" w="4" h="4" mr="1" as={AiOutlineArrowRight} />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default HomeBannerOne;
