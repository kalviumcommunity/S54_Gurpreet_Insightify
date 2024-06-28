import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <Box
      p={{ base: 5, md: 8 }}
      bg={"black"}
      maxW="100vw"
      flexDirection={"column"}
      width={"100vw"}
      marginInline="auto"
    >
      <Stack
        spacing={{ base: 8, md: 0 }}
        width={"80vw"}
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
      >
        <Box>
          <Text mt={2} color="white" width={"40vw"} fontSize="md">
            With Insightify, transform feedback into actionable data and elevate
            your understanding of your audience.
          </Text>
        </Box>
        <HStack
          spacing={4}
          display={{ base: "none", sm: "flex" }}
          justifyContent={{ sm: "space-between", md: "normal" }}
        >
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" color={"white"} fontWeight="bold"></Text>
            <VStack spacing={2} alignItems="flex-start" color="white">
              <CustomLink scrollTo="about">About Us</CustomLink>
              <CustomLink scrollTo="faq">FAQ</CustomLink>
            </VStack>
          </VStack>
        </HStack>
      </Stack>

      <Divider my={4} />

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={8}
        justifyContent="space-between"
      >
        <Text fontSize="md" color={"white"}>
          Built by{" "}
          <Link
            href="https://github.com/Max3796"
            textDecoration="none"
            _hover={{ textDecoration: "underline" }}
            isExternal
            aria-label="Gurpreet Singh Ghuman's GitHub"
          >
            Gurpreet Singh Ghuman
          </Link>
        </Text>
        <Stack spacing={2} direction={{ base: "column", md: "row" }}>
          <Button
            leftIcon={<FaGithub />}
            as={Link}
            href="https://github.com/Max3796"
            rounded="md"
            colorScheme="gray"
            aria-label="GitHub Profile"
          >
            GitHub
          </Button>
          <Button
            leftIcon={<CiLinkedin />}
            as={Link}
            href="https://www.linkedin.com/in/gurpreet-singh-ghuman-67363820a/"
            rounded="md"
            color="white"
            bg="blue.700"
            _hover={{ bg: "blue.600" }}
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const CustomLink = ({ children, scrollTo, ...props }) => {
  const handleScroll = () => {
    const section = document.getElementById(scrollTo);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link
      onClick={handleScroll}
      fontSize="sm"
      _hover={{ textDecoration: "underline" }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Footer;