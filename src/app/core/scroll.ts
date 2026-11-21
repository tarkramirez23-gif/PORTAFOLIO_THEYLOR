/** Desplazamiento suave a una sección, respetando prefers-reduced-motion. */
export function goTo(event: Event, id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  event.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
