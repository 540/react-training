import React from 'react'
import { storiesOf } from '../../../../.storybook/storiesOf'
import { Error } from './Error'

storiesOf('Error', module).add('default', () => <Error>An error occurred while processing your request!</Error>)
