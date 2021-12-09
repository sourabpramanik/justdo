import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppContainer from './src/components/app-container';
import Navigator from './src/'
import Amplify from "aws-amplify";
import awsExports from "./src/aws-exports";
import {withAuthenticator} from 'aws-amplify-react-native';

Amplify.configure({ ...awsExports, Analytics: { disabled: true, } });

function App() {
  return (
    <AppContainer>
      <Navigator/>
    </AppContainer>    
  );
}
export default withAuthenticator(App)