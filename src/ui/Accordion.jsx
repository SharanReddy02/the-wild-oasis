import styled from "styled-components";
import { useState } from "react";

import Heading from "./Heading";
import Row from "./Row";

const StyledAccordion = styled.fieldset`
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 20px;
  padding: 15px;
  position: relative;
`;

const Legend = styled.legend`
  position: absolute;
  left: 15px;
  top: -15px;
  padding: 0 10px;
  font-weight: bold;
  font-size: 16px;
  background-color: var(--color-grey-0);
`;

const Toggle = styled.p`
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
`;

const EmptyAccordionText = styled.p`
  font-size: 12px;
  padding: 10px;
`;

const Content = styled.div`
  width: inherit;
  padding: 8px 0 0 0;
`;

function Accordion({ children, icon, heading, shortText }) {
  const [toggle, setToggle] = useState(true);
  return (
    <StyledAccordion>
      <Legend>
        <Row type="flex">
          <Heading as="h5">
            {icon}
            {heading}
            <Toggle onClick={() => setToggle((show) => !show)}>
              {toggle ? "-" : "+"}
            </Toggle>
          </Heading>
        </Row>
      </Legend>

      <Content>
        {toggle ? (
          children
        ) : (
          <EmptyAccordionText>{shortText}</EmptyAccordionText>
        )}
      </Content>
    </StyledAccordion>
  );
}

export default Accordion;
