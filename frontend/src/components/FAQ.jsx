import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const Faq = () => {
  return (
    <div>
      <Accordion defaultIndex={[0]} allowMultiple flex="1" flexDirection="column" >
        <AccordionItem flex="1" flexDirection="column">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" flexDirection="column" width="50vw"  >
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
