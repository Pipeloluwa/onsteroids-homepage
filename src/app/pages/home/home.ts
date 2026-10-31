import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { IconComponent, IconName } from '../../components/icon/icon';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'measureEmbedContainer()'
  },
  templateUrl: './home.html'
})
export class HomeComponent implements AfterViewInit {
  readonly downloadService = inject(DownloadService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  private readonly doc = inject(DOCUMENT);

  readonly embedViewportRef = viewChild<ElementRef<HTMLElement>>('embedViewport');
  readonly tryLiveSectionRef = viewChild<ElementRef<HTMLElement>>('tryLiveSection');

  /**
   * Embedded by default in a proportional Fit-to-Window purview so the entire
   * OnSteroid workspace is visible without scrollbars or chopped-off edges.
   */
  readonly fitToWindow = signal(true);
  readonly containerWidth = signal(1120);

  /**
   *1. `embedShouldMount` becomes `true` only once `#embedViewport` enters the
   *    viewport (via `IntersectionObserver`), so loading the homepage at the top
   *    never triggers background iframe focus/scroll events.
   *2. While the iframe boots and fetches its initial capsules (`!embedBooted()`),
   *    the iframe is rendered inside a `position: fixed; top: 0; left: 0;` layer.
   *    In all browser engines, `Element.scrollIntoView()` inside a `position: fixed`
   *    container at `(0, 0)` cannot scroll the parent `window`. Once boot finishes,
   *    `embedBooted` becomes `true` and the iframe sits directly in `#embedViewport`.
   */
  readonly embedShouldMount = signal(false);
  readonly embedBooted = signal(false);

  private bootSettleTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Responsive virtual desktop resolution rendered inside the iframe so the
   * OnSteroid app's `min-w-[1240px]` workspace has full desktop breathing room
   * and is scaled proportionally into `#embedViewport` with zero clipping or
   * empty bottom bars across mobile, tablet, laptop, and widescreen monitors.
   */
  readonly virtualDesktopWidth = computed<number>(() =>
    this.containerWidth() < 640 ? 1240 : 1280
  );

  readonly virtualDesktopHeight = computed<number>(() => {
    const width = this.containerWidth();
    if (width < 640) {
      return 1080;
    }
    if (width < 1024) {
      return 840;
    }
    return 760;
  });

  readonly isCompactViewport = computed<boolean>(() => this.containerWidth() < 768);

  readonly iframeScale = computed<number>(() => {
    if (!this.fitToWindow()) {
      return 1;
    }
    const width = this.containerWidth();
    if (width <= 0) {
      return 0.75;
    }
    return Math.min(1, Number((width / this.virtualDesktopWidth()).toFixed(4)));
  });

  readonly stageHeightPx = computed<number>(() => {
    const width = this.containerWidth();
    if (!this.fitToWindow()) {
      if (width < 640) return 520;
      if (width < 1024) return 620;
      return 720;
    }
    return Math.max(220, Math.round(this.virtualDesktopHeight() * this.iframeScale()));
  });

  readonly scalePercentage = computed<number>(() => Math.round(this.iframeScale() * 100));

  readonly safeWebAppEmbedUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadService.webAppUrl())
  );

  readonly detectedOsIcon = computed<IconName>(() => {
    const os = this.downloadService.primaryDownload().os;
    if (os === 'mac') return 'apple';
    if (os === 'linux') return 'linux';
    return 'windows';
  });

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    this.measureEmbedContainer();

    const viewportEl = this.embedViewportRef()?.nativeElement;

    if (typeof ResizeObserver !== 'undefined' && viewportEl) {
      const resizeObserver = new ResizeObserver(() => this.measureEmbedContainer());
      resizeObserver.observe(viewportEl);
      this.destroyRef.onDestroy(() => resizeObserver.disconnect());
    }

    if (typeof IntersectionObserver !== 'undefined' && viewportEl) {
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
              this.embedShouldMount.set(true);
              intersectionObserver.disconnect();
              break;
            }
          }
        },
        { threshold: [0.08, 0.25] }
      );
      intersectionObserver.observe(viewportEl);
      this.destroyRef.onDestroy(() => intersectionObserver.disconnect());
    } else {
      this.embedShouldMount.set(true);
    }

    this.destroyRef.onDestroy(() => {
      if (this.bootSettleTimer) {
        clearTimeout(this.bootSettleTimer);
      }
    });
  }

  onIframeLoad(): void {
    this.lockSectionHorizontalScroll();
    if (this.bootSettleTimer) {
      clearTimeout(this.bootSettleTimer);
    }
    // Keep the iframe in its fixed `(0,0)` boot layer for 1.8s after `load` so
    // asynchronous capsule loading and startup `scrollIntoView()` calls inside
    // the remote app complete without ever scrolling the parent window.
    this.bootSettleTimer = setTimeout(() => {
      this.embedBooted.set(true);
      this.lockSectionHorizontalScroll();
    }, 1800);
  }

  resetViewportScroll(event: Event): void {
    const el = event.currentTarget as HTMLElement | null;
    if (el && (el.scrollTop !== 0 || el.scrollLeft !== 0)) {
      el.scrollTop = 0;
      el.scrollLeft = 0;
    }
    this.lockSectionHorizontalScroll();
  }

  resetHorizontalScroll(event: Event): void {
    const el = event.currentTarget as HTMLElement | null;
    if (el && el.scrollLeft !== 0) {
      el.scrollLeft = 0;
    }
    this.lockSectionHorizontalScroll();
  }

  private lockSectionHorizontalScroll(): void {
    const sectionEl = this.tryLiveSectionRef()?.nativeElement;
    if (sectionEl && sectionEl.scrollLeft !== 0) {
      sectionEl.scrollLeft = 0;
    }
    const viewportEl = this.embedViewportRef()?.nativeElement;
    if (viewportEl && (viewportEl.scrollLeft !== 0 || viewportEl.scrollTop !== 0)) {
      viewportEl.scrollLeft = 0;
      viewportEl.scrollTop = 0;
    }
    if (this.doc?.documentElement && this.doc.documentElement.scrollLeft !== 0) {
      this.doc.documentElement.scrollLeft = 0;
    }
    if (this.doc?.body && this.doc.body.scrollLeft !== 0) {
      this.doc.body.scrollLeft = 0;
    }
  }

  scrollToEmbed(event: Event): void {
    event.preventDefault();
    this.embedShouldMount.set(true);
    const target = this.doc?.getElementById('try-live');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  measureEmbedContainer(): void {
    const el = this.embedViewportRef()?.nativeElement;
    if (el && el.clientWidth > 0) {
      this.containerWidth.set(el.clientWidth);
    }
  }

  toggleFitToWindow(): void {
    this.fitToWindow.update((v) => !v);
    this.measureEmbedContainer();
  }
}
