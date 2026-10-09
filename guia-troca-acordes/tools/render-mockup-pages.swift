import AppKit
import Foundation
import PDFKit

let pdfURL = URL(fileURLWithPath: "ebook/guia-troca-acordes.pdf")
guard let pdf = PDFDocument(url: pdfURL) else {
  fatalError("PDF não encontrado em ebook/guia-troca-acordes.pdf")
}

for (index, output) in [(0, "mockups/capa.png"), (15, "mockups/miolo.png")] {
  guard let page = pdf.page(at: index) else { fatalError("Página \(index + 1) não encontrada") }
  let image = page.thumbnail(of: NSSize(width: 888, height: 1260), for: .mediaBox)
  guard let tiff = image.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiff),
        let png = bitmap.representation(using: .png, properties: [:]) else {
    fatalError("Não foi possível renderizar a página \(index + 1)")
  }
  try png.write(to: URL(fileURLWithPath: output))
  print("Criado \(output)")
}
