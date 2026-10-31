import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DownloadService } from '../../services/download.service';
import { IconComponent } from '../icon/icon';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="relative isolate overflow-clip border-t border-white/[0.08] bg-[#09090B] text-zinc-400">
      <!-- Subtle ambient glow -->
      <div
        class="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-56 w-full max-w-[38rem] rounded-full bg-brand-600/12 blur-[100px]"
        aria-hidden="true"
      ></div>

      <div class="container-page py-12">
        <div class="grid gap-10 lg:grid-cols-12">
          <!-- Brand -->
          <div class="lg:col-span-5">
            <app-logo tone="dark" />
            <p class="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              Privacy-first, local-native API workspace engineered with selective field &amp; header
              encryption locks, Auto-Auth, Trigger request chaining, and an embedded VS Code Monaco
              editor.
            </p>
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <span
                class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-300"
              >
                <span class="size-1.5 rounded-full bg-emerald-400"></span>
                GPL-3.0 Open Source
              </span>
              <span
                class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-300"
              >
                <app-icon name="eye-off" class="size-3.5" />
                Zero Cloud Telemetry
              </span>
            </div>
          </div>

          <!-- Link columns -->
          <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:col-span-7">
            <nav aria-labelledby="footer-product">
              <h2 id="footer-product" class="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
                Product
              </h2>
              <ul class="mt-3.5 space-y-2.5 text-sm">
                <li><a routerLink="/download" class="transition-colors hover:text-white">Download Desktop</a></li>
                <li>
                  <a
                    [href]="downloadService.webAppUrl()"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 transition-colors hover:text-white"
                  >
                    Web Client
                    <app-icon name="arrow-up-right" class="size-3.5" />
                    <span class="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
                <li><a routerLink="/features" class="transition-colors hover:text-white">Features</a></li>
                <li>
                  <a routerLink="/desktop-vs-web" class="transition-colors hover:text-white">Desktop vs Web</a>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-resources">
              <h2 id="footer-resources" class="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
                Resources
              </h2>
              <ul class="mt-3.5 space-y-2.5 text-sm">
                <li><a routerLink="/docs" class="transition-colors hover:text-white">Documentation</a></li>
                <li><a routerLink="/docs" fragment="encryption" class="transition-colors hover:text-white">Encryption Reference</a></li>
                <li><a routerLink="/faq" class="transition-colors hover:text-white">FAQ</a></li>
                <li>
                  <a routerLink="/download" class="transition-colors hover:text-white">
                    Release v{{ downloadService.version() }}
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-community">
              <h2 id="footer-community" class="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
                Community
              </h2>
              <ul class="mt-3.5 space-y-2.5 text-sm">
                <li>
                  <a
                    [href]="downloadService.githubUrl()"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <app-icon name="github" class="size-4" />
                    GitHub Repository
                    <span class="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    [href]="downloadService.githubUrl() + '/issues'"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="transition-colors hover:text-white"
                  >
                    Report an Issue
                    <span class="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    [href]="downloadService.githubUrl() + '/issues'"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="transition-colors hover:text-white"
                  >
                    Request a Feature
                    <span class="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div
          class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-6 text-center text-[13px] text-zinc-500 sm:flex-row sm:text-left"
        >
          <p>© 2026 OnSteroid. Engineered for fast, private API workflows.</p>
          <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <a routerLink="/faq" class="transition-colors hover:text-zinc-300">Privacy</a>
            <a routerLink="/docs" class="transition-colors hover:text-zinc-300">Docs</a>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-zinc-300">
              Sitemap
              <span class="sr-only">(opens in a new tab)</span>
            </a>
            <a
              [href]="downloadService.githubUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-zinc-300"
            >
              Source
              <span class="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly downloadService = inject(DownloadService);
}
