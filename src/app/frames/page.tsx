"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Upload, Edit3, Download, ArrowLeft, Copy, RotateCcw, X } from "lucide-react"

import DraggableText from "./components/DraggableText"

import { usePujaDataStore } from "@/lib/pujaDataStore"
import { generatePujaFrames } from "@/lib/generateFrames"

import { Button } from "@/components/ui/button"

// Color palette
const COLOR_PALETTE = [
  { name: "White", value: "white", hex: "#ffffff" },
  { name: "Black", value: "black", hex: "#000000" },
  { name: "Gold", value: "#fbbf24", hex: "#fbbf24" },
  { name: "Silver", value: "#e5e7eb", hex: "#e5e7eb" },
  { name: "Blue", value: "#3b82f6", hex: "#3b82f6" },
  { name: "Purple", value: "#a855f7", hex: "#a855f7" },
  { name: "Red", value: "#ef4444", hex: "#ef4444" },
  { name: "Green", value: "#10b981", hex: "#10b981" },
  { name: "Navy", value: "#001f3f", hex: "#001f3f" },
  { name: "Cream", value: "#fffacd", hex: "#fffacd" },
]

const FONTS = ["Poppins", "Roboto", "Noto Sans", "Cinzel"]

export default function PujaFramesPage() {
  const router = useRouter()
  const participants = usePujaDataStore((state) => state.participants)
  const [isGenerating, setIsGenerating] = useState(false)

  const [image1, setImage1] = useState<string | null>(null)
  const [image2, setImage2] = useState<string | null>(null)

  const [frame1, setFrame1] = useState<File | null>(null)
  const [frame2, setFrame2] = useState<File | null>(null)

  const [editingImage, setEditingImage] = useState<"frame1" | "frame2" | null>(null)

  // Positions
  const [namePos1, setNamePos1] = useState({ x: 255, y: 170 })
  const [datePos1, setDatePos1] = useState({ x: 280, y: 230 })
  const [namePos2, setNamePos2] = useState({ x: 255, y: 475 })

  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 })

  const previewName = participants.length > 0 ? participants[0].name : "Preview Name"
  const previewDate = participants.length > 0 ? participants[0].date : "Preview Date"

  // Text styling for Frame 1 - Name
  const [name1FontSize, setName1FontSize] = useState(25)
  const [name1Font, setName1Font] = useState("Noto Sans")
  const [name1Color, setName1Color] = useState("#ffffff")
  const [name1FontWeight, setName1FontWeight] = useState(400)

  // Text styling for Frame 1 - Date
  const [date1FontSize, setDate1FontSize] = useState(20)
  const [date1Font, setDate1Font] = useState("Noto Sans")
  const [date1Color, setDate1Color] = useState("#ffffff")
  const [date1FontWeight, setDate1FontWeight] = useState(400)

  // Text styling for Frame 2 - Name
  const [name2FontSize, setName2FontSize] = useState(30)
  const [name2Font, setName2Font] = useState("Noto Sans")
  const [name2Color, setName2Color] = useState("#ffffff")
  const [name2FontWeight, setName2FontWeight] = useState(400)

  // Track which element is being edited
  const [selectedText, setSelectedText] = useState<"name1" | "date1" | "name2">("name1")

  const handleFrame1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFrame1(file)
      setImage1(URL.createObjectURL(file))
    }
  }

  const handleFrame2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFrame2(file)
      setImage2(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (participants.length === 0) {
      router.push("/")
    }
  }, [participants, router])

  // Helper function to get current font for selected text
  const getCurrentFont = () => {
    if (selectedText === "name1") return name1Font
    if (selectedText === "date1") return date1Font
    return name2Font
  }

  // Helper function to get current color for selected text
  const getCurrentColor = () => {
    if (selectedText === "name1") return name1Color
    if (selectedText === "date1") return date1Color
    return name2Color
  }

  // Helper function to get current size for selected text
  const getCurrentSize = () => {
    if (selectedText === "name1") return name1FontSize
    if (selectedText === "date1") return date1FontSize
    return name2FontSize
  }

  // Helper function to get current font weight for selected text
  const getCurrentFontWeight = () => {
    if (selectedText === "name1") return name1FontWeight
    if (selectedText === "date1") return date1FontWeight
    return name2FontWeight
  }

  // Helper to update current text properties
  const updateCurrentFont = (newFont: string) => {
    if (selectedText === "name1") setName1Font(newFont)
    if (selectedText === "date1") setDate1Font(newFont)
    if (selectedText === "name2") setName2Font(newFont)
  }

  const updateCurrentSize = (newSize: number) => {
    if (selectedText === "name1") setName1FontSize(newSize)
    if (selectedText === "date1") setDate1FontSize(newSize)
    if (selectedText === "name2") setName2FontSize(newSize)
  }

  const updateCurrentColor = (newColor: string) => {
    if (selectedText === "name1") setName1Color(newColor)
    if (selectedText === "date1") setDate1Color(newColor)
    if (selectedText === "name2") setName2Color(newColor)
  }

  const updateCurrentFontWeight = (newWeight: number) => {
    if (selectedText === "name1") setName1FontWeight(newWeight)
    if (selectedText === "date1") setDate1FontWeight(newWeight)
    if (selectedText === "name2") setName2FontWeight(newWeight)
  }

  const handleGenerate = async () => {
    if (isGenerating) return
    if (!frame1 || !frame2) {
      alert("Please upload both frames")
      return
    }
    try {
      setIsGenerating(true)
      await generatePujaFrames(
        participants, 
        frame1, 
        frame2, 
        name1Font, 
        namePos1, 
        datePos1, 
        namePos2, 
        previewSize, 
        name1FontSize, 
        date1FontSize, 
        name2FontSize, 
        name1Color, 
        name2Color,
        date1Font,
        name2Font,
        name1FontWeight,
        date1FontWeight,
        name2FontWeight,
        date1Color
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="min-h-screen gradient-primary p-6 md:p-12">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-l from-purple-400/25 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-blue-400/25 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-gradient-to-r from-pink-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.75s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Modern Header */}
        <div className="mb-12 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="glass p-3 rounded-full hover:bg-white/15 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 text-white group-hover:text-white/90" />
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Customize Video Frames</h1>
              <p className="text-white/70 mt-2">Upload frames and customize text positioning & styling for HKM Puja</p>
            </div>
          </div>
          <div className="glass px-6 py-3 rounded-full text-white/90 text-sm font-semibold whitespace-nowrap">
            <span className="text-purple-300">Step 2</span> of 2
          </div>
        </div>

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Frame Upload Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Opening Frame */}
            <div className="card-glass rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300">
              
              <div className="p-8">
                {!image1 ? (
                  <label className="flex flex-col items-center justify-center cursor-pointer w-full border-2 border-dashed border-white/30 rounded-3xl p-16 hover:border-white/60 hover:bg-white/5 transition-all duration-300 group">
                    <Upload className="w-14 h-14 text-white/70 group-hover:text-white/90 mb-4 transition-colors" />
                    <span className="text-lg font-semibold text-white">Upload Opening Frame</span>
                    <span className="text-sm text-white/60 mt-3">Click or drag image here</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFrame1}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-glass">
                      <img
                        src={image1}
                        alt="Opening Frame Preview"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex gap-3 w-full">
                      <button
                        onClick={() => setEditingImage("frame1")}
                        className="flex-1 flex items-center justify-center gap-2 btn-gradient group"
                      >
                        <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Edit Positions
                      </button>
                      <label className="flex-1 flex items-center justify-center gap-2 glass hover:bg-white/15 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer group">
                        <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Change
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFrame1}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Closing Frame */}
            <div className="card-glass rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300">
              <div className="p-8">
                {!image2 ? (
                  <label className="flex flex-col items-center justify-center cursor-pointer w-full border-2 border-dashed border-white/30 rounded-3xl p-16 hover:border-white/60 hover:bg-white/5 transition-all duration-300 group">
                    <Upload className="w-14 h-14 text-white/70 group-hover:text-white/90 mb-4 transition-colors" />
                    <span className="text-lg font-semibold text-white">Upload Background Frame</span>
                    <span className="text-sm text-white/60 mt-3">Click or drag image here</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFrame2}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-glass">
                      <img
                        src={image2}
                        alt="Closing Frame Preview"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex gap-3 w-full">
                      <button
                        onClick={() => setEditingImage("frame2")}
                        className="flex-1 flex items-center justify-center gap-2 btn-gradient group"
                      >
                        <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Edit Positions
                      </button>
                      <label className="flex-1 flex items-center justify-center gap-2 glass hover:bg-white/15 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer group">
                        <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Change
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFrame2}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !image1 || !image2}
              className={`flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300 transform ${
                isGenerating || !image1 || !image2
                  ? 'glass opacity-50 cursor-not-allowed'
                  : 'btn-gradient hover:shadow-2xl hover:shadow-purple-500/50'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Video Frames...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Generate All Video Frames
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal - Desktop Only */}
      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/50 p-4 animate-fade-in">
          <div className="bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md rounded-3xl w-full max-w-6xl h-[calc(100vh-40px)] shadow-2xl flex flex-col overflow-hidden border border-white/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white flex items-center justify-between flex-shrink-0 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold">Edit {editingImage === "frame1" ? "Opening" : "Closing"} Frame</h2>
                <p className="text-white/80 text-sm mt-1">Drag text to reposition and use controls to customize styling</p>
              </div>
              <button
                onClick={() => setEditingImage(null)}
                className="text-white/80 hover:text-white flex-shrink-0 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left: Canvas Preview (Larger) */}
              <div className="flex-1 border-r border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center overflow-auto">
                <div className="relative inline-block max-w-full max-h-full rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={editingImage === "frame1" ? image1! : image2!}
                    className="max-w-full max-h-[calc(100vh-200px)] h-auto select-none"
                    onLoad={(e) => {
                      const img = e.currentTarget
                      setPreviewSize({
                        width: img.clientWidth,
                        height: img.clientHeight
                      })
                    }}
                  />
                  {/* Name Text */}
                  <DraggableText
                    label={previewName}
                    font={editingImage === "frame1" ? name1Font : name2Font}
                    position={editingImage === "frame1" ? namePos1 : namePos2}
                    setPosition={editingImage === "frame1" ? setNamePos1 : setNamePos2}
                    color={editingImage === "frame1" ? name1Color : name2Color}
                    fontSize={editingImage === "frame1" ? name1FontSize : name2FontSize}
                    fontWeight={editingImage === "frame1" ? name1FontWeight : name2FontWeight}
                    onClick={() => setSelectedText(editingImage === "frame1" ? "name1" : "name2")}
                  />

                  {/* Date Text (only for Opening Frame) */}
                  {editingImage === "frame1" && (
                    <DraggableText
                      label={previewDate}
                      font={date1Font}
                      position={datePos1}
                      setPosition={setDatePos1}
                      color={date1Color}
                      fontSize={date1FontSize}
                      fontWeight={date1FontWeight}
                      onClick={() => setSelectedText("date1")}
                    />
                  )}
                </div>
              </div>

              {/* Right: Controls (Compact) */}
              <div className="w-96 flex-shrink-0 border-l border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 overflow-y-auto flex flex-col gap-6">
                <h3 className="text-lg font-bold text-gray-900">Text Settings</h3>

                {/* Element Selection */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Element</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedText("name1")}
                      className={`flex-1 p-3 rounded-xl font-semibold transition-all ${
                        selectedText === "name1"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Name
                    </button>
                    {editingImage === "frame1" && (
                      <button
                        onClick={() => setSelectedText("date1")}
                        className={`flex-1 p-3 rounded-xl font-semibold transition-all ${
                          selectedText === "date1"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Date
                      </button>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4"></div>

                {/* Font Family */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Font</label>
                  <select
                    value={getCurrentFont()}
                    onChange={(e) => updateCurrentFont(e.target.value)}
                    className="input-modern w-full"
                  >
                    {FONTS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Font Size */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">Size</label>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-bold text-xs">
                      {getCurrentSize()}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={getCurrentSize()}
                    onChange={(e) => updateCurrentSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                {/* Font Weight */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">Weight</label>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-bold text-xs">
                      {getCurrentFontWeight()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={getCurrentFontWeight()}
                    onChange={(e) => updateCurrentFontWeight(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                {/* Text Color - Color Wheel */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={getCurrentColor()}
                      onChange={(e) => updateCurrentColor(e.target.value)}
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-purple-500 transition-colors"
                    />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">Current</p>
                      <div
                        className="w-full h-12 rounded-lg border border-gray-300"
                        style={{ backgroundColor: getCurrentColor() }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Click to open color picker</p>
                </div>

                {/* Save & Close */}
                <button
                  onClick={() => setEditingImage(null)}
                  className="btn-primary w-full mt-auto"
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
