interface BubbleProps {
  className?: string
  style?: React.CSSProperties
  isUser: boolean
  children: React.ReactNode
}

export default function Bubble(props: BubbleProps) {
  return (
    <div className={props.className} style={props.style}>
      {props.children}
    </div>
  )
}
