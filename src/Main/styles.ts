import { Platform, StatusBar } from 'react-native'
import styled from 'styled-components/native'

const isAndroid: boolean = Platform.OS === 'android'

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'}
`
