import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await axios.get("http://localhost:6969/faq");
        setFaqData(response.data);
      } catch (error) {
        console.log("Error fetching FAQ data: ", error);
      }
    };

    fetchFaqData();
  }, []);

  return (
    <div>
      <Accordion
        defaultIndex={[0]}
        allowMultiple
        flex="1"
        flexDirection="column"
      >
        {faqData &&
          Array.isArray(faqData) &&
          faqData.map((faqItem, index) => (
            <AccordionItem key={index} flex="1" flexDirection="column">
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    fontWeight={"600"}
                    textAlign="left"
                    flexDirection="column"
                    width="50vw"
                  >
                    {faqItem.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={3} fontSize={"1.5vmax"} width={"50vw"}>
                {faqItem.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default Faq;