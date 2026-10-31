import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { APP_LINKS_CONFIG } from '../config/app-links.config';

export interface RouteSeoData {
  readonly title: string;
  readonly description: string;
  readonly keywords: string;
  readonly path: string;
  readonly breadcrumbLabel: string;
  readonly pageType?: 'home' | 'download' | 'features' | 'comparison' | 'docs' | 'faq';
}

const DEFAULT_SEO: RouteSeoData = {
  title: 'OnSteroid — The API Client On Steroids | Fast, Private & Free',
  description:
    'Open-source, high-performance API client with custom manual encryption scripting, sandboxed JavaScript functions, VS Code Monaco editor, and native desktop power without cloud paywalls.',
  keywords:
    'API client, open source API testing, custom encryption script, Monaco editor API client, offline API client, desktop REST client, Swagger OpenAPI import, OnSteroid',
  path: '/',
  breadcrumbLabel: 'Home',
  pageType: 'home'
};

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  initRouteSeoListener(): void {
    this.applyForCurrentRoute();
    const sub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.applyForCurrentRoute();
      });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  updateSeo(seoData: Partial<RouteSeoData>): void {
    const merged: RouteSeoData = {
      ...DEFAULT_SEO,
      ...seoData
    };

    const siteRoot = APP_LINKS_CONFIG.homepageSiteUrl.replace(/\/+$/, '');
    const normalizedPath = merged.path.startsWith('/') ? merged.path : `/${merged.path}`;
    const canonicalUrl = normalizedPath === '/' ? `${siteRoot}/` : `${siteRoot}${normalizedPath}`;
    const ogImageUrl = `${siteRoot}/icons/onsteroids-icon-512.png`;

    // 1. Document Title
    this.title.setTitle(merged.title);

    // 2. Standard SEO Meta Tags
    this.meta.updateTag({ name: 'description', content: merged.description });
    this.meta.updateTag({ name: 'keywords', content: merged.keywords });
    this.meta.updateTag({ name: 'author', content: 'OnSteroid Open Source Team' });
    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    });

    // 3. Open Graph Tags
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'OnSteroid' });
    this.meta.updateTag({ property: 'og:title', content: merged.title });
    this.meta.updateTag({ property: 'og:description', content: merged.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: ogImageUrl });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: 'OnSteroid — High-Performance Open-Source API Client'
    });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    // 4. Twitter / X Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: merged.title });
    this.meta.updateTag({ name: 'twitter:description', content: merged.description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImageUrl });

    // 5. Canonical Link Element
    this.updateCanonicalLink(canonicalUrl);

    // 6. Structured Data (JSON-LD)
    this.updateStructuredData(merged, canonicalUrl, siteRoot, ogImageUrl);
  }

  private applyForCurrentRoute(): void {
    let snapshot: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    let routeSeo: Partial<RouteSeoData> | undefined;

    while (snapshot) {
      if (snapshot.data && snapshot.data['seo']) {
        routeSeo = snapshot.data['seo'] as Partial<RouteSeoData>;
      }
      snapshot = snapshot.firstChild;
    }

    this.updateSeo(routeSeo ?? {});
  }

  private updateCanonicalLink(url: string): void {
    const head = this.doc.head;
    if (!head) return;

    let linkEl = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkEl) {
      linkEl = this.doc.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', url);
  }

  private updateStructuredData(
    seo: RouteSeoData,
    canonicalUrl: string,
    siteRoot: string,
    logoUrl: string
  ): void {
    const head = this.doc.head;
    if (!head) return;

    const softwareSchema: Record<string, unknown> = {
      '@type': 'SoftwareApplication',
      name: 'OnSteroid',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows 10, Windows 11, macOS 11+, Linux (x86_64), Web Browser',
      softwareVersion: APP_LINKS_CONFIG.version,
      url: `${siteRoot}/`,
      downloadUrl: `${siteRoot}/download`,
      image: logoUrl,
      description: seo.description,
      license: 'https://www.gnu.org/licenses/gpl-3.0.html',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      },
      featureList: [
        'Custom manual JavaScript encryption scripting before dispatch',
        'Sandboxed pre-request, post-response, and test script functions',
        'Embedded Microsoft VS Code Monaco Editor with real-time JSON linting',
        'Drag-and-drop JSON capsule, share-link, and OpenAPI/Swagger import',
        'Direct native HTTP/HTTPS desktop engine with zero CORS restrictions',
        '100% local storage with zero cloud paywalls or remote telemetry'
      ]
    };

    const breadcrumbItems: Record<string, unknown>[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteRoot}/`
      }
    ];

    if (seo.path !== '/') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: seo.breadcrumbLabel,
        item: canonicalUrl
      });
    }

    const breadcrumbSchema: Record<string, unknown> = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    };

    const websiteSchema: Record<string, unknown> = {
      '@type': 'WebSite',
      name: 'OnSteroid',
      url: `${siteRoot}/`,
      description: DEFAULT_SEO.description,
      publisher: {
        '@type': 'Organization',
        name: 'OnSteroid',
        url: `${siteRoot}/`,
        logo: {
          '@type': 'ImageObject',
          url: logoUrl
        },
        sameAs: [APP_LINKS_CONFIG.githubUrl]
      }
    };

    const graph: Record<string, unknown>[] = [websiteSchema, softwareSchema, breadcrumbSchema];

    if (seo.pageType === 'faq') {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is OnSteroid really 100% free and open source?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. OnSteroid is completely free and open-source under the GPL-3.0 license with zero cloud paywalls, mandatory logins, or telemetry.'
            }
          },
          {
            '@type': 'Question',
            name: 'Why should I download the desktop app first instead of using the web version?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The native Electron desktop app dispatches HTTP/HTTPS requests directly at the OS level, eliminating browser CORS errors, supporting localhost and self-signed SSL certificates, and providing unrestricted local disk storage.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does the custom encryption script feature work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'OnSteroid provides a dedicated encryptScript function in the Monaco editor where you can write custom JavaScript hashing, HMAC signatures, or payload encryption that mutates headers, query params, or request bodies prior to dispatch.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I import JSON capsules, shared links, and Swagger/OpenAPI specs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. You can drag and drop OnSteroid JSON capsule exports directly into the app window, paste shared capsule links, or import any Swagger/OpenAPI URL to generate ready-to-test capsules.'
            }
          }
        ]
      });
    }

    const payload = {
      '@context': 'https://schema.org',
      '@graph': graph
    };

    let scriptEl = head.querySelector<HTMLScriptElement>('script#onsteroid-jsonld');
    if (!scriptEl) {
      scriptEl = this.doc.createElement('script');
      scriptEl.id = 'onsteroid-jsonld';
      scriptEl.type = 'application/ld+json';
      head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(payload);
  }
}
