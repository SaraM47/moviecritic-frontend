import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { registerThunk } from "../features/auth/authSlice";
import Button from "../features/ui/Button";
import ErrorBox from "../features/ui/ErrorBox";
import toast from "react-hot-toast";

// Registration page component
export default function RegisterPage() {
  // Get the dispatch function from the Redux store and navigate function for programmatic navigation
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get loading state from auth slice
  const { loading } = useAppSelector((state) => state.auth);

  // Local form state with useState hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Local validation error message
  const [formError, setFormError] = useState<string | null>(null);

  // Handle registration form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clear previous error
    setFormError(null);

    // If any field is empty, show error message
    if (!username || !email || !password || !confirmPassword) {
      setFormError("All fields are required");
      return;
    }

    // If password and confirm password do not match, show error message
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    // Dispatch the register thunk and wait for the result
    const resultAction = await dispatch(
      registerThunk({ username, email, password })
    );

    // If registration succeeds, redirect user to profile page
    if (registerThunk.fulfilled.match(resultAction)) {
      toast.success("Account created successfully");
      navigate("/profile");
    } else {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      {/* Centered registration form */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md mt-30">
          <h1 className="mb-10 text-center text-5xl font-bold">Register</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display form validation error */}
            <ErrorBox message={formError} />

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-xl font-semibold"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

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

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-xl font-semibold"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                variant="secondary"
                disabled={loading}
                className="min-w-55"
              >
                {loading ? "Loading..." : "Create account"}
              </Button>
            </div>
          </form>

          {/* Link to login page */}
          <p className="mt-8 text-center text-md text-slate-300">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login here
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
