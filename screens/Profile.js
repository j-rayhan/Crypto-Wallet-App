import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
} from 'react-native'
import { MainLayout } from '.'
import { HeaderBar, SectionTitle, Setting } from '../components'
import {
  COLORS,
  dummyData,
  FONTS,
  icons,
  iconSize,
  SIZES,
  styles,
} from '../constants'

const Profile = () => {
  const [faceID, setFaceID] = React.useState(true)
  return (
    <MainLayout>
      <View
        style={[styles.containerBlack, { paddingHorizontal: SIZES.padding }]}
      >
        {/* Header */}
        <HeaderBar title={'Profile'} />
        {/* Details */}
        <ScrollView>
          {/* Email & User ID */}
          <View style={[styles.row, { marginTop: SIZES.radius }]}>
            {/* Email ID */}
            <View style={styles.container}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {dummyData.profile.email}
              </Text>
              <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>
                ID: {dummyData.profile.id}
              </Text>
            </View>
            {/* Status */}
            <View style={styles.rowCenter}>
              <Image
                source={icons.verified}
                style={{
                  ...iconSize(25),
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}
              >
                Verified
              </Text>
            </View>
          </View>
          {/* App */}
          <SectionTitle title={'App'} />
          <Setting
            title={'Launch Screen'}
            value={'Home'}
            type={'button'}
            onPress={() => console.log('launch screen')}
          />
          <Setting
            title={'Appearance'}
            value={'Dark'}
            type={'button'}
            onPress={() => console.log('Appearance')}
          />
          {/* Account */}
          <SectionTitle title={'account'} />
          <Setting
            title={'Payment Currency'}
            value={'USD'}
            type={'button'}
            onPress={() => console.log('Payment Currency')}
          />
          <Setting
            title={'Language'}
            value={'English'}
            type={'button'}
            onPress={() => console.log('Language')}
          />
          {/* Security */}
          <SectionTitle title={'Security'} />
          <Setting
            title={'FaceID'}
            value={faceID}
            type={'switch'}
            onPress={(v) => setFaceID(v)}
          />
          <Setting
            title={'Password Settings'}
            value={''}
            type={'button'}
            onPress={() => console.log('Password Settings')}
          />
          <Setting
            title={'Change Password'}
            value={''}
            type={'button'}
            onPress={() => console.log('Change Password')}
          />
          <Setting
            title={'2-Factor Authentication'}
            value={''}
            type={'button'}
            onPress={() => console.log('Authentication')}
          />
        </ScrollView>
      </View>
    </MainLayout>
  )
}

export default Profile
