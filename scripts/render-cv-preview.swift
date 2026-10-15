// Renders the first page of the CV PDF to JPEG previews (macOS only, uses PDFKit).
// Usage: swift scripts/render-cv-preview.swift <input.pdf> <output-prefix>
import AppKit
import PDFKit

let args = CommandLine.arguments
guard args.count >= 3 else {
  print("Usage: swift scripts/render-cv-preview.swift <input.pdf> <output-prefix>")
  exit(1)
}

guard let doc = PDFDocument(url: URL(fileURLWithPath: args[1])), let page = doc.page(at: 0) else {
  print("Could not open \(args[1])")
  exit(1)
}

if doc.pageCount > 1 {
  print("Warning: the PDF has \(doc.pageCount) pages; only the first one is rendered.")
}

let bounds = page.bounds(for: .mediaBox)

for width in [800, 1400] {
  let scale = CGFloat(width) / bounds.width
  let height = Int((bounds.height * scale).rounded())
  let rep = NSBitmapImageRep(
    bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height,
    bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
    colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!

  NSGraphicsContext.saveGraphicsState()
  let context = NSGraphicsContext(bitmapImageRep: rep)!
  NSGraphicsContext.current = context
  let cg = context.cgContext
  cg.setFillColor(NSColor.white.cgColor)
  cg.fill(CGRect(x: 0, y: 0, width: width, height: height))
  cg.interpolationQuality = .high
  cg.scaleBy(x: scale, y: scale)
  cg.translateBy(x: -bounds.origin.x, y: -bounds.origin.y)
  page.draw(with: .mediaBox, to: cg)
  NSGraphicsContext.restoreGraphicsState()

  let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.82])!
  let out = "\(args[2])-\(width).jpg"
  try! data.write(to: URL(fileURLWithPath: out))
  print("Wrote \(out) (\(width)x\(height), \(data.count / 1024) KB)")
}
