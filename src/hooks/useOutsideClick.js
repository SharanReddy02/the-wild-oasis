import { useEffect, useRef } from "react";

export function useOutSideClick(
  handler,
  listenCapturing = true,
  key = "Escape"
) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if ((ref.current && !ref.current.contains(e.target)) || e.key === key)
          handler();
      }

      document.addEventListener("click", handleClick, listenCapturing);
      document.addEventListener("keydown", handleClick, listenCapturing);

      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
        document.removeEventListener("keydown", handleClick, listenCapturing);
      };
    },
    [handler, listenCapturing, key]
  );

  return ref;
}
