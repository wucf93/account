import { CardRenderType } from './type'

export function LoadingContentRender(props: CardRenderType) {
  return (
    <div className="p-0.5 border-loading rounded-lg overflow-hidden text-sm">
      <div className="bg-white rounded-md py-2 px-3">
        <div>智能分析中，这需要一些时间，请耐心等待哦</div>
        <div className="h-[0.5px] w-full my-2 bg-gray-300" />
        <div className="text-xs text-gray-400">{props.message.content}</div>
      </div>
    </div>
  )
}
