import React from 'react'
import { storiesOf } from '../../../../.storybook/storiesOf'
import { Loading } from './Loading'
import { color } from 'ui/theme'

storiesOf('Loading', module)
  .add('default', () => <Loading color={color.black} />)
  .add('size', () => <Loading color={color.black} width={24} height={24} />)
