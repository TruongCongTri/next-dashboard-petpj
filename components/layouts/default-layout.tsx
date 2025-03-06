'use client'
// Importing necessary components and functions
import { useEffect } from "react"; // importing useEffect hook from react
import { getCookie } from "cookies-next"; // a function to get the value of a cookie
import { useAuthStore } from "@/store/useAuthStore";
// a hook to access the authentication store

// Defining the layout component
export default function Layout({ children }: any) {
  // Getting the token value from a cookie
  const token = getCookie("token");

  // Getting the setAuthentication function from the authentication store
  const setAuthentication = useAuthStore((state) => state.setAuthentication);

  // Running a side effect whenever the token value changes
  useEffect(() => {
    console.log(token); // Logging the token value for debugging purposes
    if (token) {
      setAuthentication(true); // Setting the authentication status to true if a token exists
    }
  }, [token]);

  // Rendering the layout with the Navbar, main content, and Footer components
  return (
    <>
      <main className="mainContent">{children}</main>
    </>
  );
}
