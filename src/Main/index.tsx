import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer
} from './styles'
import { Cart } from '../components/Cart'
import { CartItem } from '../types/CartItem'
import { Product } from '../types/Product'
import { ActivityIndicator } from 'react-native'

import { Empty } from '../components/Icons/Empty'
import { Text } from '../components/Text'
import { Category } from '../types/Category'
import { api } from '../utils/api'

export function Main () {
  const [isTableModalVisible, setIsTableModalVisible] = useState<boolean>(false)
  const [selectedTable, setSelectedTable] = useState<string>('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false)

  useEffect(() => {
    Promise.all([
      api.get('categories'),
      api.get('products')
    ]).then(([categoriesRes, productsRes]) => {
      setCategories(categoriesRes.data)
      setProducts(productsRes.data)
      setIsLoading(false)
    }).catch(err => console.log(err))
  }, [])

  const handleSelectCategory = async (categoryId: string) => {
    const route = !categoryId
      ? 'products'
      : `categories/${categoryId}/products`

    setIsLoadingProducts(true)

    const { data } = await api.get(route)

    setProducts(data)
    setIsLoadingProducts(false)
  }

  const handleSaveTable = (table: string) => {
    setSelectedTable(table)
  }

  const handleResetOrder = () => {
    setSelectedTable('')
    setCartItems([])
  }

  const handleAddToCart = (product: Product) => {
    if (!selectedTable) {
      setIsTableModalVisible(true)
    }

    setCartItems(prevState => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      )

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product
        })
      }

      const newCartItems = [...prevState]
      const item = newCartItems[itemIndex]

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      }

      return newCartItems
    })
  }

  const handleDecrementCartItem = (product: Product) => {
    setCartItems(prevState => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      )

      const item = prevState[itemIndex]

      if (item.quantity === 1) {
        const newCartItems = [...prevState]
        newCartItems.splice(itemIndex, 1)

        return newCartItems
      }

      const newCartItems = [...prevState]

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      }

      return newCartItems
    })
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color='#d73035' size='large' />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts
              ? (
              <CenteredContainer>
                <ActivityIndicator color='#d73035' size='large' />
              </CenteredContainer>
                )
              : (
              <>
              {
                products.length > 0
                  ? (
                    <MenuContainer>
                      <Menu
                        onAddToCart={handleAddToCart}
                        products={products}
                      />
                    </MenuContainer>
                    )
                  : (
                    <CenteredContainer>
                      <Empty />
                      <Text color='#666' style={{ marginTop: 24 }}>
                        Nenhum produto foi encontrado!
                      </Text>
                    </CenteredContainer>
                    )
              }
              </>
                )}
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              disabled={isLoading}
              onPress={() => setIsTableModalVisible(true)}
            >
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  )
}
