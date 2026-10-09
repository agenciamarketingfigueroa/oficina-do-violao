"""Gera os diagramas originais e o HTML imprimível do Guia de Bolso."""
from html import escape
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DIAGRAMS = ROOT / "diagramas"
EBOOK = ROOT / "ebook" / "index.html"
CONFIG = (ROOT / "config.js").read_text(encoding="utf-8")
WHATSAPP_URL = re.search(r'WHATSAPP_URL:\s*"([^"]+)"', CONFIG).group(1)

# 6ª → 1ª corda. x = não tocar; 0 = corda solta.
CHORDS = {
    "C": ("x32010", "032010", {0, 4, 7}, 0),
    "G": ("320003", "210003", {7, 11, 2}, 7),
    "D": ("xx0232", "000132", {2, 6, 9}, 2),
    "A": ("x02220", "001230", {9, 1, 4}, 9),
    "E": ("022100", "023100", {4, 8, 11}, 4),
    "Em": ("022000", "023000", {4, 7, 11}, 4),
    "Am": ("x02210", "002310", {9, 0, 4}, 9),
    "Dm": ("xx0231", "000231", {2, 5, 9}, 2),
    "F": ("133211", "134211", {5, 9, 0}, 5),
    "Bm": ("x24432", "013421", {11, 2, 6}, 11),
    "F#m": ("244222", "134111", {6, 9, 1}, 6),
    "Cmaj7": ("x32000", "032000", {0, 4, 7, 11}, 0),
    "Am7": ("x02010", "002010", {9, 0, 4, 7}, 9),
    "Dm7": ("xx0211", "000211", {2, 5, 9, 0}, 2),
    "G7": ("320001", "210001", {7, 11, 2, 5}, 7),
    "D7": ("xx0212", "000213", {2, 6, 9, 0}, 2),
    "C#dim": ("x4565x", "012430", {1, 4, 7}, 1),
    "C/E": ("032010", "032010", {0, 4, 7}, 4),
    "G/B": ("x20003", "020004", {7, 11, 2}, 11),
    "D/F#": ("xx4232", "004132", {2, 6, 9}, 6),
}
TUNING = (4, 9, 2, 7, 11, 4)

def slug(name):
    return name.lower().replace("#", "s").replace("/", "-")

def validate_chords():
    for name, (shape, fingers, expected, bass) in CHORDS.items():
        assert len(shape) == len(fingers) == 6, name
        notes = [(TUNING[i] + int(fret)) % 12 for i, fret in enumerate(shape) if fret != "x"]
        assert set(notes) == expected, f"{name}: notas {set(notes)} != {expected}"
        assert notes[0] == bass, f"{name}: baixo {notes[0]} != {bass}"
        assert all(f == "0" for s, f in zip(shape, fingers) if s in "x0"), name

def diagram(name):
    shape, fingers, _, _ = CHORDS[name]
    frets = [int(x) for x in shape if x not in "x0"]
    first = min(frets) if max(frets) > 4 else 1
    first = max(1, first)
    lines = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 196" role="img" aria-label="Diagrama do acorde {escape(name)}">',
             '<rect width="160" height="196" rx="15" fill="#fff"/>',
             f'<text x="80" y="26" text-anchor="middle" font-family="Manrope,Arial" font-size="19" font-weight="800" fill="#080808">{escape(name)}</text>']
    for i in range(6):
        x = 30 + i * 20
        lines.append(f'<line x1="{x}" y1="57" x2="{x}" y2="157" stroke="#555" stroke-width="1.2"/>')
    for i in range(5):
        y = 57 + i * 25
        lines.append(f'<line x1="30" y1="{y}" x2="130" y2="{y}" stroke="#555" stroke-width="{3 if i == 0 and first == 1 else 1.2}"/>')
    if first > 1:
        lines.append(f'<text x="14" y="77" font-family="DM Sans,Arial" font-size="10" font-weight="700" fill="#555">{first}</text>')
    for i, (fret, finger) in enumerate(zip(shape, fingers)):
        x = 30 + i * 20
        if fret in "x0":
            symbol = "×" if fret == "x" else "○"
            lines.append(f'<text x="{x}" y="48" text-anchor="middle" font-family="Arial" font-size="17" font-weight="700" fill="{("#777" if fret == "x" else "#ff5600")}">{symbol}</text>')
        else:
            y = 69.5 + (int(fret) - first) * 25
            lines.append(f'<circle cx="{x}" cy="{y}" r="10" fill="#ff5600"/>')
            lines.append(f'<text x="{x}" y="{y+3.5}" text-anchor="middle" font-family="DM Sans,Arial" font-size="10" font-weight="800" fill="#080808">{finger}</text>')
    lines += ['<text x="80" y="181" text-anchor="middle" font-family="DM Sans,Arial" font-size="10" fill="#666">6ª corda à esquerda</text>', '</svg>']
    (DIAGRAMS / f"{slug(name)}.svg").write_text("\n".join(lines), encoding="utf-8")

