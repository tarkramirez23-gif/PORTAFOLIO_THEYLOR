import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { goTo } from '../core/scroll';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="inicio">
      <div class="wrap hero__grid">
        <div class="hero__copy">
          <span class="hero__ghost" aria-hidden="true">T</span>
          <p class="kicker">HOLA, SOY</p>
          <h1 class="hero__name">{{ p.name }}</h1>
          <p class="hero__role">{{ p.roleA }} <span class="slash">//</span> {{ p.roleB }}</p>
          <p class="hero__note">Soy estudiante de 10º ciclo de Ingeniería de Sistemas Computacionales, con enfoque en Seguridad Ofensiva y Defensiva. Me interesa el fortalecimiento de la seguridad digital y la protección de infraestructuras tecnológicas mediante evaluaciones técnicas y metodológicas.</p>

          <div class="hero__social">
            <a class="icon-btn" [href]="p.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a class="icon-btn is-primary" [href]="p.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a class="icon-btn" href="#proyectos" aria-label="Ver proyectos" (click)="goTo($event, 'proyectos')">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
            </a>
          </div>
        </div>

        <div class="hero__photo">
          <img
            [src]="photo()"
            [alt]="'Foto de ' + p.name"
            width="906"
            height="1600"
            fetchpriority="high"
            (error)="photo.set('foto-placeholder.svg')"
          />
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly p = PROFILE;
  protected readonly goTo = goTo;
  protected readonly photo = signal('foto.jpg');
}
