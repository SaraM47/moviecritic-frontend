import { useEffect, useState } from "react";

// Custom hook used to delay updating a value until after a specified time
// Useful for search inputs to avoid triggering API calls on every keystroke
export default function useDebounce<T>(value: T, delay: number) {
  // State that stores the debounced version of the value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout that updates the debounced value after the delay

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function clears the timeout if value or delay changes. Prevents outdated updates when the user types quickly
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue; // Return the debounced value
}
