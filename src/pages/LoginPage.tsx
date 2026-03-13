import { type FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginThunk } from "../features/auth/authSlice";
import Button from "../features/ui/Button";
import ErrorBox from "../features/ui/ErrorBox";
import toast from "react-hot-toast";

// Login page component
export default function LoginPage() {
  const dispatch = useAppDispatch(); // Get the dispatch function from the Redux store
  const navigate = useNavigate(); // Get the navigate function for programmatic navigation
  const [searchParams] = useSearchParams(); // Get search parameters from the URL

  // Get loading state from auth slice
  const { loading } = useAppSelector((state) => state.auth);

  // Local form state with useState hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Local validation error message
  const [formError, setFormError] = useState<string | null>(null);

  // Redirect user after successful login
  const redirect = searchParams.get("redirect") || "/profile";

  // Handle login form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setFormError(null);

    // Basic client-side validation
    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

    // Dispatch the login thunk and wait for the result
    const resultAction = await dispatch(loginThunk({ email, password }));

    // If login succeeds, show success message and redirect user
    if (loginThunk.fulfilled.match(resultAction)) {
      toast.success("Logged in successfully");
      navigate(redirect, { replace: true });
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      {/* Centered login form */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md mt-30">
          <h1 className="mb-10 text-center text-5xl font-bold">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display form validation error */}
            <ErrorBox message={formError} />

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xl font-semibold"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xl font-semibold"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                variant="secondary"
                disabled={loading}
                className="min-w-40"
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>

          {/* Link to registration page */}
          <p className="mt-8 text-center text-md text-slate-300">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Register here
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
