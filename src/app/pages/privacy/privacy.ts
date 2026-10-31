import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative overflow-x-clip bg-white text-zinc-900">
      <!-- ================================================================= -->
      <!-- PAGE HERO                                                         -->
      <!-- ================================================================= -->
      <section
        class="bleed-under-nav relative isolate overflow-clip pb-12 md:pb-16"
        aria-labelledby="privacy-heading"
      >
        <div class="bg-grid mask-radial pointer-events-none absolute inset-0 -z-20" aria-hidden="true"></div>
        <div
          class="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-80 w-full max-w-[50rem] rounded-full bg-brand-500/14 blur-[110px]"
          aria-hidden="true"
        ></div>

        <div class="container-page pt-10 text-center sm:pt-16">
          <span class="eyebrow animate-fade-up">
            <app-icon name="shield-check" class="size-3.5" />
            <span>Local-First Security</span>
          </span>

          <h1
            id="privacy-heading"
            class="animate-fade-up mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-zinc-950"
          >
            Privacy &amp; <span class="text-gradient-brand">Data Architecture</span>
          </h1>

          <p class="section-lead animate-fade-up mx-auto mt-4 max-w-2xl">
            OnSteroid is engineered so your API keys, bearer tokens, encryption scripts, and
            request collections never leave your device.
          </p>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- CORE PRIVACY GUARANTEES                                           -->
      <!-- ================================================================= -->
      <section class="pb-20 md:pb-28" aria-label="Privacy policy details">
        <div class="container-page">
          <div class="mx-auto max-w-3xl space-y-6">
            <article class="card p-6 sm:p-8">
              <div class="flex items-start gap-4">
                <div class="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-200/70">
                  <app-icon name="lock" class="size-5" />
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-zinc-950">1. 100% Local Data Storage</h2>
                  <p class="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                    All workspaces, collections, environment variables, auth credentials, and
                    custom JavaScript encryption scripts (<code class="font-mono text-xs text-zinc-800">encryptScript</code>,
                    <code class="font-mono text-xs text-zinc-800">preScript</code>,
                    <code class="font-mono text-xs text-zinc-800">postScript</code>) are stored exclusively on your
                    local machine (native disk storage in the Desktop App or browser
                    <code class="font-mono text-xs text-zinc-800">localStorage</code> in the Web Client). We do not
                    operate cloud databases that store your API workspaces.
                  </p>
                </div>
              </div>
            </article>

            <article class="card p-6 sm:p-8">
              <div class="flex items-start gap-4">
                <div class="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70">
                  <app-icon name="eye-off" class="size-5" />
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-zinc-950">2. Zero Telemetry &amp; Zero Analytics Tracking</h2>
                  <p class="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                    OnSteroid does not collect usage telemetry, behavioral analytics, crash dumps
                    containing request payloads, or advertising identifiers. No mandatory user
                    account or sign-in is required to use any feature of the Desktop or Web client.
                  </p>
                </div>
              </div>
            </article>

            <article class="card p-6 sm:p-8">
              <div class="flex items-start gap-4">
                <div class="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-200/70">
                  <app-icon name="terminal" class="size-5" />
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-zinc-950">3. Direct Network Dispatch</h2>
                  <p class="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                    When you send an HTTP/HTTPS request from the OnSteroid Desktop App, the request
                    is dispatched directly from your operating system's network stack to the target
                    endpoint you specify. Your requests, headers, and responses are never routed
                    through third-party inspection servers.
                  </p>
                </div>
              </div>
            </article>

            <article class="card p-6 sm:p-8">
              <div class="flex items-start gap-4">
                <div class="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/80">
                  <app-icon name="code" class="size-5" />
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-zinc-950">4. Open-Source Verification (GPL-3.0)</h2>
                  <p class="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                    OnSteroid is released under the GNU General Public License v3.0. Security teams
                    and developers can inspect our complete source code, sandbox execution pipeline,
                    and Electron main-process bridge on GitHub at any time.
                  </p>
                  <div class="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      [href]="downloadService.githubUrl()"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-outline btn-sm"
                    >
                      <app-icon name="github" class="size-4" />
                      <span>Audit Source on GitHub</span>
                    </a>
                    <a routerLink="/faq" class="btn btn-ghost btn-sm">
                      <span>Read Security FAQ</span>
                      <app-icon name="arrow-right" class="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  `
})
export class PrivacyComponent {
  readonly downloadService = inject(DownloadService);
}
