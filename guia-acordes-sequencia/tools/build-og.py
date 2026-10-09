"""Cria arte OG autônoma com capa real do PDF incorporada."""
from base64 import b64encode
from pathlib import Path

root = Path(__file__).resolve().parents[1]
cover = b64encode((root / "mockups/capa.png").read_bytes()).decode("ascii")
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
<defs><filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="19" flood-opacity=".42"/></filter></defs>
<rect width="1200" height="630" fill="#080808"/>
<circle cx="1100" cy="78" r="290" fill="#ff5600" opacity=".12"/>
<text x="70" y="102" font-family="Manrope,Arial" font-size="24" font-weight="800" fill="#ff5600" letter-spacing="4">OFICINA DO VIOLÃO  •  GUIA DE BOLSO</text>
<text x="70" y="205" font-family="Manrope,Arial" font-size="58" font-weight="800" fill="#fff">Pare de treinar acordes</text>
<text x="70" y="272" font-family="Manrope,Arial" font-size="58" font-weight="800" fill="#ff5600">aleatoriamente.</text>
<text x="70" y="345" font-family="DM Sans,Arial" font-size="27" fill="#ccc">Aprenda a praticar os caminhos entre eles.</text>
<path d="M70 405 H650" stroke="#ff5600" stroke-width="4"/>
<text x="70" y="470" font-family="Manrope,Arial" font-size="33" font-weight="800" fill="#fff">G  →  D  →  Em  →  C</text>
<text x="70" y="574" font-family="DM Sans,Arial" font-size="19" fill="#aaa">Felipe Figueroa  •  Toda semana, um próximo passo.</text>
<g filter="url(#shadow)" transform="translate(792 37) rotate(7 183 260)"><image href="data:image/png;base64,{cover}" width="366" height="520"/></g>
</svg>'''
(root / "assets/og-guia.svg").write_text(svg, encoding="utf-8")
print("Criado assets/og-guia.svg")
