import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./components/RootLayout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ProtectRoute from "./components/ProtectRoute";
import { getCookie } from "./lib/cookies";
import ForgotPassword from "./pages/ForgotPassword";
import CreatePost from "./pages/CreatePost";
import PostUpdate from "./pages/PostUpdate";
import PostDetails from "./pages/PostDetails";

const token = getCookie('token');

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="post-details/:id" element={<PostDetails />} />
        <Route path="profile" element={<ProtectRoute><Profile /></ProtectRoute>} />
        <Route path="create-post" element={<ProtectRoute><CreatePost /></ProtectRoute>} />
        <Route path="post-update/:id" element={<ProtectRoute><PostUpdate /></ProtectRoute>} />
      </Route>

      <Route path="signup" element={token ? <Navigate to='/' /> : <SignUp />} />
      <Route path="signin" element={token ? <Navigate to='/' /> : <SignIn />} />
      <Route path="forgotpassword" element={token ? <Navigate to='/' /> : <ForgotPassword />} />
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
