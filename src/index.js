import ReactDOM from 'react-dom';
import React from 'react';

import AWSAppSyncClient from "aws-appsync";
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { ApolloProvider } from 'react-apollo';

import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import config from './config';
import App from './App';

Amplify.configure({
  aws_appsync_graphqlEndpoint: config.aws_appsync_graphqlEndpoint,
  aws_appsync_region: config.region,
  aws_appsync_authenticationType: config.aws_appsync_authenticationType,
  aws_appsync_apiKey: "null",
});
Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: config.identityPoolId,
    // REQUIRED - Amazon Cognito Region
    region: config.region,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: config.userPoolId,
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
    userPoolWebClientId: config.userPoolWebClientId,
  }
});

const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.region,
  auth: {
    // Amazon Cognito user pools using AWS Amplify
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
  onError: (e) => { console.log(e) },
});

const AppWithAuth = withAuthenticator(App, true);

const app = (
  <ApolloProvider client={client}>
    <AppWithAuth />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));