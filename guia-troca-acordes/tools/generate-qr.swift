import AppKit
import CoreImage.CIFilterBuiltins
import Foundation

let config = try String(contentsOfFile: "config.js", encoding: .utf8)
let pattern = try NSRegularExpression(pattern: #"reMaiorUrl:\s*"([^"]+)""#)
guard let match = pattern.firstMatch(in: config, range: NSRange(config.startIndex..., in: config)),
      let range = Range(match.range(at: 1), in: config) else {
  fatalError("reMaiorUrl não encontrado em config.js")
}
let url = String(config[range])
let output = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "assets/re-maior-qr.png"
let filter = CIFilter.qrCodeGenerator()
filter.message = Data(url.utf8)
filter.correctionLevel = "H"
guard let image = filter.outputImage,
      let enlarged = CIContext().createCGImage(image.transformed(by: CGAffineTransform(scaleX: 12, y: 12)), from: image.extent.applying(CGAffineTransform(scaleX: 12, y: 12))) else {
  fatalError("Não foi possível gerar o QR Code")
}
let rep = NSBitmapImageRep(cgImage: enlarged)
guard let data = rep.representation(using: .png, properties: [:]) else {
  fatalError("Não foi possível codificar o PNG")
}
try data.write(to: URL(fileURLWithPath: output))
print("QR Code criado: \(output)")
