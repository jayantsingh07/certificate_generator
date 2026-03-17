import JSZip from "jszip"
import { saveAs } from "file-saver"
import { ExcelRow } from "./readExcel"

type Position = {
  x: number
  y: number
}

type PreviewSize = {
  width: number
  height: number
}

export async function generateCertificates(
  rows: ExcelRow[],
  template1: File,
  template2: File,
  name1Font: string,
  namePos1: Position,
  datePos1: Position,
  namePos2: Position,
  previewSize: PreviewSize,
  nameFontSize1: number,
  dateFontSize1: number,
  nameFontSize2: number,
  name1Color: string,
  name2Color: string,
  date1Font?: string,
  name2Font?: string,
  name1FontWeight?: number,
  date1FontWeight?: number,
  name2FontWeight?: number,
  date1Color?: string
) {
  // Set defaults for optional parameters
  const finalDate1Font = date1Font || name1Font
  const finalName2Font = name2Font || name1Font
  const finalName1Weight = name1FontWeight || 400
  const finalDate1Weight = date1FontWeight || 400
  const finalName2Weight = name2FontWeight || 400
  const finalDate1Color = date1Color || name1Color

  const zip = new JSZip()

  const img1 = new Image()
  img1.src = URL.createObjectURL(template1)
  await new Promise((r) => (img1.onload = r))

  const img2 = new Image()
  img2.src = URL.createObjectURL(template2)
  await new Promise((r) => (img2.onload = r))

  // Load all the fonts with their weights
  await document.fonts.load(`${finalName1Weight} ${nameFontSize1}px ${name1Font}`)
  await document.fonts.load(`${finalDate1Weight} ${dateFontSize1}px ${finalDate1Font}`)
  await document.fonts.load(`${finalName2Weight} ${nameFontSize2}px ${finalName2Font}`)

  for (const row of rows) {

    /* ---------------- TEMPLATE 1 ---------------- */

    const canvas1 = document.createElement("canvas")
    canvas1.width = img1.width
    canvas1.height = img1.height

    const ctx1 = canvas1.getContext("2d")
    if (!ctx1) continue

    ctx1.drawImage(img1, 0, 0)

    const scaleX = canvas1.width / previewSize.width
    const scaleY = canvas1.height / previewSize.height

    const nameX = namePos1.x * scaleX
    const nameY = namePos1.y * scaleY

    const dateX = datePos1.x * scaleX
    const dateY = datePos1.y * scaleY

    const scaledNameSize1 = nameFontSize1 * scaleX
    const scaledDateSize1 = dateFontSize1 * scaleX

    ctx1.textAlign = "center"
    ctx1.textBaseline = "middle"

    ctx1.fillStyle = name1Color
    ctx1.font = `${finalName1Weight} ${scaledNameSize1}px ${name1Font}`
    ctx1.fillText(row.name, nameX, nameY)

    ctx1.fillStyle = finalDate1Color
    ctx1.font = `${finalDate1Weight} ${scaledDateSize1}px ${finalDate1Font}`
    ctx1.fillText(row.date, dateX, dateY)

    const blob1: Blob = await new Promise((resolve) =>
      canvas1.toBlob((b) => resolve(b as Blob), "image/png")
    )
    zip.file(`${row.name}_image1.png`, blob1)

    /* ---------------- TEMPLATE 2 ---------------- */

    const canvas2 = document.createElement("canvas")
    canvas2.width = img2.width
    canvas2.height = img2.height

    const ctx2 = canvas2.getContext("2d")
    if (!ctx2) continue

    ctx2.drawImage(img2, 0, 0)

    const scaleX2 = canvas2.width / previewSize.width
    const scaleY2 = canvas2.height / previewSize.height

    const nameX2 = namePos2.x * scaleX2
    const nameY2 = namePos2.y * scaleY2

    const scaledNameSize2 = nameFontSize2 * scaleX2

    ctx2.textAlign = "center"
    ctx2.textBaseline = "middle"

    ctx2.fillStyle = name2Color
    ctx2.font = `${finalName2Weight} ${scaledNameSize2}px ${finalName2Font}`
    ctx2.fillText(row.name, nameX2, nameY2)

    const blob2: Blob = await new Promise((resolve) =>
      canvas2.toBlob((b) => resolve(b as Blob), "image/png")
    )
    zip.file(`${row.name}_image2.png`, blob2)
  }

  const zipBlob = await zip.generateAsync({ type: "blob" })
  saveAs(zipBlob, "Generated.zip")
}
