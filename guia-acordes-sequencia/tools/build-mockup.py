"""Cria um mockup SVG fiel usando duas páginas renderizadas do PDF real."""
from base64 import b64encode
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
cover = b64encode((ROOT / "mockups/capa.png").read_bytes()).decode("ascii")
inside = b64encode((ROOT / "mockups/miolo.png").read_bytes()).decode("ascii")
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="900" height="850" viewBox="0 0 900 850" role="img" aria-label="Mockup do PDF Guia de Bolso Acordes em Sequência, mostrando a capa e uma página com diagramas de acordes">
<defs>
  <filter id="shadow" x="-45%" y="-45%" width="190%" height="190%"><feDropShadow dx="0" dy="20" stdDeviation="23" flood-color="#000" flood-opacity=".4"/></filter>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="38"/></filter>
</defs>
<ellipse cx="460" cy="760" rx="285" ry="42" fill="#000" opacity=".25" filter="url(#glow)"/>
<circle cx="612" cy="346" r="185" fill="#ff5600" opacity=".18" filter="url(#glow)"/>
<g transform="translate(428 162) rotate(8 180 255)" filter="url(#shadow)">
  <rect x="12" y="13" width="360" height="510" rx="2" fill="#c5c5c5"/>
  <rect x="6" y="6" width="360" height="510" rx="2" fill="#e0e0e0"/>
  <image x="0" y="0" width="360" height="510" href="data:image/png;base64,{inside}"/>
  <rect x="0.5" y="0.5" width="359" height="509" fill="none" stroke="#c9c9c9"/>
</g>
<g transform="translate(128 84) rotate(-7 210 298)" filter="url(#shadow)">
  <rect x="14" y="15" width="420" height="596" rx="2" fill="#b7b7b7"/>
  <rect x="8" y="8" width="420" height="596" rx="2" fill="#ff5600"/>
  <image x="0" y="0" width="420" height="596" href="data:image/png;base64,{cover}"/>
  <rect x="0.5" y="0.5" width="419" height="595" fill="none" stroke="#fff" stroke-opacity=".25"/>
</g>
<g transform="translate(595 688)">
  <rect width="182" height="56" rx="28" fill="#ff5600"/>
  <text x="91" y="36" text-anchor="middle" fill="#080808" font-family="Manrope,Arial,sans-serif" font-size="20" font-weight="800" letter-spacing="1">PDF DIGITAL</text>
</g>
</svg>'''
(ROOT / "mockups/guia-mockup.svg").write_text(svg, encoding="utf-8")
print("Criado mockups/guia-mockup.svg")
