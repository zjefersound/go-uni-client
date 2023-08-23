import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GoUNI",
    short_name: "GoUNI",
    theme_color: "#059669",
    background_color: "#fff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "icon-72x72.png",
        sizes: "72x72",
      },
      {
        src: "icon-96x96.png",
        sizes: "96x96",
      },
      {
        src: "icon-128x128.png",
        sizes: "128x128",
      },
      {
        src: "icon-144x144.png",
        sizes: "144x144",
      },
      {
        src: "icon-152x152.png",
        sizes: "152x152",
      },
      {
        src: "icon-192x192.png",
        sizes: "192x192",
      },
      {
        src: "icon-256x256.png",
        sizes: "256x256",
      },
      {
        src: "icon-384x384.png",
        sizes: "384x384",
      },
      {
        src: "icon-512x512.png",
        sizes: "512x512",
      },
    ],
  };
}
