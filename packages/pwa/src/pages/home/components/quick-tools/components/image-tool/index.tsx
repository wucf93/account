import { useImageTool } from '@/hooks'
import clsx from 'classnames'
import { useRef } from 'react'

interface ImageToolProps {
  className?: string
  style?: React.CSSProperties
}

export default function ImageTool(props: ImageToolProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { imageScan } = useImageTool()

  return (
    <>
      <div
        className={clsx('flex flex-col justify-center', props.className)}
        style={props.style}
      >
        <div
          className="w-12 h-12 flex items-center justify-center bg-purple-200 rounded-xl"
          onClick={() => inputRef.current?.click()}
        >
          <i className="ri-camera-fill text-3xl text-purple-500" />
        </div>
        <span className="text-xs mt-1.5 text-gray-500">图片识别</span>
      </div>

      <input
        hidden
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            imageScan(e.target.files[0])
          }
          if (inputRef.current?.value) {
            inputRef.current.value = ''
          }
        }}
      />
    </>
  )
}
