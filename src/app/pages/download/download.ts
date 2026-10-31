import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent, IconName } from '../../components/icon/icon';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-download',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative overflow-x-clip bg-white text-zinc-900">
      <!-- ================================================================= -->
      <!-- HERO + DETECTED OS SPOTLIGHT                                      -->
      <!-- ================================================================= -->
      <section
        class="bleed-under-nav relative isolate overflow-clip pb-16 md:pb-24"
        aria-labelledby="download-page-heading"
      >
        <div class="bg-grid mask-radial pointer-events-none absolute inset-0 -z-20" aria-hidden="true"></div>
        <div
          class="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-96 w-full max-w-[56rem] rounded-full bg-brand-500/16 blur-[110px]"
          aria-hidden="true"
        ></div>

        <div class="container-page pt-10 sm:pt-16">
          <div class="mx-auto max-w-2xl text-center">
            <span class="eyebrow animate-fade-up">
              <app-icon name="download" class="size-3.5" />
              <span>Latest Release • v{{ downloadService.version() }}</span>
            </span>

            <h1
              id="download-page-heading"
              class="animate-fade-up mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-zinc-950"
            >
              Download <span class="text-gradient-brand">OnSteroid Desktop</span>
            </h1>

            <p class="section-lead animate-fade-up mt-4">
              Unlock direct OS-level HTTP/HTTPS networking with zero CORS barriers, localhost &amp;
              self-signed SSL support, and unrestricted local disk storage.
            </p>
          </div>

          <!-- Primary Detected OS Spotlight Card -->
          <div class="animate-fade-up mx-auto mt-10 max-w-2xl">
            <div
              class="relative overflow-hidden rounded-3xl bg-linear-to-b from-brand-500/30 via-zinc-950/10 to-zinc-950/5 p-[1.5px] shadow-[0_24px_60px_-20px_rgb(232_83_28/0.22),0_4px_16px_-4px_rgb(9_9_11/0.06)]"
            >
              <div class="relative overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-white p-5 text-center sm:p-9">
                <div
                  class="pointer-events-none absolute -top-20 -right-20 size-52 rounded-full bg-brand-500/10 blur-3xl"
                  aria-hidden="true"
                ></div>

                <div
                  class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-800"
                >
                  <app-icon name="badge-check" class="size-3.5 text-emerald-700" />
                  <span>Detected for Your System</span>
                </div>

                <!-- Official OS Vector Tile -->
                <div class="mx-auto mt-5 grid size-16 place-items-center rounded-2xl border border-zinc-950/[0.08] bg-zinc-50 shadow-xs">
                  <app-icon [name]="detectedOsIcon()" class="size-8 text-zinc-900" />
                </div>

                <h2 class="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                  OnSteroid for {{ downloadService.primaryDownload().osName }}
                </h2>

                <p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
                  {{ downloadService.primaryDownload().instructions }}
                </p>

                <div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    [href]="downloadService.primaryDownload().url"
                    [attr.download]="downloadService.primaryDownload().filename"
                    class="btn btn-primary btn-lg w-full justify-center sm:w-auto"
                  >
                    <app-icon name="download" class="size-4 shrink-0" [strokeWidth]="2.2" />
                    <span>Download {{ downloadService.primaryDownload().filename }}</span>
                  </a>
                </div>

                <div
                  class="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-zinc-950/[0.07] pt-4 text-xs text-zinc-500"
                >
                  <span>
                    Architecture:
                    <strong class="font-medium text-zinc-800">{{ downloadService.primaryDownload().architecture }}</strong>
                  </span>
                  <span class="hidden sm:inline" aria-hidden="true">•</span>
                  <span>SHA-256 Verified</span>
                  <span class="hidden sm:inline" aria-hidden="true">•</span>
                  <span>100% Free &amp; Open Source (GPL-3.0)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- ALL SUPPORTED PLATFORMS GRID                                      -->
      <!-- ================================================================= -->
      <section
        class="border-t border-zinc-950/[0.06] bg-zinc-50/70 py-20 md:py-24"
        aria-labelledby="all-platforms-heading"
      >
        <div class="container-page">
          <div class="mx-auto max-w-2xl text-center">
            <h2 id="all-platforms-heading" class="section-title">
              All Supported <span class="text-gradient-brand">Platforms</span>
            </h2>
            <p class="section-lead mt-3">
              Choose the installer or portable archive that matches your operating system.
            </p>
          </div>

          <div class="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <!-- Windows Card -->
            <article class="card card-hover flex flex-col justify-between p-6 sm:p-7">
              <div>
                <div class="flex items-center justify-between gap-2">
                  <span class="icon-tile">
                    <app-icon name="windows" class="size-5 text-sky-600" />
                  </span>
                  <span class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                    Windows 10 / 11
                  </span>
                </div>
                <h3 class="mt-5 text-xl font-semibold tracking-tight text-zinc-950">Windows</h3>
                <p class="mt-1.5 text-sm leading-relaxed text-zinc-600">
                  64-bit native desktop installer with automatic shortcut creation, plus a zero-install portable archive.
                </p>
                <div class="mt-4 rounded-xl bg-zinc-50 p-3 font-mono text-xs text-zinc-600 ring-1 ring-zinc-200/80">
                  Arch: x64 (64-bit)
                </div>
              </div>

              <div class="mt-6 space-y-2.5">
                <a
                  [href]="downloadService.windowsExeUrl()"
                  [attr.download]="downloadService.config().desktopFiles.windowsInstaller"
                  class="btn btn-primary w-full"
                >
                  <app-icon name="download" class="size-4" [strokeWidth]="2.2" />
                  <span>Download .exe Installer</span>
                </a>
                <a
                  [href]="downloadService.windowsZipUrl()"
                  [attr.download]="downloadService.config().desktopFiles.windowsZip"
                  class="btn btn-secondary w-full"
                >
                  <span>Portable .zip (No Install)</span>
                </a>
              </div>
            </article>

            <!-- macOS Card -->
            <article class="card card-hover flex flex-col justify-between p-6 sm:p-7">
              <div>
                <div class="flex items-center justify-between gap-2">
                  <span class="icon-tile">
                    <app-icon name="apple" class="size-5 text-zinc-900" />
                  </span>
                  <span class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                    macOS 11+
                  </span>
                </div>
                <h3 class="mt-5 text-xl font-semibold tracking-tight text-zinc-950">macOS</h3>
                <p class="mt-1.5 text-sm leading-relaxed text-zinc-600">
                  Universal disk image engineered for both Apple Silicon (M1 / M2 / M3 / M4) and Intel Macs.
                </p>
                <div class="mt-4 rounded-xl bg-zinc-50 p-3 font-mono text-xs text-zinc-600 ring-1 ring-zinc-200/80">
                  Arch: Universal (arm64 + x64)
                </div>
              </div>

              <div class="mt-6 space-y-2.5">
                <a
                  [href]="downloadService.macDmgUrl()"
                  [attr.download]="downloadService.config().desktopFiles.macDmg"
                  class="btn btn-primary w-full"
                >
                  <app-icon name="download" class="size-4" [strokeWidth]="2.2" />
                  <span>Download .dmg (Universal)</span>
                </a>
                <p class="py-2 text-center text-xs text-zinc-500">
                  Drag OnSteroid into Applications to install
                </p>
              </div>
            </article>

            <!-- Linux Card -->
            <article class="card card-hover flex flex-col justify-between p-6 sm:p-7">
              <div>
                <div class="flex items-center justify-between gap-2">
                  <span class="icon-tile">
                    <app-icon name="linux" class="size-5 text-amber-600" />
                  </span>
                  <span class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                    All Distros
                  </span>
                </div>
                <h3 class="mt-5 text-xl font-semibold tracking-tight text-zinc-950">Linux</h3>
                <p class="mt-1.5 text-sm leading-relaxed text-zinc-600">
                  Standalone tarball (.tar.gz) and portable archive (.zip) for Ubuntu, Debian, Fedora, Arch, and x86_64 systems.
                </p>
                <div class="mt-4 rounded-xl bg-zinc-50 p-3 font-mono text-xs text-zinc-600 ring-1 ring-zinc-200/80">
                  Arch: x86_64 / amd64
                </div>
              </div>

              <div class="mt-6 space-y-2.5">
                <a
                  [href]="downloadService.linuxTarGzUrl()"
                  [attr.download]="downloadService.config().desktopFiles.linuxTarGz"
                  class="btn btn-primary w-full"
                >
                  <app-icon name="download" class="size-4" [strokeWidth]="2.2" />
                  <span>Download .tar.gz Package</span>
                </a>
                <a
                  [href]="downloadService.linuxZipUrl()"
                  [attr.download]="downloadService.config().desktopFiles.linuxZip"
                  class="btn btn-secondary w-full"
                >
                  <span>Portable .zip Archive</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- SECONDARY WEB CLIENT & ARCHITECTURE LINK                          -->
      <!-- ================================================================= -->
      <section class="py-20" aria-labelledby="web-option-heading">
        <div class="container-page">
          <div
            class="card mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-9"
          >
            <div>
              <span class="eyebrow">
                <app-icon name="globe" class="size-3.5" />
                <span>Zero-Install Option</span>
              </span>
              <h2 id="web-option-heading" class="mt-3 text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                Want to test directly in your browser without downloading?
              </h2>
              <p class="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-600">
                Launch our lightweight web client immediately inside your browser. Ideal for
                Chromebooks, locked-down workstations, or quick public endpoint checks.
              </p>
            </div>

            <div class="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto">
              <a
                [href]="downloadService.webAppUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-dark btn-lg"
              >
                <span>Launch Web Client</span>
                <app-icon name="arrow-up-right" class="size-4" />
                <span class="sr-only">(opens in a new tab)</span>
              </a>
              <a routerLink="/desktop-vs-web" class="link-arrow justify-center text-xs">
                <span>Compare Desktop vs Web</span>
                <app-icon name="arrow-right" class="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class DownloadComponent {
  readonly downloadService = inject(DownloadService);

  readonly detectedOsIcon = computed<IconName>(() => {
    const os = this.downloadService.primaryDownload().os;
    if (os === 'mac') return 'apple';
    if (os === 'linux') return 'linux';
    return 'windows';
  });
}
