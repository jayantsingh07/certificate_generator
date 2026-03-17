"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, CheckCircle2, AlertCircle, Eye, EyeOff, ArrowRight, Sparkles, BarChart3, Film, Package } from "lucide-react"

import { readPujaData, PujaParticipant } from "@/lib/readPujaData"
import { usePujaDataStore } from "@/lib/pujaDataStore"

import { Button } from "@/components/ui/button"

export default function PujaFrameUploader() {
  const router = useRouter();
  const setParticipants = usePujaDataStore((state) => state.setParticipants)

  const [data, setData] = useState<PujaParticipant[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = async (file: File) => {
    try {
      setError(null)

      const parsed = await readPujaData(file)
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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 py-12 relative">
      {/* Decorative background elements - modernized */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-l from-blue-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.75s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl slide-up">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="glass-light p-4 rounded-full inline-flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}} />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            HKM Puja Video Frames
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed">
            Create stunning puja video frames for HKM Mumbai with participant names and dates
          </p>
        </div>

        {/* Main Card */}
        <div className="card-glass rounded-3xl p-8 md:p-12">
          {/* Upload Area */}
          <label 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-3xl py-16 md:py-20 cursor-pointer transition-all duration-300 relative group ${
              isDragging 
                ? 'border-purple-400 bg-gradient-to-b from-purple-500/20 to-transparent scale-105' 
                : 'border-white/30 hover:border-white/60 hover:bg-white/5'
            }`}
          >
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={onFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-opacity"></div>
                <Upload className="w-16 h-16 text-white/60 group-hover:text-white relative transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-xl text-white font-semibold">
                  Upload Participant List
                </p>
                <p className="text-sm text-white/60 mt-1">
                  Drag & drop your Excel file or click to browse
                </p>
              </div>
            </div>
          </label>

          {/* File Status */}
          {fileName && !error && (
            <div className="mt-8 p-4 rounded-xl bg-emerald-500/15 border border-emerald-400/50 glass-light flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-emerald-100 font-medium">Participants loaded</p>
                <p className="text-emerald-200/70 text-sm">{fileName}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 rounded-xl bg-red-500/15 border border-red-400/50 glass-light flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-100 font-medium">Error loading file</p>
                <p className="text-red-200/70 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Data Preview */}
          {data.length > 0 && (
            <div className="mt-8">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors mb-4"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? "Hide" : "Show"} Preview ({data.length} participants)
              </button>

              {showPreview && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {data.slice(0, 6).map((row, i) => (
                    <div key={i} className="card-glass rounded-lg p-4 fade-in">
                      <p className="text-white/60 text-xs uppercase font-semibold mb-1">Participant {i + 1}</p>
                      <p className="text-white font-medium truncate">{row.name}</p>
                      <p className="text-white/60 text-sm">{row.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Continue Button */}
          {data.length > 0 && !error && (
            <button
              onClick={() => {
                setParticipants(data)
                router.push('/frames')
              }}
              className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              Proceed to Frame Configuration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-white/10">
            <BarChart3 className="w-10 h-10 text-white/80 mb-3" />
            <h3 className="text-white font-semibold mb-2">Excel Format</h3>
            <p className="text-white/60 text-sm">Columns: Name, Date</p>
          </div>
          <div className="card-glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-white/10">
            <Film className="w-10 h-10 text-white/80 mb-3" />
            <h3 className="text-white font-semibold mb-2">Two Frames</h3>
            <p className="text-white/60 text-sm">Opening and closing puja frames</p>
          </div>
          <div className="card-glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-white/10">
            <Package className="w-10 h-10 text-white/80 mb-3" />
            <h3 className="text-white font-semibold mb-2">Download</h3>
            <p className="text-white/60 text-sm">Get all frames as ZIP file</p>
          </div>
        </div>
      </div>
    </div>
  )
}
