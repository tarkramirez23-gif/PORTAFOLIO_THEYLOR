import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';
import { prefersReducedMotion } from './scroll';

/** Anima la aparición del elemento cuando entra al viewport. Uso: <div appReveal> */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[class.is-visible]': 'visible()' },
})
export class Reveal {
  readonly visible = signal(false);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (prefersReducedMotion()) {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
