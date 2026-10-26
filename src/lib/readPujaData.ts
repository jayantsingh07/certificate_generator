import * as XLSX from "xlsx"

export type PujaParticipant = {
  name: string
  date: string
}

function formatExcelDate(value: any): string {
  let date: Date | null = null

  // Case 1: Excel serial number
  if (typeof value === "number") {
    const parsed = XLSX.SSF.parse_date_code(value)
    if (!parsed) return ""

    date = new Date(parsed.y, parsed.m - 1, parsed.d)
  }

  // Case 2: String formats
  else if (typeof value === "string") {
    const trimmed = value.trim()

    // Try parsing directly (handles "Thursday, March 19, 2026")
    const parsedDate = new Date(trimmed)

    if (!isNaN(parsedDate.getTime())) {
      date = parsedDate
    } else {
      // Fallback for DD-MM-YYYY or YYYY-MM-DD
      const parts = trimmed.split("-").map(p => parseInt(p, 10))

      if (parts.length === 3) {
        if (parts[0] > 31) {
          // YYYY-MM-DD
          date = new Date(parts[0], parts[1] - 1, parts[2])
        } else {
          // DD-MM-YYYY
          date = new Date(parts[2], parts[1] - 1, parts[0])
        }
      }
    }
  }

  if (!date || isNaN(date.getTime())) return ""

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

export async function readPujaData(file: File): Promise<PujaParticipant[]> {
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
      date: formatExcelDate(row[dateColumn]).trim()
    }
  })
}
