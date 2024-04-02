import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'swif.app',
  appName: 'SWIF',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
