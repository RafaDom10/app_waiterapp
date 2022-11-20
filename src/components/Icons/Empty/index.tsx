import { SvgXml } from 'react-native-svg'

import { markup } from './markup'

export function Empty (): JSX.Element {
  return <SvgXml xml={markup} />
}
