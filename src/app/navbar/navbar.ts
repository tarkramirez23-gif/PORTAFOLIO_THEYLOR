import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { goTo } from '../core/scroll';
import { NAV, PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'open.set(false)' },
  template: `
    <a class="skip-link" href="#sobre-mi" (click)="goTo($event, 'sobre-mi')">Saltar al contenido</a>
    <header class="nav">
      <div class="nav__inner">
        <a href="#inicio" class="nav__logo" (click)="navigate($event, 'inicio')">
          <span class="nav__mark">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
          </span>
          <span>{{ p.logo }}<span class="nav__dot">.</span></span>
        </a>

        <nav class="nav__links" id="navLinks" aria-label="Principal" [class.is-open]="open()">
          @for (item of items; track item.id) {
            <a
              [href]="'#' + item.id"
              [class.is-active]="active() === item.id"
              [attr.aria-current]="active() === item.id ? 'true' : null"
              (click)="navigate($event, item.id)"
              >{{ item.label }}</a
            >
          }
          <a class="nav__cv-mobile" [href]="p.cv" download>Descargar CV</a>
        </nav>

        <a class="nav__cv" [href]="p.cv" download>
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Descargar CV
        </a>

        <button
          type="button"
          class="nav__toggle"
          aria-controls="navLinks"
          [attr.aria-label]="open() ? 'Cerrar menú' : 'Abrir menú'"
          [attr.aria-expanded]="open()"
          (click)="open.set(!open())"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `,
})
export class Navbar {
  protected readonly items = NAV;
  protected readonly p = PROFILE;
  protected readonly goTo = goTo;
  protected readonly open = signal(false);
  protected readonly active = signal('inicio');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
        },
        { rootMargin: '-45% 0px -45% 0px' },
      );
      for (const item of this.items) {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected navigate(event: Event, id: string): void {
    goTo(event, id);
    this.open.set(false);
  }
}
