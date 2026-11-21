import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../core/reveal';
import { CTA, PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-cta',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="contacto">
      <div class="wrap">
        <div class="cta" appReveal>
          <h2 class="cta__title">{{ cta.title }}</h2>
          <p class="cta__text">{{ cta.text }}</p>
          <div class="cta__buttons">
            <a class="btn btn--primary" [href]="'mailto:' + p.email">Iniciar Conversación</a>
            <a class="btn btn--ghost" [href]="p.linkedin" target="_blank" rel="noopener noreferrer">Conectar en LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Cta {
  protected readonly cta = CTA;
  protected readonly p = PROFILE;
}
