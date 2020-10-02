import React from 'react'
import { color } from 'ui/theme/colors'
import styled from 'styled-components'
import { ReactComponent as LoadingSpinningBubbles } from './loading-spinning-bubbles.svg'

const LoadingRaw = ({ className, ...rest }) => (
  <div className={className} {...rest}>
    <LoadingSpinningBubbles />
  </div>
)

export const Loading = styled(LoadingRaw)`
  fill: ${props => props.color || color.blue1};
  height: ${props => props.height || 64}px;
  width: ${props => props.width || 64}px;
`
