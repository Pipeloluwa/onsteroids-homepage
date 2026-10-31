import { Injectable, signal, computed } from '@angular/core';
import { 
  APP_LINKS_CONFIG, 
  AppLinksConfig, 
  buildDesktopDownloadUrl, 
  buildWebAppLaunchUrl 
} from '../config/app-links.config';

export type OperatingSystem = 'windows' | 'mac' | 'linux' | 'unknown';

export interface DownloadOption {
  os: OperatingSystem;
  osName: string;
  extension: string;
  filename: string;
  architecture: string;
  url: string;
  isPrimaryForDetectedOs: boolean;
  instructions: string;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  /**
   * Reactive configuration state initialized from APP_LINKS_CONFIG.
   * Modify APP_LINKS_CONFIG in src/app/config/app-links.config.ts to permanently change links.
   */
  readonly config = signal<AppLinksConfig>(APP_LINKS_CONFIG);

  readonly version = computed(() => this.config().version);
  readonly webAppRootUrl = computed(() => this.config().webAppRootUrl);
  readonly webAppUrl = computed(() => buildWebAppLaunchUrl(this.config()));
  readonly githubUrl = computed(() => this.config().githubUrl);

  readonly detectedOs = signal<OperatingSystem>(this.detectOperatingSystem());

  readonly isWindows = computed(() => this.detectedOs() === 'windows');
  readonly isMac = computed(() => this.detectedOs() === 'mac');
  readonly isLinux = computed(() => this.detectedOs() === 'linux');

  /**
   * Dedicated direct URLs for all desktop packages hosted in the same root
   * directory where this homepage is hosted.
   */
  readonly windowsExeUrl = computed(() =>
    buildDesktopDownloadUrl(this.config().desktopFiles.windowsInstaller, this.config())
  );

  readonly windowsZipUrl = computed(() =>
    buildDesktopDownloadUrl(this.config().desktopFiles.windowsZip, this.config())
  );

  readonly macDmgUrl = computed(() =>
    buildDesktopDownloadUrl(this.config().desktopFiles.macDmg, this.config())
  );

  readonly linuxTarGzUrl = computed(() =>
    buildDesktopDownloadUrl(this.config().desktopFiles.linuxTarGz, this.config())
  );

  readonly linuxZipUrl = computed(() =>
    buildDesktopDownloadUrl(this.config().desktopFiles.linuxZip, this.config())
  );

  /** Backward-compatible aliases */
  readonly linuxAppImageUrl = this.linuxTarGzUrl;
  readonly linuxDebUrl = this.linuxZipUrl;

  /**
   * Main download options array for primary OS selection cards
   */
  readonly downloadOptions = computed<DownloadOption[]>(() => {
    const currentOs = this.detectedOs();
    const cfg = this.config();

    return [
      {
        os: 'windows',
        osName: 'Windows',
        extension: '.exe',
        filename: cfg.desktopFiles.windowsInstaller,
        architecture: '64-bit (x64)',
        url: this.windowsExeUrl(),
        isPrimaryForDetectedOs: currentOs === 'windows' || currentOs === 'unknown',
        instructions: 'Download the installer, double click to run, and launch OnSteroid from your desktop shortcut.'
      },
      {
        os: 'mac',
        osName: 'macOS',
        extension: '.dmg',
        filename: cfg.desktopFiles.macDmg,
        architecture: 'Universal (Apple Silicon & Intel)',
        url: this.macDmgUrl(),
        isPrimaryForDetectedOs: currentOs === 'mac',
        instructions: 'Open the .dmg file and drag OnSteroid into your Applications folder.'
      },
      {
        os: 'linux',
        osName: 'Linux',
        extension: '.tar.gz',
        filename: cfg.desktopFiles.linuxTarGz,
        architecture: 'x86_64 / amd64',
        url: this.linuxTarGzUrl(),
        isPrimaryForDetectedOs: currentOs === 'linux',
        instructions: 'Extract the standalone archive and run the OnSteroid binary directly.'
      }
    ];
  });

  readonly primaryDownload = computed(() => {
    const options = this.downloadOptions();
    return options.find(o => o.isPrimaryForDetectedOs) || options[0];
  });

  /**
   * Helper method to programmatically change the web app root URL at runtime if needed
   */
  setWebAppRootUrl(newUrl: string): void {
    this.config.update(c => ({ ...c, webAppRootUrl: newUrl }));
  }

  /**
   * Helper method to programmatically change the desktop downloads folder at runtime if needed
   */
  setDesktopDownloadsDirectory(newDir: string): void {
    this.config.update(c => ({ ...c, desktopDownloadsDirectory: newDir }));
  }

  private detectOperatingSystem(): OperatingSystem {
    if (typeof window === 'undefined' || !window.navigator) {
      return 'windows';
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform?.toLowerCase() || '';

    if (platform.includes('win') || userAgent.includes('windows')) {
      return 'windows';
    }
    if (platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os')) {
      return 'mac';
    }
    if (platform.includes('linux') || userAgent.includes('linux') || userAgent.includes('x11')) {
      return 'linux';
    }

    return 'windows';
  }
}
