import * as XLSX from "xlsx"

export type ExcelRow = {
  name: string
  date: string
}

export async function readExcel(file: File): Promise<ExcelRow[]> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: "array" })

  const sheetName = workbook.SheetNames[0]
  if (!sheetName) throw new Error("No sheet found")

  const sheet = workbook.Sheets[sheetName]
  const data = XLSX.utils.sheet_to_json<Record<string, any>>(sheet)

  if (!data.length) throw new Error("Excel file is empty")

  const columns = Object.keys(data[0])

  const nameColumn = columns.find(c => c.toLowerCase() === "name")
  const dateColumn = columns.find(c => c.toLowerCase() === "date")

  if (!nameColumn || !dateColumn) {
    throw new Error("Excel must contain Name and Date columns")
  }

  return data.map((row, index) => {
    if (!row[nameColumn] || !row[dateColumn]) {
      throw new Error(`Missing data in row ${index + 2}`)
    }

    return {
      name: String(row[nameColumn]).trim(),
      date: String(row[dateColumn]).trim()
    }
  })
}