"use client"

interface Props {
  label: string
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
  color?: string
  fontSize?: number
  font?: string
  onClick?: () => void
}

export default function DraggableText({
  label,
  position,
  setPosition,
  color = "red",
  fontSize = 30,
  font = "Poppins",
  onClick
}: Props) {

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {

    const rect =
      e.currentTarget.parentElement!.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })
  }

  return (
    <div
      draggable
      onClick={onClick}
      onDragEnd={handleDragEnd}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        color,
        fontSize: `${fontSize}px`,
        fontFamily: font,
        fontWeight: "bold",
        cursor: "move",
        whiteSpace: "nowrap",
        userSelect: "none"
      }}
    >
      {label}
    </div>
  )
}