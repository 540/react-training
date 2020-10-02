import React from 'react'
import { Text } from 'ui/components/Text'
import styled from 'styled-components'
import { sizes } from 'ui/theme'

export const List = ({ comics }) =>
  comics.map(comic => (
    <Comic key={comic.id}>
      <Text as="p" weight="bold">
        {comic.title}
      </Text>
      <Text as="p">{comic.characters.join(', ')}</Text>
    </Comic>
  ))

const Comic = styled.div`
  margin-bottom: ${sizes.base};
`
