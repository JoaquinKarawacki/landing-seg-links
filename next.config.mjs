/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Default de Next.js es 1MB, muy chico para subir documentos/PDFs/imágenes.
      bodySizeLimit: "25mb",
    },
    // Con un proxy (proxy.js gatea TODO el sitio), Next bufferea el body de la
    // request con un límite APARTE del de serverActions, por defecto 10MB. Sin
    // esto, subir un archivo >10MB corta el body y rompe el multipart
    // ("Unexpected end of form"). Lo igualamos al límite de serverActions.
    proxyClientMaxBodySize: "25mb",
  },
};

export default nextConfig;
