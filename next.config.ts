import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Diğer config ayarların burada kalabilir */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com', // Auth0 profil resimleri için gerekebilir
      },
      {
        protocol: 'https',
        hostname: 'gjcki7akg1hwhwru.public.blob.vercel-storage.com', // Ürün resimlerin için (terminaldeki loglarda gördüm)
      },
    ],
  },
};

export default nextConfig;