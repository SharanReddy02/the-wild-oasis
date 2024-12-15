import styled from "styled-components";

import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;

  display: ${({ isSidebarOpen }) => (isSidebarOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 3rem;
`;

function Sidebar({ isSidebarOpen }) {
  return (
    <StyledSidebar isSidebarOpen={isSidebarOpen}>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
