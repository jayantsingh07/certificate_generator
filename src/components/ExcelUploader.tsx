"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, CheckCircle2, AlertCircle, Eye, EyeOff, ArrowRight } from "lucide-react"

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
  const [isDragging, setIsDragging] = useState(false)

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

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = () => {
    setIsDragging(false)
  }

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setFileName(file.name)
      handleFileUpload(file)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-2xl slide-up">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl mb-6">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">Certificate Generator</h1>
          <p className="text-xl text-white/80">Upload your Excel file and create beautiful certificates in seconds</p>
        </div>

        {/* Main Card */}
        <div className="card-elevated p-8 md:p-10">
          {/* Upload Area */}
          <label 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-16 cursor-pointer transition-all duration-300 ${
              isDragging 
                ? 'border-purple-400 bg-purple-50 scale-105' 
                : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
            }`}
          >
            <input
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={onFileChange}
            />

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Upload className="w-12 h-12 text-purple-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Click to upload Excel file
              </p>
              <p className="text-sm text-gray-500">
                Or drag and drop your file here
              </p>
              <p className="text-xs text-gray-400 mt-3">
                Supported formats: <span className="font-semibold text-gray-600">.xlsx, .xls</span>
              </p>
            </div>
          </label>

          {/* Requirements */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-blue-900">Requirements:</span> Excel file must contain exactly two columns:
            </p>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded">1</span>
                <span className="text-sm text-gray-700"><span className="font-semibold">Name</span> column</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded">2</span>
                <span className="text-sm text-gray-700"><span className="font-semibold">Date</span> column</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 animate-in slide-in-from-top">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900">Upload Failed</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {fileName && !error && (
            <div className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3 animate-in slide-in-from-top">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900">File uploaded successfully!</p>
                <p className="text-sm text-emerald-700">{fileName}</p>
              </div>
            </div>
          )}

          {/* Preview Toggle */}
          {data.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? 'Hide' : 'Show'} Excel Preview ({data.length} records)
              </button>
            </div>
          )}

          {/* Preview Table */}
          {showPreview && data.length > 0 && (
            <div className="mt-6 border rounded-xl overflow-hidden shadow-sm animate-in slide-in-from-top">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white font-semibold">
                Data Preview
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left font-semibold text-gray-900">Name</th>
                      <th className="p-4 text-left font-semibold text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index} className="border-t hover:bg-purple-50 transition-colors">
                        <td className="p-4 text-gray-700">{row.name}</td>
                        <td className="p-4 text-gray-700">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Continue Button */}
          {fileName && !error && data.length > 0 &&  (
            <div className="mt-8">
              <button
                onClick={() => {
                  setRows(data)
                  router.push("/templates")
                }}
                className="w-full btn-primary flex items-center justify-center gap-2 group"
              >
                Continue to Templates
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-white/70 text-sm">
          <p>🎓 Create professional certificates instantly</p>
        </div>
      </div>
    </div>
  )
}