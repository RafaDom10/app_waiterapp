import { useState } from 'react'
import { FlatList } from 'react-native'
import { categories } from '../../mocks/categories'
import { Text } from '../Text'
import { Category, Icon } from './styles'

export function Categories () {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSelectCategory = (categoryId: string) => {
    const category = selectedCategory === categoryId ? null : categoryId
    setSelectedCategory(category)
  }

  return (
    <FlatList
      horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => {
        const isSelected = category._id === selectedCategory

        return (
          <Category onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>
                {category.icon}
              </Text>
            </Icon>
            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </Category>
        )
      }}
    />
  )
}
