import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigateTo = useNavigate();

  // 1. Load the authenticated user.
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is no authenticated user, redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigateTo("/login");
    },
    [isAuthenticated, isLoading, navigateTo]
  );

  // 3.While loading show a spinner.
  if (isLoading)
    <FullPage>
      <Spinner />
    </FullPage>;

  // 4. If there is a user render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
