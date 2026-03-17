"use client"

import { useState, useRef, useEffect } from "react"

interface Props {
  label: string
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
  color?: string
  fontSize?: number
  font?: string
  fontWeight?: number | string
  onClick?: () => void
}

export default function DraggableText({
  label,
  position,
  setPosition,
  color = "red",
  fontSize = 30,
  font = "Poppins",
  fontWeight = "normal",
  onClick
}: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const elementRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (elementRef.current) {
      parentRef.current = elementRef.current.parentElement as HTMLDivElement
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    
    if (!parentRef.current) return

    const rect = parentRef.current.getBoundingClientRect()
    const elementRect = elementRef.current!.getBoundingClientRect()

    // Calculate offset from mouse to element center
    const offsetX = e.clientX - elementRect.left - elementRect.width / 2
    const offsetY = e.clientY - elementRect.top - elementRect.height / 2

    setDragOffset({ x: offsetX, y: offsetY })
    setIsDragging(true)
  }

  useEffect(() => {
    if (!isDragging || !parentRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parentRef.current!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setPosition({ x, y })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, setPosition])

  return (
    <div
      ref={elementRef}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        color,
        fontSize: `${fontSize}px`,
        fontFamily: font,
        fontWeight: fontWeight,
        cursor: isDragging ? "grabbing" : "grab",
        whiteSpace: "nowrap",
        userSelect: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        transition: isDragging ? "none" : "all 0.2s ease",
        boxShadow: isDragging ? "0 8px 24px rgba(0, 0, 0, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: isDragging ? "rgba(0, 0, 0, 0.1)" : "transparent",
        border: isDragging ? "2px solid currentColor" : "2px solid transparent"
      }}
    >
      {label}
    </div>
  )
}