import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { DownloadService } from '../../services/download.service';
import { IconComponent } from '../icon/icon';
import { LogoComponent } from '../logo/logo';

interface NavLink {
  readonly label: string;
  readonly path: string;
  readonly exact: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, IconComponent, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'closeMobileMenu()'
  },
  template: `
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3.5 focus:py-1.5 focus:text-xs focus:font-semibold focus:text-zinc-900 focus:shadow-lg"
    >
      Skip to content
    </a>

    <header
      class="fixed inset-x-0 top-0 z-50 border-b transition-all duration-200"
      [class]="
        scrolled() || mobileMenuOpen()
          ? 'border-zinc-200/90 bg-white/92 shadow-[0_1px_3px_rgb(9_9_11/0.04)] backdrop-blur-xl'
          : 'border-zinc-200/60 bg-white/80 backdrop-blur-md'
      "
    >
      <div class="container-page flex h-[60px] items-center justify-between gap-2 sm:gap-4">
        <!-- Left: Brand + Primary Nav Links -->
        <div class="flex min-w-0 items-center gap-4 lg:gap-7">
          <div class="flex shrink-0 items-center gap-2">
            <app-logo />
            <span
              class="hidden rounded-md border border-brand-200 bg-brand-50 px-2 py-0.5 font-mono text-xs font-semibold text-brand-700 xl:inline-block"
            >
              v{{ downloadService.version() }}
            </span>
          </div>

          <nav aria-label="Main" class="hidden md:block">
            <ul class="flex items-center gap-0.5 lg:gap-1 text-[13.5px] lg:text-sm font-medium">
              @for (link of links; track link.path) {
                <li>
                  <a
                    [routerLink]="link.path"
                    routerLinkActive="!text-brand-700 bg-brand-50/70 font-semibold"
                    #rla="routerLinkActive"
                    [routerLinkActiveOptions]="{ exact: link.exact }"
                    [attr.aria-current]="rla.isActive ? 'page' : null"
                    class="rounded-lg px-2.5 py-1.5 whitespace-nowrap text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 lg:px-3"
                  >
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </nav>
        </div>

        <!-- Right: GitHub + Web App + Download CTA -->
        <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            [href]="downloadService.githubUrl()"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white px-3 py-1.5 text-[13px] font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 xl:inline-flex"
            title="View Open-Source Repository on GitHub"
          >
            <app-icon name="github" class="size-4" />
            <span>Open Source</span>
            <span class="sr-only">(opens in a new tab)</span>
          </a>

          <a
            [href]="downloadService.webAppUrl()"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary btn-sm hidden lg:inline-flex"
          >
            <app-icon name="globe" class="size-3.5 text-brand-600" />
            <span>Launch Web App</span>
            <app-icon name="arrow-up-right" class="size-3 text-zinc-400" />
            <span class="sr-only">(opens in a new tab)</span>
          </a>

          <a routerLink="/download" class="btn btn-primary btn-sm">
            <app-icon name="download" class="size-3.5" [strokeWidth]="2.2" />
            <span class="hidden sm:inline">Download App</span>
            <span class="sm:hidden">Get App</span>
          </a>

          <!-- Mobile menu button -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="grid size-9 shrink-0 place-items-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-controls="mobile-menu"
          >
            <app-icon [name]="mobileMenuOpen() ? 'x' : 'menu'" class="size-4" />
            <span class="sr-only">{{ mobileMenuOpen() ? 'Close menu' : 'Open menu' }}</span>
          </button>
        </div>
      </div>

      <!-- Mobile menu drawer -->
      @if (mobileMenuOpen()) {
        <div
          id="mobile-menu"
          class="animate-fade-in max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-zinc-200/80 bg-white px-4 pb-5 pt-2.5 shadow-xl md:hidden"
        >
          <nav aria-label="Mobile">
            <ul class="flex flex-col space-y-1">
              @for (link of links; track link.path) {
                <li>
                  <a
                    [routerLink]="link.path"
                    routerLinkActive="!text-brand-700 bg-brand-50/70 font-semibold"
                    #mrla="routerLinkActive"
                    [routerLinkActiveOptions]="{ exact: link.exact }"
                    [attr.aria-current]="mrla.isActive ? 'page' : null"
                    class="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    {{ link.label }}
                    <app-icon name="chevron-right" class="size-3.5 text-zinc-400" />
                  </a>
                </li>
              }
            </ul>
          </nav>
          <div class="mt-3 grid grid-cols-1 gap-2 border-t border-zinc-100 pt-3 sm:grid-cols-2">
            <a
              [href]="downloadService.webAppUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-secondary btn-sm w-full justify-center"
            >
              <app-icon name="globe" class="size-3.5 text-brand-600" />
              <span>Launch Web App</span>
              <app-icon name="arrow-up-right" class="size-3.5 text-zinc-500" />
              <span class="sr-only">(opens in a new tab)</span>
            </a>
            <a routerLink="/download" class="btn btn-primary btn-sm w-full justify-center">
              <app-icon name="download" class="size-3.5" [strokeWidth]="2" />
              <span>Download Desktop App</span>
            </a>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  readonly downloadService = inject(DownloadService);
  readonly mobileMenuOpen = signal(false);
  readonly scrolled = signal(false);

  readonly links: readonly NavLink[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Features', path: '/features', exact: false },
    { label: 'Desktop vs Web', path: '/desktop-vs-web', exact: false },
    { label: 'Docs', path: '/docs', exact: false },
    { label: 'FAQ', path: '/faq', exact: false }
  ];

  constructor() {
    const sub = inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.closeMobileMenu());
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
    this.onScroll();
  }

  onScroll(): void {
    if (typeof window === 'undefined') return;
    const isScrolled = window.scrollY > 8;
    if (isScrolled !== this.scrolled()) {
      this.scrolled.set(isScrolled);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
