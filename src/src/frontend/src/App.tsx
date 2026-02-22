import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/HomePage";
import { PlatformPage } from "./pages/PlatformPage";

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Toaster />
      <RootLayout />
    </>
  ),
});

// Home page route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// Platform page route
const platformRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/platform/$platformId",
  component: PlatformPage,
});

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute, platformRoute]);

// Create router instance
const router = createRouter({ routeTree });

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
