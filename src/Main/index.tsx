import { Button } from '../components/Button'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import { useState } from 'react'
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer
} from './styles'
import { Cart } from '../components/Cart'
import { CartItem } from '../types/CartItem'

export function Main () {
  const [isTableModalVisible, setIsTableModalVisible] = useState<boolean>(false)
  const [selectedTable, setSelectedTable] = useState<string>('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const handleSaveTable = (table: string) => {
    setSelectedTable(table)
  }

  const handleCancelOrder = () => {
    setSelectedTable('')
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)} >
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
              <Cart cartItems={cartItems} />
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
