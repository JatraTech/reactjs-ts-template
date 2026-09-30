/**
 * Side-effect imports so RTK Query injectEndpoints runs before the store uses baseApi.reducer.
 */
import "@/features/about/api/aboutApi";
import "@/features/contact/api/contactApi";
import "@/features/homepage/api/homepageApi";
import "@/features/site-settings/api/siteSettingsApi";
