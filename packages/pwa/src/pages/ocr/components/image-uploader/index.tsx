import React from 'react'
// 修复CSS导入路径
import './scan-animation.css'

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
    <div className="rounded-lg global-bg-soft-color p-4">
      <div
        className={`relative w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center transition-all duration-500 ${!transaction ? (!image ? 'h-52' : 'h-72') : 'h-36'}`}
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
              className="absolute top-0.5 right-1.5 text-2xl text-gray-400 hover:text-red-500 transition-colors"
              aria-label="移除图片"
            >
              <i className="ri-close-line" />
            </button>
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
        {/* 扫描动画 - 重构版本 */}
        {loading && (
          <div className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-lg z-10 overflow-hidden">
            {/* 多层扫描效果 */}
            <div className="scan-container absolute inset-0">
              {/* 主扫描光束 */}
              <div className="scan-beam absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan-beam"></div>
              {/* 上层光晕 */}
              <div className="scan-glow-upper absolute w-full h-16 bg-gradient-to-b from-blue-500/30 via-blue-400/20 to-transparent blur-xl animate-scan-glow-upper"></div>
              {/* 下层光晕 */}
              <div className="scan-glow-lower absolute w-full h-16 bg-gradient-to-t from-blue-500/30 via-blue-400/20 to-transparent blur-xl animate-scan-glow-lower"></div>
              {/* 粒子效果 */}
              <div className="scan-particles absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-300 rounded-full animate-scan-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            {/* 识别提示 */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white px-5 py-3 rounded-full backdrop-blur-md flex items-center space-x-3 shadow-lg">
                <div className="relative">
                  <i className="ri-scan-line text-lg animate-pulse" />
                  <div className="absolute -inset-1 bg-blue-400/30 rounded-full animate-ping" />
                </div>
                <span className="font-medium">智能识别中...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
