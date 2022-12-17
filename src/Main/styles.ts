import { Platform, StatusBar } from 'react-native'
import styled from 'styled-components/native'

const isAndroid: boolean = Platform.OS === 'android'

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  flex: 1;
`

export const CategoriesContainer = styled.View`
  height: 73px;
  margin-top: 34px;
  background: #FAFAFA;
`

export const MenuContainer = styled.View`
  flex: 1;
`

export const Footer = styled.View`
  min-height: 110px;
  background: #FFF;
`

export const FooterContainer = styled.SafeAreaView``