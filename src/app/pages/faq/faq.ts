import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon';
import { DownloadService } from '../../services/download.service';

interface FaqItem {
  readonly id: string;
  readonly category: string;
  readonly question: string;
  readonly answer: string;
}

@Component({
  selector: 'app-faq',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative overflow-x-clip bg-white text-zinc-900">
      <!-- ================================================================= -->
      <!-- PAGE HERO                                                         -->
      <!-- ================================================================= -->
      <section
        class="bleed-under-nav relative isolate overflow-clip pb-14 md:pb-20"
        aria-labelledby="faq-heading"
      >
        <div class="bg-grid mask-radial pointer-events-none absolute inset-0 -z-20" aria-hidden="true"></div>
        <div
          class="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-80 w-full max-w-[50rem] rounded-full bg-brand-500/14 blur-[110px]"
          aria-hidden="true"
        ></div>

        <div class="container-page pt-10 text-center sm:pt-16">
          <span class="eyebrow animate-fade-up">
            <app-icon name="sparkles" class="size-3.5" />
            <span>Clear Answers</span>
          </span>

          <h1
            id="faq-heading"
            class="animate-fade-up mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-zinc-950"
          >
            Frequently Asked <span class="text-gradient-brand">Questions</span>
          </h1>

          <p class="section-lead animate-fade-up mx-auto mt-4 max-w-2xl">
            Everything you need to know about OnSteroid's architecture, local-first security,
            custom encryption scripting, and desktop capabilities.
          </p>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- ACCORDION LIST                                                    -->
      <!-- ================================================================= -->
      <section class="pb-20 md:pb-28" aria-label="Questions and answers">
        <div class="container-page">
          <div class="mx-auto max-w-3xl space-y-3.5">
            @for (item of faqs; track item.id; let idx = $index) {
              <div
                class="card overflow-hidden transition-shadow"
                [class.ring-2]="openIndex() === idx"
                [class.ring-brand-500/40]="openIndex() === idx"
              >
                <h2 class="text-base font-semibold text-zinc-950">
                  <button
                    type="button"
                    (click)="toggleFaq(idx)"
                    [id]="'faq-btn-' + item.id"
                    [attr.aria-expanded]="openIndex() === idx"
                    [attr.aria-controls]="'faq-panel-' + item.id"
                    class="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-zinc-50/80 sm:gap-4 sm:px-6 sm:py-5"
                  >
                    <div class="flex min-w-0 flex-col gap-1">
                      <span class="font-mono text-[11px] font-semibold text-brand-700 uppercase">
                        {{ item.category }}
                      </span>
                      <span class="text-[15px] font-semibold text-zinc-950 sm:text-base">{{ item.question }}</span>
                    </div>
                    <span
                      class="grid size-8 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-600 transition-transform duration-200"
                      [class.rotate-180]="openIndex() === idx"
                      [class.bg-brand-50]="openIndex() === idx"
                      [class.text-brand-700]="openIndex() === idx"
                    >
                      <app-icon name="chevron-down" class="size-4" />
                    </span>
                  </button>
                </h2>

                @if (openIndex() === idx) {
                  <div
                    [id]="'faq-panel-' + item.id"
                    role="region"
                    [attr.aria-labelledby]="'faq-btn-' + item.id"
                    class="border-t border-zinc-200/80 bg-zinc-50/50 px-4 py-4 text-sm leading-relaxed text-zinc-600 sm:px-6 sm:py-5 sm:text-[15px]"
                  >
                    <p>{{ item.answer }}</p>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Still Have Questions Card -->
          <div class="card mx-auto mt-12 max-w-3xl p-6 text-center sm:mt-14 sm:p-10">
            <span class="icon-tile mx-auto">
              <app-icon name="github" class="size-5 text-zinc-900" />
            </span>
            <h2 class="mt-4 text-xl font-semibold tracking-tight text-zinc-950">
              Still have questions or want to request a feature?
            </h2>
            <p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-600">
              OnSteroid is built openly in public. Browse the source code, star the repository, or
              open an issue on GitHub.
            </p>
            <div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                [href]="downloadService.githubUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary btn-lg w-full sm:w-auto"
              >
                <app-icon name="github" class="size-4" />
                <span>Visit GitHub Repository</span>
                <app-icon name="arrow-up-right" class="size-4 text-zinc-500" />
                <span class="sr-only">(opens in a new tab)</span>
              </a>
              <a routerLink="/download" class="btn btn-primary btn-lg w-full sm:w-auto">
                <app-icon name="download" class="size-4" [strokeWidth]="2.2" />
                <span>Download Desktop Client</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class FaqComponent {
  readonly downloadService = inject(DownloadService);

  readonly openIndex = signal<number | null>(0);

  readonly faqs: readonly FaqItem[] = [
    {
      id: 'free-open-source',
      category: 'Licensing & Freedom',
      question: 'Is OnSteroid really 100% free and open source?',
      answer:
        'Yes! OnSteroid is completely free, open-source under the GPL-3.0 copyleft open-source license, and will never force cloud subscriptions, workspace paywalls, or mandatory account registrations. You own your data completely.'
    },
    {
      id: 'desktop-vs-web-why',
      category: 'Runtime Architecture',
      question: 'Why should I download the desktop app first instead of using the web version?',
      answer:
        'The Desktop App runs natively via Electron with direct OS-level HTTP/HTTPS network dispatch. This means zero CORS blocks, direct access to localhost development servers, unrestricted payload memory, self-signed certificate trust, and seamless local file saving. The web version is convenient for quick checks, but browsers impose strict sandbox boundaries that require proxy workarounds for cross-origin targets.'
    },
    {
      id: 'capsule-import',
      category: 'Migration & Import',
      question: 'How can I import and share API capsules across my team?',
      answer:
        'You can import OnSteroid JSON capsule export files, paste a shared capsule URL or share token from a teammate, or import directly from any Swagger / OpenAPI URL. All requests, variables, headers, and attached scripts are mapped into your workspace.'
    },
    {
      id: 'drag-and-drop',
      category: 'Migration & Import',
      question: 'Is drag-and-drop file import supported?',
      answer:
        'Yes! Drag-and-drop JSON file import is supported across both Desktop and Web editions. Simply drag an OnSteroid capsule export JSON file from your file manager into the application window to import it.'
    },
    {
      id: 'privacy-telemetry',
      category: 'Privacy & Security',
      question: 'Does OnSteroid send my API keys or requests to external servers?',
      answer:
        'By default, OnSteroid operates in local-first mode where your collections, secret keys, tokens, and payloads are stored strictly on your local machine. If you choose to log in, you can optionally persist and sync your collections to your authenticated backend database. Dispatched HTTP requests always route directly to your specified API hosts without third-party surveillance, telemetry, or proxy snooping.'
    },
    {
      id: 'encryption-script',
      category: 'Scripting & Encryption',
      question: 'How does the custom encryption script feature work?',
      answer:
        'OnSteroid includes a dedicated Encryption Script section in the Monaco editor. Rather than imposing rigid, predefined encryption checkboxes that may not match your gateway, OnSteroid empowers developers to write custom JavaScript encryption, signature, or hashing logic inside encryptScript() that mutates headers or payload fields right before the request is dispatched over the wire.'
    },
    {
      id: 'swagger-openapi',
      category: 'Migration & Import',
      question: 'Can I import Swagger or OpenAPI specs?',
      answer:
        'Yes! Paste any Swagger UI or OpenAPI 2.0 / 3.0 specification URL into the Import dialog. OnSteroid automatically fetches and parses all endpoints, query parameters, schemas, and example payloads into a clean, ready-to-test capsule.'
    }
  ];

  toggleFaq(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
