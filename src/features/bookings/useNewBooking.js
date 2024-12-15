import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useNewBooking() {
  const queryClient = useQueryClient();

  const { mutate: addNewBooking, isLoading: isCreating } = useMutation({
    mutationFn: addBooking,
    onSuccess: () => {
      toast.success("Booking added successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addNewBooking, isCreating };
}
