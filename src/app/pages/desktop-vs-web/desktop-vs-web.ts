import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-desktop-vs-web',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative overflow-x-clip bg-white text-zinc-900">
      <!-- ================================================================= -->
      <!-- PAGE HERO                                                         -->
      <!-- ================================================================= -->
      <section
        class="bleed-under-nav relative isolate overflow-clip pb-16 md:pb-20"
        aria-labelledby="dvw-heading"
      >
        <div class="bg-grid mask-radial pointer-events-none absolute inset-0 -z-20" aria-hidden="true"></div>
        <div
          class="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-96 w-full max-w-[54rem] rounded-full bg-brand-500/15 blur-[110px]"
          aria-hidden="true"
        ></div>

        <div class="container-page pt-10 text-center sm:pt-16">
          <span class="eyebrow animate-fade-up">
            <app-icon name="monitor" class="size-3.5" />
            <span>Architectural Transparency</span>
          </span>

          <h1
            id="dvw-heading"
            class="animate-fade-up mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-zinc-950"
          >
            Desktop App vs. <span class="text-gradient-brand">Web Client</span>
          </h1>

          <p class="section-lead animate-fade-up mx-auto mt-4 max-w-2xl">
            We build both native desktop and browser-based editions from the same codebase. Here is
            why the <strong class="font-semibold text-zinc-900">Desktop App is our primary recommendation</strong>
            for daily engineering workflows.
          </p>

          <!-- Primary Desktop Recommendation Banner -->
          <div class="animate-fade-up mx-auto mt-10 max-w-3xl text-left">
            <div
              class="flex flex-col items-start justify-between gap-6 rounded-3xl bg-zinc-950 p-6 text-white shadow-[0_24px_60px_-20px_rgb(9_9_11/0.4)] ring-1 ring-white/10 sm:flex-row sm:items-center sm:p-8"
            >
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    class="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30"
                  >
                    Recommended by Default
                  </span>
                  <span class="font-mono text-xs text-zinc-400">Native Electron V8 Runtime</span>
                </div>
                <h2 class="mt-2.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Download Desktop for Unrestricted Network Freedom
                </h2>
                <p class="mt-1 max-w-lg text-sm leading-relaxed text-zinc-400">
                  Zero browser CORS blocks, direct OS-level HTTP/HTTPS dispatch without proxy
                  relays, local self-signed SSL trust, and unlimited local disk storage.
                </p>
              </div>

              <a routerLink="/download" class="btn btn-primary btn-lg w-full shrink-0 justify-center sm:w-auto">
                <app-icon name="download" class="size-4" [strokeWidth]="2.2" />
                <span>Download Desktop App</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- CAPABILITY COMPARISON MATRIX                                      -->
      <!-- ================================================================= -->
      <section class="border-t border-zinc-950/[0.06] bg-zinc-50/70 py-14 sm:py-20" aria-labelledby="matrix-heading">
        <div class="container-page">
          <div class="mx-auto max-w-2xl text-center">
            <h2 id="matrix-heading" class="section-title">
              Side-by-Side <span class="text-gradient-brand">Capability Matrix</span>
            </h2>
            <p class="section-lead mt-3">
              How native OS sockets compare against browser security sandboxes.
            </p>
          </div>

          <!-- Mobile Stacked Comparison Cards (< md) -->
          <div class="mt-8 space-y-4 md:hidden">
            @for (row of comparisonRows; track row.title) {
              <article class="card overflow-hidden p-4">
                <div class="border-b border-zinc-100 pb-3">
                  <h3 class="text-base font-semibold text-zinc-950">{{ row.title }}</h3>
                  <p class="mt-0.5 text-xs text-zinc-500">{{ row.subtitle }}</p>
                </div>
                <div class="mt-3 space-y-2.5 text-xs">
                  <div class="rounded-xl bg-brand-50/60 p-3 ring-1 ring-brand-200/70">
                    <div class="flex items-center justify-between font-semibold text-brand-900">
                      <span>Desktop App</span>
                      <span class="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">Best</span>
                    </div>
                    <div class="mt-1.5 flex items-start gap-2 font-semibold text-emerald-700">
                      <app-icon name="check" class="mt-0.5 size-3.5 shrink-0 text-emerald-600" [strokeWidth]="2.5" />
                      <span>{{ row.desktop }}</span>
                    </div>
                  </div>
                  <div class="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200/80">
                    <div class="font-semibold text-zinc-700">Web Browser Version</div>
                    <div class="mt-1.5 flex items-start gap-2" [class]="row.webPositive ? 'font-medium text-emerald-700' : 'text-zinc-600'">
                      @if (row.webPositive) {
                        <app-icon name="check" class="mt-0.5 size-3.5 shrink-0 text-emerald-600" [strokeWidth]="2.5" />
                      } @else if (row.webWarning) {
                        <app-icon name="alert-triangle" class="mt-0.5 size-3.5 shrink-0 text-amber-600" />
                      }
                      <span>{{ row.web }}</span>
                    </div>
                  </div>
                </div>
              </article>
            }
          </div>

          <!-- Tablet & Desktop Matrix Table (>= md) -->
          <div class="card mx-auto mt-12 hidden max-w-5xl overflow-hidden md:block">
            <div class="overflow-x-auto">
              <table class="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption class="sr-only">
                  Comparison between OnSteroid Desktop App and Web Browser Client across 6 core capabilities
                </caption>
                <thead>
                  <tr class="border-b border-zinc-200 bg-zinc-100/80 text-xs font-semibold tracking-wider text-zinc-600 uppercase">
                    <th scope="col" class="px-6 py-4">Capability</th>
                    <th scope="col" class="w-1/3 bg-brand-50/80 px-6 py-4 text-brand-800">
                      <div class="flex items-center gap-2">
                        <span>Desktop App</span>
                        <span class="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">
                          Best
                        </span>
                      </div>
                    </th>
                    <th scope="col" class="w-1/3 px-6 py-4 text-zinc-700">Web Browser Version</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200/80">
                  <!-- Row 1: CORS -->
                  <tr class="transition-colors hover:bg-zinc-50/80">
                    <th scope="row" class="px-6 py-4 font-normal">
                      <div class="font-semibold text-zinc-950">CORS Restrictions</div>
                      <div class="mt-0.5 text-xs text-zinc-500">Cross-Origin Resource Sharing handling</div>
                    </th>
                    <td class="bg-brand-50/30 px-6 py-4">
                      <div class="flex items-center gap-2 font-semibold text-emerald-700">
                        <app-icon name="check" class="size-4 text-emerald-600" [strokeWidth]="2.5" />
                        <span>Zero CORS issues (Native HTTP/S)</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-xs text-amber-800">
                      <div class="flex items-center gap-2">
                        <app-icon name="alert-triangle" class="size-4 text-amber-600" />
                        <span>Requires proxy relay for restricted origins</span>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 2: Localhost -->
                  <tr class="transition-colors hover:bg-zinc-50/80">
                    <th scope="row" class="px-6 py-4 font-normal">
                      <div class="font-semibold text-zinc-950">Localhost &amp; Intranet APIs</div>
                      <div class="mt-0.5 text-xs text-zinc-500">Direct access to local development servers</div>
                    </th>
                    <td class="bg-brand-50/30 px-6 py-4 font-semibold text-emerald-700">
                      <div class="flex items-center gap-2">
                        <app-icon name="check" class="size-4 text-emerald-600" [strokeWidth]="2.5" />
                        <span>Direct socket to localhost / 127.0.0.1 &amp; VPNs</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-xs text-zinc-600">
                      Direct call allowed when CORS permits; private networks limited by browser rules
                    </td>
                  </tr>

                  <!-- Row 3: Self-Signed SSL -->
                  <tr class="transition-colors hover:bg-zinc-50/80">
                    <th scope="row" class="px-6 py-4 font-normal">
                      <div class="font-semibold text-zinc-950">Self-Signed SSL Certificates</div>
                      <div class="mt-0.5 text-xs text-zinc-500">Development &amp; internal TLS certificates</div>
                    </th>
                    <td class="bg-brand-50/30 px-6 py-4 font-semibold text-emerald-700">
                      <div class="flex items-center gap-2">
                        <app-icon name="check" class="size-4 text-emerald-600" [strokeWidth]="2.5" />
                        <span>Native cert trust override toggle</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-xs text-zinc-600">
                      Constrained by browser TLS authority store
                    </td>
                  </tr>

                  <!-- Row 4: Custom Encryption Scripting -->
                  <tr class="transition-colors hover:bg-zinc-50/80">
                    <th scope="row" class="px-6 py-4 font-normal">
                      <div class="font-semibold text-zinc-950">Custom Encryption Scripting</div>
                      <div class="mt-0.5 text-xs text-zinc-500">Pre-dispatch manual JavaScript transformation</div>
                    </th>
                    <td class="bg-brand-50/30 px-6 py-4 font-semibold text-emerald-700">
                      <div class="flex items-center gap-2">
                        <app-icon name="check" class="size-4 text-emerald-600" [strokeWidth]="2.5" />
                        <span>Monaco Script Editor + isolated sandbox</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-medium text-emerald-700">
                      <div class="flex items-center gap-2">
                        <app-icon name="check" class="size-4 text-emerald-600" [strokeWidth]="2.5" />
                        <span>Monaco Script Editor + isolated sandbox</span>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 5: Drag & Drop Import -->
                  <tr class="transition-colors hover:bg-zinc-50/80">
                    <th scope="row" class="px-6 py-4 font-normal">
                      <div class="font-semibold text-zinc-950">Drag &amp; Drop Collection Import</div>
                      <div class="mt-0.5 text-xs text-zinc-500">JSON Capsules, Share Links &amp; Swagger / OpenAPI</div>
                    </th>
                    <td class="bg-brand-50/30 px-6 py-4 font-semibold text-emerald-700">
                      <div class="flex items-center gap-2">
                        <app-icon name="check" class="size-4 text-emerald-600" [strokeWidth]="2.5" />
                        <span>Native OS file drag &amp; drop onto window</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-medium text-emerald-700">
                      <div class="flex items-center gap-2">
                        <app-icon name="check" class="size-4 text-emerald-600" [strokeWidth]="2.5" />
                        <span>HTML5 drag &amp; drop and file picker</span>
                      </div>
                    </td>
                  </tr>

                  <!-- Row 6: Offline Storage -->
                  <tr class="transition-colors hover:bg-zinc-50/80">
                    <th scope="row" class="px-6 py-4 font-normal">
                      <div class="font-semibold text-zinc-950">Offline &amp; Storage Freedom</div>
                      <div class="mt-0.5 text-xs text-zinc-500">Working without internet connectivity</div>
                    </th>
                    <td class="bg-brand-50/30 px-6 py-4 font-semibold text-emerald-700">
                      <div class="flex items-center gap-2">
                        <app-icon name="check" class="size-4 text-emerald-600" [strokeWidth]="2.5" />
                        <span>100% offline with unrestricted disk space</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-xs text-zinc-600">
                      Subject to browser IndexedDB / localStorage quotas
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- SUMMARY RECOMMENDATION BOX                                        -->
      <!-- ================================================================= -->
      <section class="py-20" aria-labelledby="recommendation-summary-heading">
        <div class="container-page">
          <div class="card mx-auto max-w-3xl p-8 text-center sm:p-10">
            <h2 id="recommendation-summary-heading" class="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
              Our Recommendation Summary
            </h2>
            <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              Install the <strong class="font-semibold text-zinc-950">Desktop App</strong> for your
              daily development workflow, local microservice testing, and large collections. Use the
              <strong class="font-semibold text-zinc-950">Web Client</strong> whenever you are on a
              shared machine or want to inspect a public API in one click.
            </p>
            <div class="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a routerLink="/download" class="btn btn-primary btn-lg w-full sm:w-auto">
                <app-icon name="download" class="size-4" [strokeWidth]="2.2" />
                <span>Download Desktop App (Recommended)</span>
              </a>
              <a
                [href]="downloadService.webAppUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary btn-lg w-full sm:w-auto"
              >
                <span>Open Web Version Instead</span>
                <app-icon name="arrow-up-right" class="size-4 text-zinc-500" />
                <span class="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class DesktopVsWebComponent {
  readonly downloadService = inject(DownloadService);

  readonly comparisonRows = [
    {
      title: 'CORS Restrictions',
      subtitle: 'Cross-Origin Resource Sharing handling',
      desktop: 'Zero CORS issues (Native HTTP/S)',
      web: 'Requires proxy relay for restricted origins',
      webPositive: false,
      webWarning: true
    },
    {
      title: 'Localhost & Intranet APIs',
      subtitle: 'Direct access to local development servers',
      desktop: 'Direct socket to localhost / 127.0.0.1 & VPNs',
      web: 'Direct call allowed when CORS permits; private networks limited by browser rules',
      webPositive: false,
      webWarning: false
    },
    {
      title: 'Self-Signed SSL Certificates',
      subtitle: 'Development & internal TLS certificates',
      desktop: 'Native cert trust override toggle',
      web: 'Constrained by browser TLS authority store',
      webPositive: false,
      webWarning: false
    },
    {
      title: 'Custom Encryption Scripting',
      subtitle: 'Pre-dispatch manual JavaScript transformation',
      desktop: 'Monaco Script Editor + isolated sandbox',
      web: 'Monaco Script Editor + isolated sandbox',
      webPositive: true,
      webWarning: false
    },
    {
      title: 'Drag & Drop Collection Import',
      subtitle: 'JSON Capsules, Share Links & Swagger / OpenAPI',
      desktop: 'Native OS file drag & drop onto window',
      web: 'HTML5 drag & drop and file picker',
      webPositive: true,
      webWarning: false
    },
    {
      title: 'Offline & Storage Freedom',
      subtitle: 'Working without internet connectivity',
      desktop: '100% offline with unrestricted disk space',
      web: 'Subject to browser IndexedDB / localStorage quotas',
      webPositive: false,
      webWarning: false
    }
  ] as const;
}
