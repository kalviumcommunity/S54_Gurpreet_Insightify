import React, { useState, useEffect } from "react";
import {
  Container,
  Text,
  HStack,
  Flex,
  Box,
  Avatar,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";


const Testimonials = () => {
    const sampleTestimonial = {
        content: "This is a sample testimonial content.",
        image: "sample-image-url",
        username: "John Doe",
      };
      
      return (
        <div>
          
          <Container maxW="5xl" p={{ base: 3, md: 6 }}>
            <Flex direction="column">
              <Box
                p={5}
                bg={useColorModeValue("#232323", "blackAlpha.400")}
                color="white"
                borderTopLeftRadius="lg"
                borderTopRightRadius="lg"
              >
                {sampleTestimonial.content}
              </Box>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                p={5}
                bg={useColorModeValue("white", "white")}
                borderBottomLeftRadius="lg"
                borderBottomRightRadius="lg"
              >
                <HStack spacing={2}>
                  <Avatar name="avatar" src={sampleTestimonial.image} />
                  <Flex direction="row">
                    <Text fontWeight="bold" fontSize="lg">
                      {sampleTestimonial.username}
                    </Text>
                  </Flex>
                </HStack>
                <Icon as={""} w={8} h={8} />
              </Flex>
            </Flex>
          </Container>
        </div>
      );
    }

export default Testimonials;