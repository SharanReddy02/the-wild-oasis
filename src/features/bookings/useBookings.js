import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchparams] = useSearchParams();
  const filterValue = searchparams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchparams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchparams.get("page") ? 1 : Number(searchparams.get("page"));
  const pageSize = Number(searchparams.get("pageSize")) || PAGE_SIZE;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page, pageSize],
    queryFn: () => getBookings({ filter, sortBy, page, pageSize }),
  });

  // PRE_FETCHING
  const pageCount = Math.ceil(count / pageSize);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1, pageSize],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1, pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1, pageSize],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1, pageSize }),
    });

  return { isLoading, bookings, error, count };
}
