import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "309867626887-nk891sugpo6tr3t3ph2j329hs99688nv.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    },
  },
  appId: 'io.ionic.starter',
  appName: 'app-gestion-productos-ionic',
  bundledWebRuntime: false,
  webDir: 'www'
};

export default config;
