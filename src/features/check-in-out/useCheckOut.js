import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("Failed to check out booking");
    },
  });

  return { checkOut, isCheckingOut };
}
