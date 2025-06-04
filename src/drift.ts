export function drift(id: string, html: string, style: Partial<CSSStyleDeclaration>, lifespan = 8000) {
  const el = document.createElement('div');
  el.innerHTML = html;
  const node = el.firstElementChild as HTMLElement;

  Object.assign(node.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '9999',
    animation: `driftAnim ${lifespan / 1000}s ease-out`,
    ...style
  });

  node.setAttribute('data-drift-id', id);
  document.body.appendChild(node);

  setTimeout(() => {
    node?.remove();
  }, lifespan);
}
