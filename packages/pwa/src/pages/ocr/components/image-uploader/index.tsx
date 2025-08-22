import React from 'react'
import classnames from 'classnames'

type ImageUploaderProps = {
  image: string | null
  loading: boolean
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearImage: () => void
  transaction?: any
}

export default function ImageUploader({
  image,
  loading,
  onImageUpload,
  onClearImage,
  transaction,
}: ImageUploaderProps) {
  // 用于引用文件输入元素
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // 触发文件选择
  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={classnames(
        'rounded-lg global-bg-soft-color transition-all duration-500 ease-in-out',
        { 'p-4': !image },
        !transaction ? (!image ? 'h-52' : 'h-82') : 'h-36'
      )}
    >
      <div
        className={`relative p-3 h-full w-full overflow-hidden rounded-lg text-center ${!image ? 'border-2 border-dashed border-gray-300 dark:border-gray-600' : 'border-0'} `}
      >
        {image ? (
          <div className="h-full flex flex-col">
            <img
              src={image}
              alt="预览图"
              className="max-h-full w-auto rounded-lg mx-auto object-contain"
            />
            <button
              onClick={onClearImage}
              className="absolute top-1 right-2 text-2xl text-gray-400 hover:text-red-500 transition-colors"
              aria-label="移除图片"
            >
              <i className="ri-close-line" />
            </button>

            {/* 扫描动画 - 重构版本 */}
            {loading && (
              <>
                <div className="absolute inset-0 pointer-events-none backdrop-blur-xs">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(0deg, transparent 24%, rgba(34, 211, 238, 0.1) 25%, rgba(34, 211, 238, 0.1) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.1) 75%, rgba(34, 211, 238, 0.1) 76%, transparent 77%, transparent),
                        linear-gradient(90deg, transparent 24%, rgba(34, 211, 238, 0.1) 25%, rgba(34, 211, 238, 0.1) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.1) 75%, rgba(34, 211, 238, 0.1) 76%, transparent 77%, transparent)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  {/* 扫描动画使用 CSS 动画实现 */}
                  <div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-lg shadow-cyan-400/50 animate-scan-line"
                    style={{ animation: 'scanMove 1.5s linear infinite' }}
                  />
                  <div
                    className="absolute left-0 right-0 h-10 bg-gradient-to-b from-indigo-500/30 to-transparent animate-scan-gradient"
                    style={{ animation: 'scanMove 1.5s linear infinite' }}
                  />
                  <style>{`
                @keyframes scanMove {
                  0% { top: 0%; }
                  100% { top: 100%; }
                }
              `}</style>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={triggerFileSelect}
            className="flex flex-col items-center justify-center h-full w-full p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
            aria-label="选择图片"
          >
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              上传图片
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs text-center mb-4">
              支持JPG、PNG格式
            </p>
            <div className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full text-sm font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              选择文件
            </div>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
      </div>
    </div>
  )
}
