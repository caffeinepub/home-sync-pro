import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/HomePage";
import { PlatformPage } from "./pages/PlatformPage";
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <Toaster />
      <RootLayout />
    </AuthProvider>
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

// Login page route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Admin page route (protected)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  ),
});

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute, platformRoute, loginRoute, adminRoute]);

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
