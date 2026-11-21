import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../core/reveal';
import { ABOUT_ROWS, LAB } from '../data/portfolio.data';

@Component({
  selector: 'app-about',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="sobre-mi">
      <div class="wrap">
        <div class="head head--center">
          <h2 class="title">Sobre mí</h2>
        </div>

        <div class="about">
          <div class="rows">
            @for (r of rows; track r.label) {
              <div class="row" appReveal>
                <span class="row__label">{{ r.label }}</span>
                @if (r.href) {
                  <a class="row__value row__value--accent" [href]="r.href">{{ r.value }}</a>
                } @else {
                  <span class="row__value" [class.row__value--accent]="r.tone === 'accent'" [class.row__value--ok]="r.tone === 'ok'">{{ r.value }}</span>
                }
              </div>
            }
          </div>

          <figure class="lab" appReveal>
            <img src="lab.svg" alt="Ilustración de un laboratorio de redes y seguridad" width="1200" height="760" loading="lazy" />
            </figure>
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly rows = ABOUT_ROWS;
  protected readonly lab = LAB;
}
