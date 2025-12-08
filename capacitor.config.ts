import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sch.mathemagic',
  appName: 'Mathemagic',
  webDir: 'public',
  server: {
    "url": "https://school-learning-app.vercel.app",
    "cleartext": false
  }
};

export default config;
