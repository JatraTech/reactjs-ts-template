import "./load-env.mjs";

const SITE_URL = (process.env.VITE_SITE_URL ?? "https://www.example.com").replace(/\/$/, "");
// const API_BASE_URL = process.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";

export const STATIC_ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.7" },
  { path: "/contact", priority: "0.8" },
];

// Example: dynamic blog routes for sitemap + prerender (requires API at build time).
// export async function fetchBlogRoutes() {
//   try {
//     const response = await fetch(`${API_BASE_URL}/core/blog-posts/?page_size=100`);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return (data.results ?? []).map((post) => ({
//       path: `/blog/${post.slug}`,
//       priority: "0.5",
//       lastmod: post.updated_at ? post.updated_at.slice(0, 10) : undefined,
//     }));
//   } catch {
//     return [];
//   }
// }

export async function getAllRoutes() {
  // const blogRoutes = await fetchBlogRoutes();
  // return [...STATIC_ROUTES, ...blogRoutes];
  return STATIC_ROUTES;
}

export function routeToAbsoluteUrl(path) {
  return `${SITE_URL}${path}`;
}

export { SITE_URL };
