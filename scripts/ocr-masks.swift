import Foundation
import Vision
import AppKit
let input=URL(fileURLWithPath:CommandLine.arguments[1]);let output=URL(fileURLWithPath:CommandLine.arguments[2]);let paths=try JSONDecoder().decode([String].self,from:Data(contentsOf:input));var records:[String:[[String:Double]]]=[:]
for path in paths { autoreleasepool {guard let img=NSImage(contentsOfFile:path),let cg=img.cgImage(forProposedRect:nil,context:nil,hints:nil) else{return};let req=VNRecognizeTextRequest();req.recognitionLevel = .accurate;req.usesLanguageCorrection=false;do{try VNImageRequestHandler(cgImage:cg).perform([req]);records[path]=(req.results ?? []).map{r in let b=r.boundingBox;return ["x":b.minX*Double(cg.width),"y":(1-b.maxY)*Double(cg.height),"width":b.width*Double(cg.width),"height":b.height*Double(cg.height)]}}catch{records[path]=[]}}}
try JSONSerialization.data(withJSONObject:records,options:[.prettyPrinted]).write(to:output)
