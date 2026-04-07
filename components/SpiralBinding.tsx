'use client'

export default function SpiralBinding() {
  const circleRadius = 6
  const circleSpacing = 28
  const numCircles = 10
  const padding = 12

  const svgWidth = numCircles * circleSpacing + padding * 2
  const svgHeight = 32

  return (
    <div className="w-full flex justify-center py-md bg-garden-cream border-b border-garden-mint">
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-3/4 max-w-xs"
      >
        {/* Horizontal line */}
        <line
          x1={padding}
          y1={svgHeight / 2}
          x2={svgWidth - padding}
          y2={svgHeight / 2}
          stroke="#a8c184"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Spiral binding circles */}
        {Array.from({ length: numCircles }).map((_, i) => (
          <circle
            key={i}
            cx={padding + i * circleSpacing}
            cy={svgHeight / 2}
            r={circleRadius}
            fill="none"
            stroke="#f4d35e"
            strokeWidth="1.5"
            opacity="0.9"
          />
        ))}
      </svg>
    </div>
  )
}
