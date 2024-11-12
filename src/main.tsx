import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import Root from "./routes/Root.tsx";
import Home from "./routes/Home.tsx";
import Pokemon from "./routes/Pokemon.tsx";
import Search from "./routes/Search.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./components/ui/provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient({});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "pokemon/search",
        element: <Search />,
      },
      {
        path: "pokemon/:name",
        element: <Pokemon />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        {/* <App /> */}
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
