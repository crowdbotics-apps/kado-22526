import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {BackHeader, Input, BottomHeader} from '../components';
import {
  buttonColor,
  lightBlackColor,
  themeColor,
  white,
  feedItemBack,
  amountBorder,
} from '../utils/Theme/Color';
import {ScaledSheet} from 'react-native-size-matters';
import {ActivityIndicator} from 'react-native';
import {EditProfileIcon} from '../assets/Image';
import {getPlaceholder} from '../utils/misc';
import {DEFAULT_PIC, USER_TYPES} from '../constants/profile';
import RBSheet from 'react-native-raw-bottom-sheet';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {PLACES_API_KEY} from '../lib/requests/api';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from '@react-navigation/native';

const EditProfileScreen = ({
  goBack,
  navigate,
  isloading,
  profileDetail,
  handleChange,
  handleUpdateProfile,
  updateLoading,
  uploadImage,
  image,
}) => {
  const [gender, setGender] = React.useState(profileDetail?.gender);
  const refRBSheet = useRef();
  const googlePlacesRef = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    googlePlacesRef.current?.setAddressText(profileDetail?.location)
  }, [profileDetail, isFocused]);

  const renderItem = ({item}) => (
    <View>
      <TouchableOpacity
        style={styles.rbItem}
        onPress={() => {
          setGender(item);
          handleChange('gender', item);
          refRBSheet.current.close();
        }}>
        <Text style={styles.categoryBtnText}>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackHeader title="Edit Profile" goBack={goBack} openDrawer={true} />
      <View style={{flex: 1}}>
        {isloading ? (
          <View style={styles.empty}>
            <ActivityIndicator color={buttonColor} />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.bodyContainer}
            keyboardShouldPersistTaps={'handled'}>
            <View style={styles.body}>
              <View style={styles.imageContainer}>
                <View>
                    <View>
                      {profileDetail?.photo === null ? (
                        <Image
                          resizeMode="cover"
                          style={styles.image}
                          source={image ? image : { uri: DEFAULT_PIC }}
                        />
                      ) : (
                        <Image
                          resizeMode="cover"
                          style={styles.image}
                          source={{uri: profileDetail?.photo}}
                        />
                      )}
                    </View>
                  <TouchableOpacity
                    onPress={() => uploadImage()}
                    style={styles.editBtnContainer}>
                    <EditProfileIcon />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 50}}>
                <Input
                  secureTextEntry={false}
                  iconShow={false}
                  placeholder={getPlaceholder(
                    'Full Name'
                  )}
                  value={profileDetail?.fullname}
                  onChange={value => handleChange('fullname', value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <GooglePlacesAutocomplete
                  placeholder="Location"
                  ref={googlePlacesRef}
                  onPress={(data, details = null) => {
                    console.log(data, details);
                    handleChange('location', data.description);
                  }}
                  query={{
                    key: PLACES_API_KEY,
                    language: 'en',
                  }}
                  style={styles.input}
                  renderRightButton={() => (
                    <Icon
                      name="map-marker-alt"
                      style={{marginTop: 12}}
                      size={18}
                    />
                  )}
                />
              </View>

              <View style={styles.inputCOntainer}>
                <Input
                  secureTextEntry={false}
                  keyboardType="numeric"
                  iconShow={false}
                  placeholder={getPlaceholder(
                    'Phone'
                  )}
                  value={profileDetail?.mobile_number}
                  onChange={value => handleChange('mobile_number', value)}
                />
              </View>
              <View style={styles.inputCOntainer}>
                <TouchableOpacity
                  style={styles.textAreaContainer}
                  onPress={() => refRBSheet.current.open()}>
                  <Text style={styles.textAreaText}>
                    {getPlaceholder(gender, 'Gender')}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => handleUpdateProfile()}
                style={styles.registerBtnContainer}>
                {updateLoading ? (
                  <ActivityIndicator color={white} />
                ) : (
                  <Text style={styles.registerText}>Next</Text>
                )}
              </TouchableOpacity>
            </View>
            <RBSheet
              ref={refRBSheet}
              closeOnPressMask={true}
              animationType="fade"
              height={180}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0,0,0,0.5)',
                },
                draggableIcon: {
                  backgroundColor: '#000',
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                },
                container: {
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                },
              }}>
              <BottomHeader
                hideCheckIcon={true}
                refRBSheet={refRBSheet}
                title="Select Category"
              />

              <FlatList
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                  return index;
                }}
                data={USER_TYPES.genderOptions}
              />
            </RBSheet>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bodyContainer: {
    padding: '1@s',
    paddingBottom: '20@s',
    justifyContent: 'space-between',
  },
  textAreaText: {
    fontSize: 16,
    color: '#000',
  },
  textAreaContainer: {
    paddingLeft: '26@s',
    paddingRight: '10@s',
    paddingTop: '8@s',
    paddingBottom: '8@s',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: feedItemBack,
    borderRadius: '8@s',
    marginTop: '3@s',
    borderColor: amountBorder,
    borderWidth: 1,
  },
  rbItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15@s',
    borderBottomColor: feedItemBack,
    borderBottomWidth: 1,
  },
  rbBtnContainer: {
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50@s',
    marginBottom: '100@s',
  },
  text: {
    fontSize: '17@s',
    lineHeight: '20@s',
    color: themeColor,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: '10@s',
  },
  body: {
    padding: '10@s',
    paddingLeft: '15@s',
    paddingRight: '15@s',
    justifyContent: 'center',
  },
  registerBtnContainer: {
    padding: '10@s',
    backgroundColor: buttonColor,
    marginTop: '30@s',
    borderRadius: '5@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: white,
    fontSize: '14@s',
    lineHeight: '18@s',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: buttonColor,
    fontSize: '14@s',
    lineHeight: '18@s',
    marginLeft: '5@s',
  },
  alreadyText: {
    color: lightBlackColor,
    fontSize: '14@s',
    lineHeight: '18@s',
  },
  forgotPasswordContainer: {
    marginTop: '10@s',
    alignItems: 'flex-end',
  },

  forgotPasswordText: {
    color: buttonColor,
    fontSize: '12@s',
    lineHeight: '14@s',
    fontWeight: 'bold',
  },

  image: {
    height: '128@s',
    width: '128@s',
    borderRadius: '150@s',
    resizeMode: 'cover',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20@s',
  },
  editBtnContainer: {
    position: 'absolute',
    bottom: 0,
    right: '0@s',
  },
  inputCOntainer: {
    marginTop: '5@s',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#FAFAFA',
    paddingLeft: '15@s',
    borderColor: '#CBCBCB',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '10@s',
    marginTop: '10@s',
    borderRadius: '8@s',
  },
  input: {
    fontSize: '14@s',
    color: 'black',
  },
});

export default EditProfileScreen;
