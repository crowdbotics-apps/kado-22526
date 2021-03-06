import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Storage from '../lib/requests/storage';
import {useDispatch, useSelector} from 'react-redux';
import {ScaledSheet} from 'react-native-size-matters';
import {NewsFeedScreen} from '../Screen';

import {
  fetchAlljOBS,
  fetchAllSavedJobs,
  addFavoriteJob,
  removeFavorite,
  searchJobs,
  searchSavedJobsByName,
  getJobsAfter,
  fetchAllSavedJobsAfter,
} from '../actions/jobs';
import {
  fetchProfile,
  fetchStudents,
  fetchFavStudents,
  addFavStudent,
  fetchStudentsAfter,
  fetchFavStudentsAfter,
  removeFavStudent,
  fetchStudentsByName,
  fetchFavStudentsByName,
} from '../actions/profile';
import {KadoContext} from '../context/KadoProvider';

const NewsFeedContainer = props => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const dispatchSaved = useDispatch();
  const jobList = useSelector(state => state.jobs.jobList);
  const saveJobsList = useSelector(state => state.jobs.saveJobsList);
  const isloading = useSelector(state => state.jobs.isloading);

  const {profileDetail, studentsList, favStudentList} = useSelector(
    store => store.profile,
  );

  const [profileId, setprofileid] = useState('');

  const {userGroup} = React.useContext(KadoContext);
  const [tokenLoading, setTokenLoading] = useState(true);
  // const [favorite, setFavorite] = useState(false);
  const navigate = async routeName => {
    const {navigation} = props;
    if (routeName === 'drawer') {
      navigation.openDrawer();
    } else {
      await navigation.navigate(routeName);
    }
  };

  useEffect(() => {
    setDataFunc();
    setUserId();
    dispatch(fetchAlljOBS());
    dispatch(fetchAllSavedJobs());
    dispatch(fetchStudents());
    dispatch(fetchFavStudents());

    Storage.retrieveData('access_token').then(item => {
      const token = item?.profile_id;

      setprofileid(item?.profile_id);
      dispatch(fetchProfile(token));
    });
  }, []);

  useEffect(() => {
    dispatch(getJobsAfter());
    dispatch(fetchStudentsAfter());
    dispatch(fetchAllSavedJobsAfter());
    dispatch(fetchFavStudentsAfter());
  }, [state]);

  const setDataFunc = async () => {
    let token = '';
    await Storage.retrieveData('access_token').then(item => {
      token = item?.profile_id;

      setprofileid(item?.profile_id);
    });

    dispatch(fetchProfile(profileId));
  };

  const setUserId = () => {
    Storage.retrieveData('access_token').then(item => {
      setprofileid(item?.profile_id);
    });
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

  const addStudentFav = profile_id => {
    setState(!state);
    const params = {
      favorite: true,
    };
    dispatch(addFavStudent(profile_id, params));
  };

  const removeStudentFav = profile_id => {
    setState(!state);
    const params = {
      favorite: false,
    };
    dispatch(removeFavStudent(profile_id, params));
  };
  return (
    <SafeAreaView style={styles.container}>
      <NewsFeedScreen
        saveJobsList={saveJobsList}
        jobList={jobList}
        navigate={navigate}
        isLoading={isloading}
        profileDetail={profileDetail}
        addFavorite={addFavor}
        removeFavoriteJob={removeFavoriteJob}
        searchJobs={searchJobs}
        searchSavedJobs={searchSavedJobsByName}
        dispatch={dispatch}
        dispatchSaved={dispatchSaved}
        tokenLoading={tokenLoading}
        user_group={userGroup}
        studentsList={studentsList}
        favStudentList={favStudentList}
        addStudentFav={addStudentFav}
        removeStudentFav={removeStudentFav}
        fetchStudentsByName={fetchStudentsByName}
        fetchFavStudentsByName={fetchFavStudentsByName}
      />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});

export default NewsFeedContainer;