pages = []
def page(section, title, body, tone="", eyebrow="", cls=""):
    pages.append((section, title, body, tone, eyebrow, cls))

def p(text, cls=""):
    return f'<p class="{cls}">{text}</p>'

def callout(text):
    return f'<div class="callout">{text}</div>'

def flow(items):
    return '<div class="flow">' + '<span> → </span>'.join(f'<b>{escape(x)}</b>' for x in items) + '</div>'

def cards(items):
    return '<div class="cards">' + ''.join(f'<div class="card"><strong>{escape(a)}</strong><p>{b}</p></div>' for a,b in items) + '</div>'

def steps(items):
    return '<div class="steps">' + ''.join(f'<div class="step"><b>{i:02d}</b><p>{x}</p></div>' for i,x in enumerate(items,1)) + '</div>'

def diagrams(chords):
    return '<div class="diagrams">' + ''.join(f'<img src="../diagramas/{slug(c)}.svg" alt="Diagrama de {escape(c)}">' for c in dict.fromkeys(chords)) + '</div>'

def sequence(number, chapter, chords, why, observations, note=""):
    path = " → ".join(chords)
    body = flow(chords) + p(why, "lead") + diagrams(chords)
    body += '<div class="sequence-bottom"><div><h3>O que observar</h3><ul>' + ''.join(f'<li>{x}</li>' for x in observations) + '</ul></div>'
    body += '<div><h3>Pratique em 5 passos</h3><ol><li>Monte cada forma sem ritmo.</li><li>Toque 4 tempos por acorde.</li><li>Reduza para 2 tempos.</li><li>Use uma batida simples para baixo.</li><li>Repita o ciclo sem parar.</li></ol></div></div>'
    body += callout(f'<strong>Feche o círculo:</strong> {escape(chords[-1])} → {escape(chords[0])}. {note}')
    page(chapter, f'Sequência {number:02d}', body, eyebrow=path, cls="sequence-page")

