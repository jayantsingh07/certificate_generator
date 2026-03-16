"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import DraggableText from "./components/DraggableText"

import { useExcelStore } from "@/lib/excelStore"
import { generateCertificates } from "@/lib/generateTemplates"

import { Button } from "@/components/ui/button"


export default function TemplatesPage() {
  const router = useRouter()
  const rows = useExcelStore((state) => state.rows)
  const [font, setFont] = useState("Noto Sans")
  const [isGenerating, setIsGenerating] = useState(false)

  const [image1, setImage1] = useState<string | null>(null)
  const [image2, setImage2] = useState<string | null>(null)

  const [template1, setTemplate1] = useState<File | null>(null)
  const [template2, setTemplate2] = useState<File | null>(null)

  const [editingImage, setEditingImage] = useState<"template1" | "template2" | null>(null)

  const [namePos1, setNamePos1] = useState({ x: 255, y: 170 })
  const [datePos1, setDatePos1] = useState({ x: 280, y: 230 })
  const [namePos2, setNamePos2] = useState({ x: 255, y: 475 })

  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 })

  const previewName = rows.length > 0 ? rows[0].name : "Preview Name"
  const previewDate = rows.length > 0 ? rows[0].date : "Preview Date"

  const [selectedText, setSelectedText] = useState<"name1" | "date1" | "name2">("name1")
  const [nameFontSize1, setNameFontSize1] = useState(25)
  const [dateFontSize1, setDateFontSize1] = useState(20)
  const [nameFontSize2, setNameFontSize2] = useState(30)

  const [color1, setColor1] = useState("white")
  const [color2, setColor2] = useState("white")

  const handleimage1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setTemplate1(file)
      setImage1(URL.createObjectURL(file))
    }
  }

  const handleimage2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setTemplate2(file)
      setImage2(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (rows.length === 0) {
      router.push("/")
    }
  }, [rows, router])

  const handleGenerate = async () => {
    if (isGenerating) return
    if (!template1 || !template2) {
      alert("Please upload both templates")
      return
    }
    try {
    setIsGenerating(true)

    await generateCertificates(rows, template1, template2, font, namePos1, datePos1, namePos2, previewSize, nameFontSize1, dateFontSize1, nameFontSize2, color1, color2 )}

    finally {
    setIsGenerating(false)
  }
  }

  return (
    <section className="min-h-screen bg-orange-300 p-11">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 flex flex-col">

        <div className="grid grid-cols-2 gap-6">
          {/* Image 1 upload section  */}
          <div className="border-2 border-blue-300 rounded-xl p-6 flex flex-col items-center justify-center">
            {!image1 ? (
              <label className="flex flex-col items-center justify-center cursor-pointer w-full">
                <span className="text-black mb-2 text-lg font-medium"> Upload Template </span>
                <span className="text-sm text-black"> Click to upload image </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleimage1}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={image1}
                  alt="Template Preview" />
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingImage("template1")}
                    className="border px-3 py-1 rounded bg-gray-600 text-white text-sm cursor-pointer"
                  >
                    Edit
                  </button>
                  <label className="cursor-pointer border px-3 py-1 rounded bg-black text-white text-sm">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleimage1}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Image 2 upload section  */}
          <div className="border-2 border-blue-300 rounded-xl p-6 flex flex-col items-center justify-center">
            {!image2 ? (
              <label className="flex flex-col items-center justify-center cursor-pointer w-full">
                <span className="text-black mb-2 text-lg font-medium"> Upload Template </span>
                <span className="text-sm text-black"> Click to upload image </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleimage2}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={image2}
                  alt="Template Preview" />
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingImage("template2")}
                    className="border px-3 py-1 rounded bg-gray-600 text-white text-sm cursor-pointer"
                  >
                    Edit
                  </button>
                  <label className="cursor-pointer px-3 py-1 rounded bg-black text-white text-sm">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleimage2}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
          {/* Generate Button  */}
        <div className="flex justify-center mt-10">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-10 py-3 text-lg cursor-pointer hover:bg-blue-500"
          >
            {isGenerating && <Loader2 className="w-5 h-5 animate-spin" />}
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div> 

      </div>

      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
          <div className="bg-white p-6 rounded-xl max-w-5xl w-full shadow-lg flex gap-6">

            <div className="flex-1 flex justify-center">
              <div className="relative inline-block">
                <img
                  src={editingImage === "template1" ? image1! : image2!}
                  className="max-h-[80vh] select-none"
                  onLoad={(e) => {
                    const img = e.currentTarget
                    setPreviewSize({
                      width: img.clientWidth,
                      height: img.clientHeight
                    })
                  }}
                />
                <DraggableText
                  label={previewName}
                  font={font}
                  position={
                    editingImage === "template1"
                      ? namePos1
                      : namePos2
                  }
                  setPosition={
                    editingImage === "template1"
                      ? setNamePos1
                      : setNamePos2
                  }
                  color={editingImage === "template1" ? color1 : color2}
                  fontSize={editingImage === "template1" ? nameFontSize1 : nameFontSize2}
                  onClick={() =>
                    setSelectedText(
                      editingImage === "template1" ? "name1" : "name2"
                    )
                  }
                />

                {editingImage === "template1" && (
                  <DraggableText
                    label={previewDate}
                    font={font}
                    position={datePos1}
                    setPosition={setDatePos1}
                    color={color1}
                    fontSize={dateFontSize1}
                    onClick={() => setSelectedText("date1")}
                  />
                )}
              </div>
            </div>

            {/* Settings  */}
            <div className="w-60 border-l pl-6 flex flex-col gap-4">
              <h3 className="font-extrabold">Settings </h3>
              {/* Font Select  */}
              <label className="text-sm"> Font </label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option>Poppins</option>
                <option>Roboto</option>
                <option>Noto Sans</option>
                <option>Cinzel</option>
              </select>

               {/* Text size controller settings  */}
              <div className="flex items-center justify-between mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Text Size
                </label>
                <span className="text-xs font-semibold px-4 py-1 bg-gray-100 rounded text-gray-700">
                  {selectedText === "name1"
                    ? `${nameFontSize1}px`
                    : selectedText === "date1"
                      ? `${dateFontSize1}px`
                      : `${nameFontSize2}px`}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                className="w-full accent-blue-600"
                value={
                  selectedText === "name1"
                    ? nameFontSize1
                    : selectedText === "date1"
                      ? dateFontSize1
                      : nameFontSize2
                }
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (selectedText === "name1") {
                    setNameFontSize1(value)
                  } else if (selectedText === "date1") {
                    setDateFontSize1(value)
                  } else {
                    setNameFontSize2(value)
                  }
                }}
              />

               {/* Text Colour Setting  */}
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Text Color
                </label>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() =>
                      editingImage === "template1"
                        ? setColor1("white")
                        : setColor2("white")
                    }
                    className="w-8 h-8 rounded border bg-white"
                  />
                  <button
                    onClick={() =>
                      editingImage === "template1"
                        ? setColor1("black")
                        : setColor2("black")
                    }
                    className="w-8 h-8 rounded border bg-black"
                  />

                </div>
              </div>

              <Button
                onClick={() => setEditingImage(null)}
                className="h-10 text-lg mt-auto py-2 bg-blue-500 text-white rounded cursor-pointer"
                >Save
              </Button>
            </div>
          </div>
        </div>)}

    </section>
  )
}