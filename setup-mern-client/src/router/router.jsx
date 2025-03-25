import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import App from "../App";
  import Home from "../home/Home";
  import Shop from "../shop/Shop";
  import About from "../components/About";
  import Blog from "../components/Blog";
  import SingleBook from "../shop/SingleBook";
  import DashboardLayout from "../dashboard/DashboardLayout";
  import Dashboard from "../dashboard/Dashboard";
  import UploadBook from "../dashboard/UploadBook";
  import ManageBooks from "../dashboard/ManageBooks";
  import EditBooks from "../dashboard/EditBooks";
  import Signup from "../components/Signup";
  import Login from "../components/Login";
  import PrivateRout from "../privateRoute/PrivateRout";
  import Logout from "../components/Logout";
  import ErrorPage from "../components/ErrorPage";
 
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />, 
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/shop",
          element: <Shop />
        },
        {
          path: "/about",
          element: <About />
        },
       
        {
          
          loader: ({ params }) => fetch(`https://setu-mern-server.onrender.com/blog/${params.postId}`)
            .then(res => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
        },
        {
          path: "/shop/:id",
          element: <SingleBook />
        },
        {
          path: "/book/:id",
          element: <SingleBook />,
          loader: ({ params }) => fetch(`https://setu-mern-server.onrender.com/book/${params.id}`)
            .then(res => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
        }
      ]
    },
    {
      path: "/admin/dashboard",
      element: <DashboardLayout />,
      errorElement: <ErrorPage />, 
      children: [
        {
          path: "/admin/dashboard",
          element: <PrivateRout><Dashboard /></PrivateRout>
        },
        {
          path: "/admin/dashboard/upload",
          element: <UploadBook />
        },
        {
          path: "/admin/dashboard/manage",
          element: <ManageBooks />
        },
        {
          path: "/admin/dashboard/edit-books/:id",
          element: <EditBooks />,
          loader: ({ params }) => fetch(`https://setu-mern-server.onrender.com/book/${params.id}`)
            .then(res => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
        }
      ]
    },
    {
      path: "sign-up",
      element: <Signup />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "logout",
      element: <Logout />
    } 
  ]);
  
  export default router;