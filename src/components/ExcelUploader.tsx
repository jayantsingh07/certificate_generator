"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { readExcel, ExcelRow } from "@/lib/readExcel"
import { useExcelStore } from "@/lib/excelStore"

import { Button } from "@/components/ui/button"

export default function ExcelUploader() {
  const router = useRouter();
  const setRows = useExcelStore((state) => state.setRows)

  const [data, setData] = useState<ExcelRow[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleFileUpload = async (file: File) => {
    try {
      setError(null)

      const parsed = await readExcel(file)
      setData(parsed)
    } catch (err: any) {
      setError(err.message)
      setData([])
    }
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)

    handleFileUpload(file)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2"> Upload Excel File </h1>
        <p className="text-sm text-gray-500 mb-6"> Upload an Excel file containing participant names and dates to generate it.</p>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-blue-500 transition">

          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={onFileChange}
          />

          <div className="text-center">
            <p className="text-gray-600 font-medium">
              Click to upload Excel file
            </p>
            <p className="text-sm text-gray-400">
              Excel must contain only
              <b className="text-red-600"> Name </b>
              and
              <b className="text-red-600"> Date </b>
              columns.
            </p>
          </div>

        </label>

        {error && (
          <div className="mt-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {fileName && !error && (
          <div className="mt-6 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
            File uploaded successfully: <b>{fileName}</b>
          </div>
        )}

        {data.length > 0 && (
          <div className="mt-6 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showPreview}
              onChange={() => setShowPreview(!showPreview)}
              className="w-4 h-4"
            />
            <span className="text-gray-600">Show Excel Preview</span>
          </div>
        )}

        {showPreview && data.length > 0 && (
          <div className="mt-4 border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-100 px-4 py-2 text-sm font-semibold">Excel Preview</div>
            <table className="w-full text-sm">

              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{row.name}</td>
                    <td className="p-3">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {fileName && !error && data.length > 0 &&  (
          <div className="mt-6">
            <Button
              onClick={() => {
                setRows(data)
                router.push("/templates")
              }}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}