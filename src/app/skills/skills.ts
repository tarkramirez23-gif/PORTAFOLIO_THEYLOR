import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Reveal } from '../core/reveal';
import { SKILL_GROUPS } from '../data/skills.data';

@Component({
  selector: 'app-skills',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section--alt" id="habilidades">
      <div class="wrap">
        <div class="head head--center">
          <h2 class="title">Habilidades</h2>
        </div>

        <div class="skillbox" appReveal>
          <div class="skillbox__nav" role="tablist" aria-label="Áreas de habilidad">
            @for (g of groups; track g.name; let i = $index) {
              <button
                type="button"
                role="tab"
                class="skillbox__tab"
                [class.is-active]="selected() === i"
                [attr.aria-selected]="selected() === i"
                (click)="selected.set(i)"
              >
                <img [src]="g.icon" alt="" width="30" height="30" />
                <span>{{ g.name }}</span>
              </button>
            }
          </div>

          <div class="skillbox__main" role="tabpanel">
            <div class="skillbox__grid">
              @for (t of current().tools; track t.name) {
                <div class="tool">
                  <div class="tile" [attr.title]="t.name">
                    <img [src]="t.logo ?? t.icon" [alt]="t.name" width="64" height="64" [class.tile__logo]="!!t.logo" (error)="fallback($event, t.icon)" />
                  </div>
                  <span class="tool__name">{{ t.name }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  protected readonly selected = signal(0);
  protected readonly current = computed(() => this.groups[this.selected()]);

  /** Si el logo oficial no carga, se usa el icono genérico de respaldo. */
  protected fallback(event: Event, icon: string): void {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fb']) return;
    img.dataset['fb'] = '1';
    img.classList.remove('tile__logo');
    img.src = icon;
  }
}