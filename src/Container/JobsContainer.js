import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {ScaledSheet} from 'react-native-size-matters';
import {JobsScreen} from '../Screen';
import {white} from '../utils/Theme/Color';

import {
  fetchAllSavedJobs,
  fetchAllJobsAmount,
  fetchAlljOBS,
  fetchProjectsType,
  fetchjobsCategory,
  fetchAllJobsDate,
  fetchJobs,
  searchJobs,
  addFavoriteJob,
  removeFavorite,
  getJobsAfter,
} from '../actions/jobs';

const JobsContainer = props => {
  const {jobList, saveJobsList, isloading, typeProList} = useSelector(
    state => state.jobs,
  );

  const [state, setState] = useState(false);
  const [dateText, setDateText] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();

  const [data, setData] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleSecond, setDatePickerVisibilitySecond] = useState(
    false,
  );
  const josCategoryList = useSelector(state => state.jobs.josCategoryList);
  const {profileDetail} = useSelector(store => store.profile);

  const goBack = () => {
    const {navigation} = props;
    navigation.goBack();
  };
  const navigate = async routeName => {
    const {navigation} = props;
    if (routeName === 'drawer') {
      navigation.openDrawer();
    } else {
      await navigation.navigate(routeName);
    }
  };

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchAlljOBS());
    dispatch(fetchAllSavedJobs());
    dispatch(fetchjobsCategory());
    dispatch(fetchProjectsType());
  }, []);

  useEffect(() => {
    dispatch(getJobsAfter());
  }, [state]);

  const handleJobFilter = (key, param) => {
    dispatch(fetchAlljOBS(key, param));
  };

  const handleAmountFilter = (min_value = 0, max_value = 0) => {
    dispatch(fetchAllJobsAmount('min_pay', min_value, 'max_pay', max_value));
  };

  const handleDateFilter = (from_date, min_date) => {
    dispatch(fetchAllJobsDate('start_date', dateText, 'end_date', endDate));
  };

  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    let myDate = moment(date).format('YYYY-MM-DD');
    setDateText(myDate);
    hideDatePicker();
  };

  const showDatePickerSecond = () => {
    setDatePickerVisibilitySecond(true);
  };

  const hideDatePickerSecond = () => {
    setDatePickerVisibilitySecond(false);
  };

  const handleConfirmSecond = date => {
    let myDate = moment(date).format('YYYY-MM-DD');
    setEndDate(myDate);
    hideDatePickerSecond();
  };

  const addFavor = id => {
    setState(!state);

    const params = {
      title: 'test',
      favorite: true,
    };
    dispatch(addFavoriteJob(id, params));
  };

  const removeFavoriteJob = id => {
    setState(!state);

    const params = {
      title: 'test',
      favorite: false,
    };
    dispatch(removeFavorite(id, params));
  };
  return (
    <SafeAreaView style={styles.container}>
      <JobsScreen
        saveJobsList={saveJobsList}
        jobList={jobList}
        navigate={navigate}
        goBack={goBack}
        josCategoryList={josCategoryList}
        isloading={isloading}
        typeProList={typeProList}
        handleJobFilter={handleJobFilter}
        handleChange={handleChange}
        data={data}
        handleAmountFilter={handleAmountFilter}
        handleDateFilter={handleDateFilter}
        isDatePickerVisible={isDatePickerVisible}
        isDatePickerVisibleSecond={isDatePickerVisibleSecond}
        setDatePickerVisibility={setDatePickerVisibility}
        showDatePicker={showDatePicker}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
        dateText={dateText}
        showDatePickerSecond={showDatePickerSecond}
        hideDatePickerSecond={hideDatePickerSecond}
        handleConfirmSecond={handleConfirmSecond}
        endDate={endDate}
        searchJobs={searchJobs}
        dispatch={dispatch}
        addFavorite={addFavor}
        removeFavoriteJob={removeFavoriteJob}
        profileDetail={profileDetail}
      />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

export default JobsContainer;
