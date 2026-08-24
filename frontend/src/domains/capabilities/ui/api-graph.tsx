import { CENTER, INTEGRATION_NODES, VIEWBOX } from '../lib/nodes'

/** SVG-граф: «электрические» линии от интеграций сходятся к центральному API. */
export function ApiGraph() {
  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <svg
        viewBox={`0 0 ${String(VIEWBOX.width)} ${String(VIEWBOX.height)}`}
        className="h-auto w-full"
        role="img"
        aria-label="Интеграции внешних API, сходящиеся к центральному ядру API"
      >
        <defs>
          <linearGradient id="wire-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
          <filter id="wire-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {INTEGRATION_NODES.map((node, index) => {
          const path = `M ${String(node.x)} ${String(node.y)} Q ${String(
            (node.x + CENTER.x) / 2
          )} ${String(node.y)} ${String(CENTER.x)} ${String(CENTER.y)}`
          return (
            <g key={node.id}>
              {/* базовая линия */}
              <path d={path} fill="none" stroke="var(--color-border)" strokeWidth={2} />
              {/* бегущий ток */}
              <path
                d={path}
                fill="none"
                stroke="url(#wire-gradient)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray="14 26"
                filter="url(#wire-glow)"
                className="wire-animated"
                style={{
                  animation: `wire-flow 3.4s linear infinite, wire-pulse 3s ease-in-out infinite`,
                  animationDelay: `${String(index * 0.25)}s`
                }}
              />
            </g>
          )
        })}

        {/* Пульсирующее кольцо вокруг центра */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={70}
          fill="none"
          stroke="url(#wire-gradient)"
          strokeWidth={2}
          className="wire-animated"
          style={{ animation: 'wire-pulse 2.4s ease-in-out infinite' }}
        />
      </svg>

      {/* HTML-чипы поверх SVG для чёткого текста */}
      {INTEGRATION_NODES.map((node) => (
        <span
          key={node.id}
          className="node-pulse absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold shadow-sm"
          style={{
            left: `${String((node.x / VIEWBOX.width) * 100)}%`,
            top: `${String((node.y / VIEWBOX.height) * 100)}%`,
            animation: 'node-glow 3s ease-in-out infinite'
          }}
        >
          {node.label}
        </span>
      ))}

      {/* Центральное ядро API */}
      <span
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-br from-accent to-primary px-6 py-3 text-2xl font-black tracking-wide text-primary-foreground shadow-2xl"
        style={{
          left: `${String((CENTER.x / VIEWBOX.width) * 100)}%`,
          top: `${String((CENTER.y / VIEWBOX.height) * 100)}%`
        }}
      >
        API
      </span>
    </div>
  )
}
