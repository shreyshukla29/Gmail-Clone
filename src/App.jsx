import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Inbox from "./components/Inbox";
import Mail from "./components/Mail";
import SendEmail from "./components/SendEmail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />,
      },
      {
        path: "/mail/:id",
        element: <Mail />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-[#f4f4f5] h-screen  
      w-[100%]  overflow-hidden">
      <Navbar />
     <RouterProvider router={router} />
      <div
        className="absolute bottom-20 
      sm:bottom-0 
      flex justify-center w-full 
       sm:left-20  md:left-40 lg:left-80 z-10"
      >
        <SendEmail />
      </div>
    </div>
  );
}

export default App;
