import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logoutThunk } from "../features/auth/authSlice";
import Button from "../features/ui/Button";

// Profile page showing current user information and account actions
export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get authenticated user from Redux store
  const { user } = useAppSelector((state) => state.auth);

  // Logout current user and redirect to login page
  const handleLogout = async () => {
    await dispatch(logoutThunk()).unwrap();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Profile content */}
      <main className="mx-auto max-w-3xl px-4 py-16 mt-40">
        <h1 className="mb-12 text-center text-5xl font-bold">My profile</h1>

        <div className="space-y-8">
          {/* Display username */}
          <div>
            <label className="mb-2 block text-xl font-semibold">Username</label>
            <div className="input-field text-slate-500">
              {user?.username || "Username"}
            </div>
          </div>

          {/* Display email */}
          <div>
            <label className="mb-2 block text-xl font-semibold">Email</label>
            <div className="input-field text-slate-500">
              {user?.email || "Email"}
            </div>
          </div>

          {/* Profile overview cards */}
          <div className="pt-10">
            <h2 className="mb-6 text-2xl font-semibold">Overview</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-[#e5e5e5] p-6 text-black">
                <h4 className="text-xl font-bold">Reviews</h4>
                <p className="mt-4 text-2xl">12</p>
              </div>

              <div className="bg-[#e5e5e5] p-6 text-black">
                <h4 className="text-xl font-bold">Average rating given</h4>
                <p className="mt-4 text-2xl">7.5/10</p>
              </div>
            </div>
          </div>

          {/* Navigation and logout actions */}
          <div className="flex flex-col gap-4 pt-10 sm:flex-row sm:justify-center sm:gap-8">
            <Button
              onClick={() => navigate("/my-reviews")}
              className="min-w-40"
            >
              My reviews
            </Button>

            <button onClick={handleLogout} className="btn-secondary min-w-40">
              Logout
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
