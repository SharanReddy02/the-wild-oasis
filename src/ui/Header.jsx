import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { HiMenu } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;

  & div {
    display: flex;
    gap: 2.4rem;
    flex-direction: row;
  }
`;

function Header({ toggleSidebar }) {
  return (
    <StyledHeader>
      <ButtonIcon onClick={toggleSidebar}>
        <HiMenu />
      </ButtonIcon>
      <div>
        <UserAvatar />
        <HeaderMenu />
      </div>
    </StyledHeader>
  );
}

export default Header;
