import { Suspense, lazy, type ComponentType, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/shared/layouts/MainLayout";

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" aria-busy="true">
      <span className="sr-only">Loading page</span>
    </div>
  );
}

function lazyPage(loader: () => Promise<{ default: ComponentType }>): ReactNode {
  const Page = lazy(loader);
  return (
    <Suspense fallback={<RouteFallback />}>
      <Page />
    </Suspense>
  );
}

/** Routes are code-split — initial bundle excludes About/Contact page modules. */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: lazyPage(() => import("@/pages/HomePage")) },
      { path: "about", element: lazyPage(() => import("@/pages/AboutPage")) },
      { path: "contact", element: lazyPage(() => import("@/pages/ContactPage")) },
      { path: "*", element: lazyPage(() => import("@/pages/NotFoundPage")) },
    ],
  },
]);
