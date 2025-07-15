import classNames from 'classnames'
import { CardRenderType } from './type'

export function StringContentRender(props: CardRenderType) {
  return (
    <div
      className={classNames(
        'rounded-lg inline-block py-3 px-4 text-sm max-w-full overflow-hidden break-all',
        props.message.role === 'user'
          ? 'bg-indigo-600 text-white'
          : 'bg-white text-black'
      )}
    >
      {props.message.content}
    </div>
  )
}
