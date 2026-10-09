"""Desenha diagramas vetoriais originais para o Guia de Bolso."""
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "diagramas"
OUT.mkdir(exist_ok=True)

# Cordas na ordem visual: 6ª (esquerda) até 1ª (direita).
# Valor: (casa, dedo). Casa 0 = solta; None = não tocar.
CHORDS = {
    "C": [(None, None), (3, 3), (2, 2), (0, None), (1, 1), (0, None)],
    "G": [(3, 2), (2, 1), (0, None), (0, None), (0, None), (3, 3)],
    "D": [(None, None), (None, None), (0, None), (2, 1), (3, 3), (2, 2)],
    "Am": [(None, None), (0, None), (2, 2), (2, 3), (1, 1), (0, None)],
    "Em": [(0, None), (2, 2), (2, 3), (0, None), (0, None), (0, None)],
    "Fmaj7": [(None, None), (None, None), (3, 3), (2, 2), (1, 1), (0, None)],
}


def diagram(name, strings):
    xs = [35 + i * 28 for i in range(6)]
    fret_ys = [56, 91, 126, 161, 196]
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 235" role="img" '
        f'aria-label="Diagrama do acorde {name}">',
        '<rect width="210" height="235" rx="18" fill="#f0f1f2"/>',
        f'<text x="105" y="31" text-anchor="middle" fill="#080808" '
        f'font-family="Manrope,Arial,sans-serif" font-size="23" font-weight="800">{name}</text>',
    ]
    for x in xs:
        parts.append(f'<path d="M{x} 56V196" stroke="#444" stroke-width="1.5"/>')
    for index, y in enumerate(fret_ys):
        weight = 5 if index == 0 else 1.5
        parts.append(f'<path d="M35 {y}H175" stroke="#080808" stroke-width="{weight}"/>')
    for x, (fret, finger) in zip(xs, strings):
        if fret is None:
            parts.append(f'<text x="{x}" y="49" text-anchor="middle" fill="#777" '
                         'font-family="Arial,sans-serif" font-size="19" font-weight="700">×</text>')
        elif fret == 0:
            parts.append(f'<circle cx="{x}" cy="43" r="6" fill="none" '
                         'stroke="#ff5600" stroke-width="3"/>')
        else:
            y = (fret_ys[fret - 1] + fret_ys[fret]) / 2
            parts.append(f'<circle cx="{x}" cy="{y}" r="12" fill="#ff5600"/>')
            parts.append(f'<text x="{x}" y="{y + 5}" text-anchor="middle" fill="#080808" '
                         f'font-family="Arial,sans-serif" font-size="13" font-weight="700">{finger}</text>')
    parts.append('<text x="105" y="220" text-anchor="middle" fill="#555" '
                 'font-family="Arial,sans-serif" font-size="10">6ª corda → 1ª corda</text>')
    parts.append('</svg>')
    return "\n".join(parts) + "\n"


for chord, fingering in CHORDS.items():
    (OUT / f"{chord.lower()}.svg").write_text(diagram(chord, fingering), encoding="utf-8")
