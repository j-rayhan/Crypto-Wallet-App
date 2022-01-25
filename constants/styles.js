import { StyleSheet } from 'react-native'
import { COLORS } from '.'

export default styles = StyleSheet.create({
  container: { flex: 1 },
  containerWhite: { flex: 1, backgroundColor: COLORS.white },
  row: { flexDirection: 'row' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  center: { alignItems: 'center', justifyContent: 'center' },
})
