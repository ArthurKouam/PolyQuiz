import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import QuizEngine from "./pages/QuizEngine";
import Results from "./pages/Results";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <QuizEngine />,
  },
  {
    path: "/resultats",
    element: <Results />,
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
