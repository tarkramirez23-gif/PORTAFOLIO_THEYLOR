import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { About } from './about/about';
import { Cta } from './cta/cta';
import { Footer } from './footer/footer';
import { Hero } from './hero/hero';
import { Navbar } from './navbar/navbar';
import { Projects } from './projects/projects';
import { Skills } from './skills/skills';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, About, Skills, Projects, Cta, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cursor-glow" aria-hidden="true"></div>
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-cta />
    </main>
    <app-footer />
  `,
})
export class App {
  constructor() {
    const destroyRef = inject(DestroyRef);

    // Luz que sigue al cursor (solo en dispositivos con mouse)
    afterNextRender(() => {
      if (window.matchMedia('(hover: none)').matches) return;
      const root = document.documentElement;
      let raf = 0;
      let x = 0;
      let y = 0;

      const onMove = (e: PointerEvent) => {
        x = e.clientX;
        y = e.clientY;
        if (!raf) {
          raf = requestAnimationFrame(() => {
            raf = 0;
            root.style.setProperty('--mx', x + 'px');
            root.style.setProperty('--my', y + 'px');
            root.classList.add('has-glow');
          });
        }
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => {
        window.removeEventListener('pointermove', onMove);
        cancelAnimationFrame(raf);
      });
    });
  }
}