import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sch.learnapp',
  appName: 'SchLrn-app',
  webDir: 'public',
  server: {
    "url": "https://school-learning-app.vercel.app",
    "cleartext": false
  }
};

export default config;
