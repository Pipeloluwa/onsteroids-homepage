import { APP_LINKS_CONFIG, buildDesktopDownloadUrl, buildWebAppLaunchUrl } from '../app/config/app-links.config';

export const environment = {
  production: true,
  version: APP_LINKS_CONFIG.version,
  webAppUrl: buildWebAppLaunchUrl(APP_LINKS_CONFIG),
  githubUrl: APP_LINKS_CONFIG.githubUrl,
  downloads: {
    windowsExe: buildDesktopDownloadUrl(APP_LINKS_CONFIG.desktopFiles.windowsInstaller, APP_LINKS_CONFIG),
    windowsZip: buildDesktopDownloadUrl(APP_LINKS_CONFIG.desktopFiles.windowsZip, APP_LINKS_CONFIG),
    macDmg: buildDesktopDownloadUrl(APP_LINKS_CONFIG.desktopFiles.macDmg, APP_LINKS_CONFIG),
    linuxTarGz: buildDesktopDownloadUrl(APP_LINKS_CONFIG.desktopFiles.linuxTarGz, APP_LINKS_CONFIG),
    linuxZip: buildDesktopDownloadUrl(APP_LINKS_CONFIG.desktopFiles.linuxZip, APP_LINKS_CONFIG)
  }
};
