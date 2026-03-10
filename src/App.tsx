import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { useAppDispatch } from "./app/hooks";
import { fetchMe } from "./features/auth/authSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <>
      <AppRouter />
      <Toaster position="top-center" />
    </>
  );
}

export default App;