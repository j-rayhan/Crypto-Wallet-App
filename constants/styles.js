import { StyleSheet } from 'react-native'
import { COLORS } from '.'

export default styles = StyleSheet.create({
  container: { flex: 1 },
  containerWhite: { flex: 1, backgroundColor: COLORS.white },
  containerBlack: { flex: 1, backgroundColor: COLORS.black },
  row: { flexDirection: 'row' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  rowEnd: { flexDirection: 'row', alignItems: 'flex-end' },
  center: { alignItems: 'center', justifyContent: 'center' },
})
