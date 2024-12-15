import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const navigateTo = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      navigateTo("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
