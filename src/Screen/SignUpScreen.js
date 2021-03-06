import React from 'react';
import {Tabs, Tab} from 'native-base';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import MainLogo from '../assets/Image/MainLogo';
import {
  buttonColor,
  lightBlackColor,
  themeColor,
  white,
  textBlackColor,
} from '../utils/Theme/Color';
import {ScaledSheet} from 'react-native-size-matters';
import {USER_TYPES} from '../constants/profile';
import SignUpForm from './SignUpForm';
import {BackArrow} from '../assets/Image';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = ({
  navigate,
  showPassword,
  handlePassword,
  showConPassword,
  handleConPassword,
  handleSubmit,
  goBack,
  isloading,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={styles.goBackButon}>
        <BackArrow />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <View style={styles.imageContainer}>
          <MainLogo />
          <Text style={styles.text}>Remote freelance jobs for students</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.tabContainer}>
            <Tabs
              locked={true}
              tabBarUnderlineStyle={{backgroundColor: buttonColor}}>
              <Tab
                tabStyle={{backgroundColor: white}}
                activeTabStyle={{backgroundColor: white}}
                activeTextStyle={styles.activeTabStyle}
                textStyle={styles.tabTextStyle}
                heading="Companies">
                <SignUpForm
                  showPassword={showPassword}
                  handlePassword={handlePassword}
                  showConPassword={showConPassword}
                  handleConPassword={handleConPassword}
                  submit={handleSubmit}
                  user_type={USER_TYPES.company.name}
                  isloading={isloading}
                />
              </Tab>

              <Tab
                tabStyle={{backgroundColor: white}}
                activeTabStyle={{backgroundColor: white}}
                activeTextStyle={styles.activeTabStyle}
                textStyle={styles.tabTextStyle}
                heading="Students">
                <SignUpForm
                  showPassword={showPassword}
                  handlePassword={handlePassword}
                  showConPassword={showConPassword}
                  handleConPassword={handleConPassword}
                  submit={handleSubmit}
                  user_type={USER_TYPES.student.name}
                  isloading={isloading}
                />
              </Tab>
            </Tabs>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.alreadyText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bodyContainer: {
    paddingBottom: '20@s',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50@s',
  },
  text: {
    fontSize: '17@s',
    lineHeight: '20@s',
    color: themeColor,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '10@s',
  },
  body: {
    flex: 1,

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
  tabContainer: {
    flex: 1,
    marginTop: '20@s',
  },
  activeTabStyle: {
    color: textBlackColor,
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 18,
  },
  tabTextStyle: {
    color: '#8E8E8E',
  },
  goBackButon: {
    padding: 20,
  },
});

export default SignUpScreen;
