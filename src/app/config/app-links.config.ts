/**
 * ============================================================================
 * ONSTEROID HOSTING & LINKS CONFIGURATION
 * ============================================================================
 * Central place to configure the hosted OnSteroid Homepage URL, Web App URL,
 * and the desktop application download locations.
 *
 * NOTE: The desktop installer/archive files (.exe, .zip, .dmg, .tar.gz) are
 * hosted directly inside the same root directory where this homepage is hosted.
 */

export interface AppLinksConfig {
  /**
   * Canonical URL where this OnSteroid marketing homepage is hosted.
   * Used for SEO canonical links, OpenGraph tags, and JSON-LD structured data.
   */
  homepageSiteUrl: string;

  /**
   * Root URL where the OnSteroid web app is hosted.
   * Examples:
   *  - Production: 'https://app.onsteroid.com'
   *  - Local dev:  'http://localhost:4200'
   */
  webAppRootUrl: string;

  /**
   * Optional subdirectory under the homepage root where desktop app installer
   * files are located. Leave empty ('') when files are placed directly in the
   * same root directory where this homepage is hosted.
   * e.g. ''          -> '/OnSteroid-Setup.exe' (same root as homepage)
   * e.g. 'downloads' -> '/downloads/OnSteroid-Setup.exe'
   */
  desktopDownloadsDirectory: string;

  /**
   * Relative path or route to launch the Web App version.
   * e.g. '/' or '/steroid'
   */
  webAppLaunchPath: string;

  /**
   * Active application release version
   */
  version: string;

  /**
   * Exact file names for each platform's desktop package hosted in the homepage root
   */
  desktopFiles: {
    windowsInstaller: string;
    windowsZip: string;
    macDmg: string;
    linuxTarGz: string;
    linuxZip: string;
  };

  /**
   * Open source GitHub repository URL
   */
  githubUrl: string;
}

export const APP_LINKS_CONFIG: AppLinksConfig = {
  // Canonical domain for this marketing & docs site
  homepageSiteUrl: 'https://onsteroid.com',

  // Hosted Web App URL
  webAppRootUrl: 'https://app.onsteroid.com',

  // 'download' means desktop files are served from '/download/<filename>' under the homepage root in IIS
  desktopDownloadsDirectory: 'download',

  // Path to open the web version
  webAppLaunchPath: '/',

  version: '1.0.0',

  desktopFiles: {
    windowsInstaller: 'OnSteroid-Setup.exe',
    windowsZip: 'OnSteroid-win-x64.zip',
    macDmg: 'OnSteroid.dmg',
    linuxTarGz: 'OnSteroid-linux-x64.tar.gz',
    linuxZip: 'OnSteroid-linux-x64.zip'
  },

  githubUrl: 'https://github.com/Pipeloluwa/post-on-steroids'
};

/**
 * Helper to build the URL for a desktop download file hosted in the same root
 * directory (or optional subdirectory) where this homepage is hosted.
 */
export function buildDesktopDownloadUrl(
  filename: string,
  config: AppLinksConfig = APP_LINKS_CONFIG
): string {
  const cleanFile = filename.replace(/^\/+/, '');
  const dir = config.desktopDownloadsDirectory.replace(/^\/+|\/+$/g, '');
  return dir ? `/${dir}/${cleanFile}` : `/${cleanFile}`;
}

/**
 * Helper to build the full launch URL for the web app
 */
export function buildWebAppLaunchUrl(config: AppLinksConfig = APP_LINKS_CONFIG): string {
  const root = config.webAppRootUrl.replace(/\/+$/, '');
  const path = config.webAppLaunchPath.replace(/^\/+/, '');
  return path ? `${root}/${path}` : root;
}
