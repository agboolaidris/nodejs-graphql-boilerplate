import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  errors?: Maybe<ErrorType>;
  msg?: Maybe<MsgType>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MeError = {
  __typename?: 'MeError';
  msg: Scalars['String'];
};

export type MeResponse = {
  __typename?: 'MeResponse';
  data?: Maybe<User>;
  errors?: Maybe<MeError>;
};

export type MsgType = {
  __typename?: 'MsgType';
  msg: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Login: AuthResponse;
  Register: AuthResponse;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  Hello: Scalars['String'];
  Me: MeResponse;
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  telephone: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
  telephone: Scalars['String'];
  updated_at: Scalars['DateTime'];
  uuid: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', Login: { __typename?: 'AuthResponse', msg?: Maybe<{ __typename?: 'MsgType', msg: string }>, errors?: Maybe<{ __typename?: 'ErrorType', email?: Maybe<string>, password?: Maybe<string> }> } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  telephone: Scalars['String'];
  role: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', Register: { __typename?: 'AuthResponse', msg?: Maybe<{ __typename?: 'MsgType', msg: string }>, errors?: Maybe<{ __typename?: 'ErrorType', email?: Maybe<string>, telephone?: Maybe<string>, role?: Maybe<string>, password?: Maybe<string>, name?: Maybe<string> }> } };


export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  Login(data: {email: $email, password: $password}) {
    msg {
      msg
    }
    errors {
      email
      password
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const CreateUserDocument = gql`
    mutation createUser($name: String!, $email: String!, $telephone: String!, $role: String!, $password: String!) {
  Register(
    data: {name: $name, email: $email, telephone: $telephone, role: $role, password: $password}
  ) {
    msg {
      msg
    }
    errors {
      email
      telephone
      role
      password
      name
    }
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};