/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Default de Next.js es 1MB, muy chico para subir documentos/PDFs/imágenes.
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
