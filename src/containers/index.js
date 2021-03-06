import React,{Component} from 'react';
import {View} from 'react-native';
import SignIn from './SignIn';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import Reducer from '../reducers/index';

const store = createStore(Reducer);
export default class Main extends Component{
  render(){
    return(
      <Provider store={store}>
        <SignIn/>
      </Provider>
    )
  }
}
