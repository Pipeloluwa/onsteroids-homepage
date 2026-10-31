import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Brand mark + wordmark. Use `tone="dark"` on dark surfaces. */
@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      routerLink="/"
      class="group inline-flex items-center gap-2 rounded-lg"
      aria-label="OnSteroid home"
    >
      <span
        class="relative grid size-8 place-items-center rounded-[9px] bg-linear-to-b from-[#ff7a45] to-brand-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_0_0_1px_rgb(194_65_12/0.55),0_4px_10px_-3px_rgb(232_83_28/0.5)] transition-transform duration-200 group-hover:scale-105"
      >
        <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
          <path
            d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"
          />
        </svg>
      </span>
      <span
        class="text-base font-semibold tracking-[-0.025em]"
        [class.text-zinc-950]="tone() === 'light'"
        [class.text-white]="tone() === 'dark'"
      >
        OnSteroid
      </span>
    </a>
  `
})
export class LogoComponent {
  readonly tone = input<'light' | 'dark'>('light');
}
