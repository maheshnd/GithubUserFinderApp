import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './gitHubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

let githubClientID;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientID = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Users
  const searchUser = async (text) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientID}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  //Get User

  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientID}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //Get Repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientID}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  //clear Users

  const clearUser = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  //Set Loading

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <React.Fragment>
      <GithubContext.Provider
        value={{
          users: state.users,
          user: state.user,
          repos: state.repos,
          loading: state.loading,
          alert: state.alert,
          searchUser,
          clearUser,
          getUser,
          getUserRepos,
        }}
      >
        {props.children}
      </GithubContext.Provider>
    </React.Fragment>
  );
};

export default GithubState;