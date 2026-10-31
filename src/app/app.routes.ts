import { Routes } from '@angular/router';
import { RouteSeoData } from './services/seo.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
    title: 'OnSteroid — The API Client On Steroids | Fast, Private, Free',
    data: {
      seo: {
        title: 'OnSteroid — The API Client On Steroids | Fast, Private, Free',
        description:
          'Open-source, high-performance API client featuring custom manual encryption scripting, sandboxed JavaScript functions, VS Code Monaco editor, drag-and-drop JSON capsule and Swagger import, and zero cloud paywalls.',
        keywords:
          'OnSteroid, API client, REST client, custom encryption script, Monaco editor, open source API testing, desktop API client, Swagger OpenAPI client',
        path: '/',
        breadcrumbLabel: 'Home',
        pageType: 'home'
      } satisfies RouteSeoData
    }
  },
  {
    path: 'download',
    loadComponent: () => import('./pages/download/download').then((m) => m.DownloadComponent),
    title: 'Download OnSteroid Desktop Client (Windows, macOS, Linux)',
    data: {
      seo: {
        title: 'Download OnSteroid Desktop Client (Windows, macOS, Linux)',
        description:
          'Download the standalone OnSteroid Desktop Client for Windows (.exe, .zip), macOS (.dmg Universal), and Linux (.AppImage, .deb). Enjoy native HTTP/HTTPS speed with zero CORS blocks.',
        keywords:
          'Download OnSteroid, API client Windows download, API client macOS Apple Silicon, Linux AppImage REST client, native API client installer',
        path: '/download',
        breadcrumbLabel: 'Download',
        pageType: 'download'
      } satisfies RouteSeoData
    }
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features').then((m) => m.FeaturesComponent),
    title: 'Features — Payload Encryption, Monaco Editor & Sandboxed Scripts | OnSteroid',
    data: {
      seo: {
        title: 'Features — Payload Encryption, Monaco Editor & Sandboxed Scripts | OnSteroid',
        description:
          'Explore OnSteroid capabilities: custom JavaScript pre-dispatch encryption scripting, isolated iframe sandbox test functions, embedded VS Code Monaco editor, and drag-and-drop JSON capsule and Swagger/OpenAPI import.',
        keywords:
          'API payload encryption script, sandboxed pre-request script, Monaco JSON editor, JSON capsule drag and drop import, OpenAPI Swagger client',
        path: '/features',
        breadcrumbLabel: 'Features',
        pageType: 'features'
      } satisfies RouteSeoData
    }
  },
  {
    path: 'desktop-vs-web',
    loadComponent: () =>
      import('./pages/desktop-vs-web/desktop-vs-web').then((m) => m.DesktopVsWebComponent),
    title: 'Desktop vs Web Client — Architectural Comparison | OnSteroid',
    data: {
      seo: {
        title: 'Desktop vs Web Client — Architectural Comparison | OnSteroid',
        description:
          'Compare the OnSteroid Native Electron Desktop App against the Web Browser Client across CORS handling, localhost access, self-signed SSL certificates, and offline storage.',
        keywords:
          'Desktop vs Web API client, bypass CORS desktop REST client, localhost API testing, self-signed SSL API client, Electron API workspace',
        path: '/desktop-vs-web',
        breadcrumbLabel: 'Desktop vs Web',
        pageType: 'comparison'
      } satisfies RouteSeoData
    }
  },
  {
    path: 'docs',
    loadComponent: () => import('./pages/docs/docs').then((m) => m.DocsComponent),
    title: 'Documentation, Scripting Reference & Quickstart | OnSteroid',
    data: {
      seo: {
        title: 'Documentation, Scripting Reference & Quickstart | OnSteroid',
        description:
          'Official OnSteroid developer documentation: quickstart guide, preScript/postScript/testScript sandbox signatures, custom encryptScript hooks, and JSON capsule and Swagger/OpenAPI imports.',
        keywords:
          'OnSteroid documentation, API scripting guide, encryptScript reference, preScript postScript testScript, import Swagger OpenAPI collection guide',
        path: '/docs',
        breadcrumbLabel: 'Documentation',
        pageType: 'docs'
      } satisfies RouteSeoData
    }
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq').then((m) => m.FaqComponent),
    title: 'FAQ — Architecture, Privacy, Licensing & Scripting | OnSteroid',
    data: {
      seo: {
        title: 'FAQ — Architecture, Privacy, Licensing & Scripting | OnSteroid',
        description:
          'Answers to frequently asked questions about OnSteroid open-source GPL-3.0 licensing, local-only credential privacy, desktop vs web architecture, custom encryption scripts, and collection imports.',
        keywords:
          'OnSteroid FAQ, private API client no telemetry, free API client FAQ, open source REST client questions',
        path: '/faq',
        breadcrumbLabel: 'FAQ',
        pageType: 'faq'
      } satisfies RouteSeoData
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
