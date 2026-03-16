import { create } from "zustand"
import { ExcelRow } from "./readExcel"

type ExcelStore = {
  rows: ExcelRow[]
  setRows: (rows: ExcelRow[]) => void
  clearRows: () => void
}

export const useExcelStore = create<ExcelStore>((set) => ({
  rows: [],
  setRows: (rows) => set({ rows: rows }),
  clearRows: () => set({ rows: [] })
}))