page("Capa", "ACORDES EM SEQUÊNCIA", '<div class="cover-mark"><img src="../../assets/img/logo-square.png" alt="Oficina do Violão"></div><div class="cover-center"><p class="super">GUIA DE BOLSO</p><h1>ACORDES EM<br><em>SEQUÊNCIA</em></h1><p>Pare de treinar acordes aleatoriamente. Pratique as combinações que você realmente vai usar.</p></div><div class="cover-bottom"><strong>Felipe Figueroa</strong><br>Oficina do Violão<br>Toda semana, um próximo passo.</div>', "dark", cls="cover")
page("Comece aqui", "Você não toca acordes aleatórios numa música.", p("Então por que está praticando assim?", "big accent") + p("Aprender cada forma isoladamente importa no começo. Mas saber montar C, G, D, Am e Em separadamente não garante que você saiba percorrer uma música.", "lead") + flow(["C", "G", "Am", "F"]) + p("O violão acontece quando um acorde leva ao próximo. Este guia organiza caminhos para que a sua mão reconheça combinações que fazem sentido juntas.") + callout("Pare de decorar acordes soltos. Comece a treinar caminhos entre eles."), "dark")
page("A ideia", "A lista e o caminho", cards([("Treino solto", "C, depois D, depois Am, depois G... Cada forma fica sozinha."),("Treino em sequência", "G → D → Em → C. Você sabe de onde vem e para onde vai.")]) + p("No segundo caso, você pratica a antecipação do próximo acorde, o retorno ao início e a continuidade da música.", "lead") + callout("A pergunta deste guia é: quais acordes vale a pena praticar juntos — e em qual ordem?"))
page("Como usar", "Uma sequência por vez", steps(["Escolha uma sequência adequada à sua etapa.", "Confira os diagramas e monte cada acorde sem ritmo.", "Toque devagar, prestando atenção a cada seta.", "Repita o ciclo; inclua a volta do último acorde ao primeiro.", "Adicione uma pulsação simples e só depois uma batida."]) + callout("Não tente fazer todas as páginas hoje. Volte à mesma sequência até ela começar a soar como um único caminho."))
page("Legenda", "Leia o diagrama antes de tocar", diagrams(["C", "G", "D", "Am"]) + p("As seis linhas verticais representam as cordas. A 6ª está à esquerda; a 1ª, à direita. Os trastes vão de cima para baixo.") + cards([("○", "Corda solta: toque sem apertar."),("×", "Não toque esta corda."),("1 a 4", "Dedos da mão que monta o acorde.")]) + p("O número à esquerda mostra a casa inicial quando o desenho sobe pelo braço. Confira as cordas abafadas antes de acelerar.", "small"), cls="legend-page")
page("Mapa", "Por onde começar", steps(["Acordes abertos: reconheça as formas.", "Sequências sem pestana: transforme formas em caminhos.", "Primeira pestana: amplie as combinações.", "Acordes com sétima: ouça outra cor no mesmo caminho.", "Diminuto de passagem: ligue dois lugares.", "Inversões: faça o baixo caminhar."]) + callout("Você não precisa estudar tudo hoje."), "orange")
page("Parte 1", "Faça os acordes conhecidos conversarem", p("Comece com combinações abertas, frequentes e confortáveis no violão. O objetivo é reconhecer a ordem, não colecionar desenhos.", "lead") + flow(["G", "D", "Em", "C"]) + p("Leia a próxima seta enquanto o acorde atual ainda soa. Primeiro vem clareza. A velocidade aparece depois.") + callout("Mesmo uma sequência simples pode ser nova para a mão se você nunca a tocou como um ciclo."), "dark")
sequence(1,"Abertos",["G","D","Em","C"],"Um caminho muito comum no violão popular. Quatro formas abertas deixam você concentrar a atenção na ordem e no retorno.",["G → D: antecipe a forma menor de D.","D → Em: deixe a mão descer para as cordas graves.","Em → C: escute a mudança de clima.","C → G: o último movimento também faz parte."])
sequence(2,"Abertos",["C","Am","Dm","G"],"O caminho começa em C, passa por dois acordes menores e cria uma volta clara com G. Útil para ouvir como a sequência ganha direção.",["C → Am: as duas formas compartilham a região.","Am → Dm: observe a mudança das cordas tocadas.","Dm → G: prepare o baixo de G.","G → C: resolva sem interromper o pulso."])
sequence(3,"Abertos",["D","A","G","D"],"Três acordes abertos muito usados juntos. A volta já está escrita para você sentir como a frase recomeça.",["D → A: mantenha a mão perto das cordas finas.","A → G: prepare a ida às cordas graves.","G → D: conclua e recomece."])
sequence(4,"Abertos",["Em","C","G","D"],"As mesmas formas da primeira sequência surgem em outra ordem. O ouvido percebe um novo ponto de partida.",["Em → C: comece pelas cordas que receberão dedos.","C → G: amplie a mão sem pressa.","G → D: antecipe a forma seguinte.","D → Em: feche o círculo."])
page("Lembrete da Oficina", "Monte de cima para baixo", p("Quando for construir uma forma, organize a mão na direção da 6ª para a 1ª corda. Ignore as cordas que não devem soar.", "lead") + '<div class="strings"><span>6ª</span><span>↓</span><span>5ª</span><span>↓</span><span>4ª</span><span>↓</span><span>3ª</span><span>↓</span><span>2ª</span><span>↓</span><span>1ª</span></div>' + callout("Este é um lembrete de organização. O foco aqui continua sendo a ordem dos acordes na música."), "orange")
page("Treine o retorno", "A última troca também conta", flow(["G","D","Em","C","G"]) + p("Muita gente pratica G → D → Em → C e para. Quando a música recomeça, a passagem C → G parece uma surpresa.", "lead") + cards([("Faça", "Treine C → G algumas vezes e depois toque o ciclo inteiro."),("Escute", "O retorno precisa soar tão natural quanto as trocas do meio.")]) + callout("Toda sequência é um círculo. Inclua a seta que volta ao começo."), "dark")
page("Não corra", "Devagar o suficiente para continuar", p("Se você não consegue manter a sequência lentamente, acelerar ainda não resolve. Volte a um ritmo em que cada acorde tenha som claro.", "lead") + steps(["Monte as formas sem ritmo.", "Diga em voz alta qual acorde vem depois.", "Toque uma batida para baixo no primeiro tempo.", "Conte quatro tempos por acorde; depois tente dois.", "Só acelere quando conseguir repetir sem parar."]) + callout("Clareza, antecipação e pulso vêm antes da velocidade."))
page("Exercício principal", "Loop de acordes", p("Escolha uma sequência e toque continuamente por 1 minuto. Faça uma pausa curta; depois tente 2 minutos.", "lead") + cards([("1 minuto", "Leia as setas, inclua o retorno e procure manter o pulso."),("2 minutos", "Observe se a mão começa a reconhecer o próximo lugar antes da troca.")]) + p("Não é teste de resistência. Se a mão tensionar ou o som piorar, pare, descanse e volte mais devagar.") + callout("O objetivo é deixar de tratar cada acorde como um evento isolado."), "orange")
page("Parte 2", "A primeira pestana abre caminhos", p("Uma pestana pode parecer um obstáculo quando estudada sozinha. Dentro de uma sequência, ela tem uma função musical concreta.", "lead") + flow(["C","G","Am","F"]) + p("Comece com F. Depois acrescente Bm e, se estiver confortável, F#m. Não precisa dominar três pestanas no mesmo dia.") + callout("Se a forma ainda não soa limpa, reduza o andamento. O objetivo não é vencer a pestana à força."), "dark")
sequence(5,"Pestanas",["C","G","Am","F"],"O F completo fecha um caminho extremamente útil. Aqui a pestana surge como parte da frase, não como um exercício isolado.",["C → G: prepare a ida às cordas graves.","G → Am: volte à região central.","Am → F: organize o indicador para a pestana.","F → C: pratique a saída da pestana."])
sequence(6,"Pestanas",["D","A","Bm","G"],"Bm amplia uma combinação familiar em D. Toque devagar para que a nova forma não interrompa a sequência.",["D → A: mantenha o pulso.","A → Bm: prepare a pestana antes do primeiro tempo.","Bm → G: solte a pressão sem afastar toda a mão.","G → D: conclua o ciclo."])
sequence(7,"Pestanas",["A","E","F#m","D"],"F#m acrescenta outra cor a uma sequência que começa com dois acordes abertos. Faça esta página quando F e Bm já estiverem mais confortáveis.",["A → E: encontre a nova base sem pressa.","E → F#m: a pestana entra no 2º traste.","F#m → D: saia da pestana com leveza.","D → A: confira o retorno."])
page("Parte 3", "Os mesmos caminhos, outra cor", p("Acordes com sétima mudam a sonoridade sem exigir que você abandone a ideia do caminho. Primeiro ouça a diferença; depois leia os diagramas.", "lead") + flow(["C","Am","Dm","G"]) + flow(["Cmaj7","Am7","Dm7","G7"]) + callout("Mesma direção geral. Outra sonoridade."), "dark")
sequence(8,"Sétimas",["Cmaj7","Am7","Dm7","G7"],"Esta variação colore o caminho C → Am → Dm → G. Compare as duas versões no mesmo andamento, sem transformar o exercício em teoria.",["Cmaj7 → Am7: ouça as notas mais suaves.","Am7 → Dm7: respeite as cordas que não soam.","Dm7 → G7: a tensão aumenta.","G7 → Cmaj7: escute a volta."])
page("Comparação", "Troque a cor, preserve o caminho", cards([("Versão simples", "C → Am → Dm → G"),("Versão com sétimas", "Cmaj7 → Am7 → Dm7 → G7")]) + p("Toque quatro voltas de cada. O que muda no som? O caminho continua reconhecível?", "lead") + steps(["Toque a versão simples.", "Sem mudar a velocidade, toque a versão com sétimas.", "Volte à primeira versão e escolha a sonoridade que combina com a música."]) + callout("O nome do acorde é útil. Mais útil ainda é ouvir onde ele leva."))
page("Parte 4", "O acorde que faz a ponte", p("Entre C e Dm existe espaço para um acorde de passagem. C#dim cria um pequeno movimento cromático no baixo: C → C# → D.", "lead") + flow(["C","C#dim","Dm"]) + p("O diminuto aqui não é matéria para decorar. É uma ferramenta para criar movimento entre dois lugares.") + callout("A forma de C#dim fica mais acima no braço. Toque somente as cordas indicadas no diagrama."), "dark")
page("Passagem", "Antes e depois do diminuto", cards([("Sem passagem", "C → Dm → G7 → C"),("Com passagem", "C → C#dim → Dm → G7 → C")]) + diagrams(["C","C#dim","Dm","G7"]) + p("Ouça o baixo subir em pequenos passos: C, C#, D. O acorde de passagem deve ser breve; experimente 2 tempos nele e 4 nos demais.") + callout("Se não perceber a diferença, toque apenas C → C#dim → Dm repetidas vezes."), cls="compact-page")
sequence(9,"Passagem",["C","C#dim","Dm","G7"],"Um exemplo completo: C#dim conduz de C até Dm. G7 prepara a volta ao C. Experimente o diminuto como passagem curta.",["C → C#dim: escute o baixo subir meio tom.","C#dim → Dm: o baixo sobe mais meio tom.","Dm → G7: mude o apoio da mão.","G7 → C: deixe a sequência descansar."],"Use 2 tempos em C#dim se o desenho estiver confortável.")
page("Parte 5", "Às vezes basta mudar o baixo", p("C/E, G/B e D/F# são acordes conhecidos com outra nota no grave. A letra depois da barra indica o baixo que deve soar primeiro.", "lead") + diagrams(["C/E","G/B","D/F#","Em"]) + p("O objetivo é ouvir uma linha de baixo mais suave, com menos saltos. Não precisa decorar nomes de inversões para perceber o efeito.") + callout("C/E: baixo E. G/B: baixo B. D/F#: baixo F#. As cordas marcadas com × ficam de fora."), "dark")
sequence(10,"Baixos",["C","G/B","Am","G"],"Compare com C → G → Am → G. Com G/B, o baixo faz C → B → A → G: uma descida que você consegue ouvir.",["C → G/B: toque a 5ª corda como baixo.","G/B → Am: o baixo desce de B para A.","Am → G: siga até G.","G → C: reinicie o desenho."])
sequence(11,"Baixos",["G","D/F#","Em","C"],"Compare com G → D → Em → C. O D/F# cria a descida G → F# → E no baixo antes de chegar a C.",["G → D/F#: o baixo está na 4ª corda, 4ª casa.","Não toque a 6ª nem a 5ª corda no D/F#.","D/F# → Em: o baixo desce de F# para E.","C → G: prepare a volta ao início."])
page("Ouça", "O baixo conta outra história", cards([("Antes", "G → D → Em → C"),("Depois", "G → D/F# → Em → C")]) + p("Toque uma volta de cada e cante apenas as notas mais graves. Na segunda versão, G → F# → E forma uma pequena descida.", "lead") + p("Se a forma D/F# exigir muito da mão, pratique só G → D/F# → Em sem batida. Depois devolva o C e o retorno.") + callout("Uma mudança pequena no baixo pode transformar a sensação de continuidade."))
page("Prática de 10 min", "Dez minutos com direção", steps(["2 min — revise as formas da sequência escolhida.", "3 min — pratique a primeira metade do caminho.", "3 min — toque a sequência inteira com quatro tempos por acorde.", "2 min — faça o loop contínuo, incluindo o retorno."]) + p("Mantenha o mesmo caminho ao longo da sessão. Amanhã você pode repeti-lo ou escolher outro.", "lead") + callout("Registre qual seta ainda pede atenção."), "orange")
page("Prática de 15 min", "Quinze minutos com pulso", steps(["3 min — monte cada forma com calma.", "4 min — faça as trocas que mais travam, inclusive a última para a primeira.", "4 min — toque a sequência com pulso estável.", "4 min — use uma batida simples e mantenha o ciclo."]) + p("Se o som perder clareza na última etapa, volte à contagem. Você não precisa terminar mais rápido; precisa terminar tocando melhor.", "lead") + callout("A rotina serve à música, não ao relógio."))
page("Checklist", "Antes de mudar de sequência", '<div class="checklist">' + ''.join(f'<div>□ {x}</div>' for x in ["Consigo montar os acordes individualmente.","Sei qual vem depois de cada um.","Faço as trocas lentamente.","Treinei o retorno ao primeiro acorde.","Mantenho uma pulsação simples.","Repito o ciclo sem parar completamente.","A sequência começa a parecer um único movimento."]) + '</div>' + callout("Se duas ou três respostas ainda forem ‘não’, continue nessa sequência por mais alguns dias."))
page("Evite", "Cinco erros comuns", steps(["Aprender vinte acordes antes de combinar dois.", "Trocar de sequência antes de reconhecer o caminho.", "Tocar rápido antes de tocar limpo.", "Esquecer a troca do último acorde para o primeiro.", "Estudar formas sem relação com o repertório atual só porque parecem avançadas."]) + callout("Estude o que ajuda você a tocar a próxima música com mais continuidade."), "dark")
page("Próximo passo", "Use o que você já conhece", p("O objetivo não é conhecer o maior número possível de acordes. É conseguir usar os que você conhece de maneira musical.", "lead") + p("Você não toca C. Para. Depois G. Para. Depois Am. Você toca um caminho:") + flow(["C","G","Am","F"]) + p("A música acontece justamente entre eles.", "big") + '<div class="signature"><strong>Felipe Figueroa</strong><br>Oficina do Violão<br>Toda semana, um próximo passo.</div>', "orange")
page("Comunidade", "Continue sua caminhada", p("O Ré Maior é o ponto de encontro da comunidade da Oficina do Violão para quem está começando, retomando ou quer continuar evoluindo.", "lead") + p("O nome representa o início dessa jornada. Compartilhe sua prática e siga dando o próximo passo.") + '<img class="qr" src="../assets/re-maior-qr.png" alt="QR Code para entrar no grupo Ré Maior">' + f'<a class="button" href="{escape(WHATSAPP_URL, quote=True)}">ENTRAR NO RÉ MAIOR ↗</a>' + p("Se estiver lendo no celular, toque no botão. Em outro aparelho, aponte a câmera para o QR Code.", "small"), "dark", cls="community")

def render():
    out = ['<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#080808"><title>Guia de Bolso: Acordes em Sequência | Oficina do Violão</title><link rel="stylesheet" href="ebook.css"></head><body>']
    for n,(section,title,body,tone,eyebrow,cls) in enumerate(pages,1):
        out.append(f'<section class="page {tone} {cls}" data-page="{n}">')
        if cls != "cover":
            out.append(f'<div class="page-top"><span>Oficina do Violão</span><span>{escape(section)}</span></div>')
            if eyebrow: out.append(f'<p class="eyebrow">{escape(eyebrow)}</p>')
            out.append(f'<h2>{escape(title)}</h2>')
        out.append(body)
        if cls != "cover": out.append(f'<span class="page-number">{n:02d}</span>')
        out.append('</section>')
    out.append('</body></html>')
    EBOOK.write_text('\n'.join(out), encoding='utf-8')
    print(f'{len(pages)} páginas HTML; {len(CHORDS)} diagramas validados.')

if __name__ == '__main__':
    validate_chords()
    for chord in CHORDS: diagram(chord)
    render()
