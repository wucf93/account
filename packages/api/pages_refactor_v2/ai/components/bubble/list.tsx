import { Fragment } from 'react/jsx-runtime'
import classNames from 'classnames'
import type { BubbleItemProps } from './item'

export interface BubbleListProps {
  className?: string
  style?: React.CSSProperties
  dataSource: BubbleItemProps[]
  itemRender: (item: BubbleItemProps) => React.ReactNode
}

export default function BubbleList(props: BubbleListProps) {
  return (
    <div
      className={classNames('flex flex-col', props.className)}
      style={props.style}
    >
      {props.dataSource?.map((item) => (
        <Fragment key={item.id}>{props.itemRender?.(item)}</Fragment>
      ))}
    </div>
  )
}
