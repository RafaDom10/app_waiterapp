import { Header } from '../components/Header'
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer
} from './styles'

export function Main (): JSX.Element {
  return (
    <>
      <Container>
        <Header />
        <CategoriesContainer></CategoriesContainer>
        <MenuContainer></MenuContainer>
      </Container>
      <Footer>
        <FooterContainer></FooterContainer>
      </Footer>
    </>
  )
}
