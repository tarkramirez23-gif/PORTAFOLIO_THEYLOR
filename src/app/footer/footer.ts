import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="wrap footer__inner">
        <p class="footer__copy">
                    © {{ year }} {{ p.name }}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly p = PROFILE;
  protected readonly year = new Date().getFullYear();
}