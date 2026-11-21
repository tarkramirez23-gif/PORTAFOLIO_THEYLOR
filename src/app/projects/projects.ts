import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../core/reveal';
import { PROJECTS } from '../data/portfolio.data';

@Component({
  selector: 'app-projects',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="proyectos">
      <div class="wrap">
          <div class="head head--center">
          <h2 class="title title--wide">PORTAFOLIO</h2>
          <p class="head__sub">Algunos Proyectos realizados recientemente</p>
        </div>

        <div class="cases">
          @for (p of projects; track p.title) {
            <article class="case" [class.case--wide]="!!p.wide" appReveal>
              @if (p.image) {
                <img class="case__img" [src]="p.image" [alt]="'Vista previa de ' + p.title" loading="lazy" (error)="hide($event)" />
              }
              <div class="case__body">
                <h3 class="case__title">{{ p.title }}</h3>
                <p class="case__desc">{{ p.description }}</p>
                <div class="case__foot">
                  <ul class="case__tags">
                    @for (t of p.tags; track t) { <li>{{ t }}</li> }
                  </ul>
                  <a class="case__link" [href]="p.url" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'Ver repositorio de ' + p.title">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Projects {
  protected readonly projects = PROJECTS;

  /** Si la imagen no existe o falla, se oculta y queda el fondo degradado. */
  protected hide(event: Event): void {
    (event.target as HTMLImageElement).hidden = true;
  }
}