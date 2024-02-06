# RTKDemo

**Project Name**: `RTKDemo`

**Bundle Id / Package Name**: `com.simform.rtkdemo`

[![react-native](https://img.shields.io/badge/react--native-0.69.4-brightgreen)](https://reactnative.dev/docs/0.69/getting-started)
[![code-style](https://img.shields.io/badge/code%20style-standard%20TS-brightgreen)](https://www.typescriptlang.org/)

---

## Project Desctiption

A RTKDemo boilerplate to kickstart your project with some commonly used setups, components, navigation and screens.

## Prerequisites

**iOS** : XCode(12) onwards

**Android** : Android Studio(4.1) with gradle(6.2) onwards

**Editor** : Visual Studio Code

## How to Run the Project

1. Open the project directory in to terminal
2. Run and build for either OS

   - Run iOS app

     ```bash
     yarn run ios
     ```

   - Run Android app

     ```bash
     yarn run android
     ```

   - Note: This yarn scripts will lint your code first. If there are no lint errors, then it will run the ios or android app. Otherwise it will show the lint errors in the terminal.

## Husky Setup

We just have to set the husky path. For that move to `Users -> <Current User> ` than open hidden file and folder. Open file `.huskyrc`, If not available then create new one with same name then add a path of node

## Coding Style used

This project adheres to JavaScript Standard for codinng style. To maintain coding standards, utilising features of ES6 and follow best development practices of react-native, this project also uses [ES6](http://es6-features.org/#Constants), some rules of [eslint-config](https://www.npmjs.com/package/@react-native-community/eslint-config), [import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript) and [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import).

**Do not disable lint inside the code. Try to understand the rule and then follow it into your code. Disabling lint will be considered a violation of coding standards. Exceptions will be allowed by the code-reviewer and team lead after understanding the need to ignore lint.**

1. **To Lint**

   Use the yarn script `lint`. To run it

```bash
  yarn lint
```

2. **Auto Lint on Commit**

   This is implemented using [husky](https://github.com/typicode/husky). So husky will prevent code-cmmits having lint errors. There is no additional setup needed.

3. **Understanding Linting Errors**

   The linting rules are from JS Standard and React-Standard. [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## Extra steps for android

_Describe any extra steps which need to be taken fo the auto-generated android project. Eg. Some specific setup of any manifest file, some manual linking which is buggy and needs to be corrected for first checkout etc. Here is an example:_

- Mind the version of google services used in the project. All google services must have same version. This is implemented using project level build.gradle.

## Extra steps for ios

_Describe any extra steps which need to be taken for the auto-generated ios project. Eg. Some specific setup of any certificates, pods, linking, information in Info.plist, some manual linking which is buggy and needs to be corrected for first checkout etc. Here is an example:_

- You will need all the certificates to run the ios project in a real device.

## List of all dependencies used in the project with their usage

List all dependencies from the package.json file along with their usage. This list must be updated every time you change/add any dependecy. Here are some examples:

- **Framework:**
  - [React Native](https://github.com/facebook/react-native)

- **State management libraries:**
  - [Redux](http://redux.js.org/), [React Redux](https://react-redux.js.org/), [redux-persist](https://github.com/rt2zz/redux-persist)

- **Middleware libraries:**

  - [Redux Toolkit](https://redux-toolkit.js.org/)

- **Navigation:**

  - [react-navigation](https://github.com/react-navigation/react-navigation), [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler), 
    [react-navigation-stack](https://github.com/react-navigation/stack),
  [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
    [react-native-screens](https://github.com/software-mansion/react-native-screens)

- **For Api**

  - [apisauce](https://github.com/infinitered/apisauce), [axios](https://github.com/axios/axios)

- **Storage:**

  - [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)

- **Config:**

  - [react-native-config](https://github.com/luggit/react-native-config)

- **Crash report:**

  - [@sentry/react-native](https://github.com/getsentry/sentry-react-native)

- **For Validations:**

  - [formik](https://github.com/jaredpalmer/formik), [yup](https://github.com/jquense/yup)

- **For Utilities**

  - [lodash](https://lodash.com/), [i18next](https://github.com/i18next/i18next), [react-i18next](https://github.com/i18next/react-i18next), [react-native-localize](https://github.com/zoontek/react-native-localize), [react-native-permissions](https://github.com/zoontek/react-native-permissions),[class-transformer](https://github.com/typestack/class-transformer), [reflect-metadata](https://github.com/rbuckton/reflect-metadata)

## Following accounts are used for the mentioned platform

_Mention all the accounts used for various development and deployement platforms. Just email/username should be mentioned but never a password. Make sure this information stays in a private repository. If your repository is public, do not share this kind of private information via readme. Provide another private source. Like a private file on our zoho or a file in Microsoft Teams._

**Sonarqube**: abc@abc.com

**Bitrise**: abc@abc.com

**Google Play**: abc@abc.com

**Apple Store and developer account**: abc@abc.com

**Firebase/Google service**: abc@abc.com

## Troubleshoot Notes

_Provide troubleshoot guideline for any known issues. For example, a specific error for build proccess or deployement process or even an error in any third party dependency._

_For example_

- Application crashes in production because of react-native-maps. Follow this [link](https://github.com/react-native-community/react-native-maps/issues/2997) to fix it.

_If there no known issues:_

- There are no known issues for run or build processes right now.

## Notes

_Here any information which is important but not mentioned above and must be passed among all developers, should be mentioned. Like which branch is used for build releases, library deprecations etc._

_For example_

- Release builds are distributed from develop-release branch and all pull requests are done to develop branch.

## Permissions hooks
  We are having custom hook for handling permissions lifecycle. It will  provide 3 different hooks for handling single, multiple and notification permissions.

  By default no permission handler is linked so make sure to link that first, Refer [react-native-permissions guide](https://github.com/zoontek/react-native-permissions#ios)

### useSinglePermissions hooks

  This hooks take a single permissions with manage their lifecycle.

  Arguments:
  1. **type:** Define single permission to ask.
  1. **requestInitial:** To display alert before asking for permissions requests.
  1. **requestRationale:** To display alert when requesting permissions is partial denied.
  1. **requestBlocked:** To display alert when requesting permissions is permanently denied.
  1. **options:**
     1. **ask:** Ask the permissions when mounted, defaults to `false`</Br>
     1. **get:** Fetch information about the permissions when mounted, defaults to `true`</Br>
     1. **getWithCallback:** Fetch information about the permissions when mounted and trigger onGranted callback , defaults to `false`</Br>
  1. **onGranted:** Trigger when the permissions are granted.</Br>
  1. **customDialogComplete:** Trigger when the permissions custom dialog is complete.

  Returns:
  1. **status:** The status of the permission. like 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked'
  1. **Error:** Troubleshoot error while asking permission.
  1. **askPermission:** Callback function to trigger ask permission.
  1. **getPermission:** Callback function to trigger get current permission status.

```ts
const [data, error, askPermission, getPermission] = useSinglePermissions(
    Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    }),
    {},
    {
      title: '<AppName> wants to use your camera',
      message: '<AppName>’s won’t make sense without your profile picture. To add your profile picture, allow <AppName> to access your camera.',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel'
    },
    {
      title: 'We can’t add a photo.',
      message: '<AppName> can’t see you take a picture. To fix this, allow <AppName> to access your camera.',
      buttonPositive: 'Setting',
      buttonNegative: 'Cancel'
    }, {
      ask: false,
      get: true,
      getWithCallback: false
    }, () => {
      // Permission grant then what to do.
    }, () => {
      // dismiss the dialog
    }
  );
```

 ### useMultiplePermissions hooks

  This hooks take a multiple permissions with manage their lifecycle.

  Arguments:
  1. **types:** Define multiple permission to ask.
  1. **requestInitial:** To display alert before asking for permissions requests.
  1. **requestRationale:** To display alert when requesting permissions are partial denied.
  1. **requestBlocked:** To display alert when requesting permissions are permanently denied.
  1. **options:**
      1. **ask:** Ask the permissions when mounted, defaults to `false`
      1. **get:** Fetch information about the permissions when mounted, defaults to `true`
      1. **getWithCallback:** Fetch information about the permissions when mounted and trigger onGranted callback , defaults to `false`

  1. **onGranted:** Trigger when the permissions are granted.
  1. **customDialogComplete:** Trigger when the permissions custom dialog is complete.
  1. **optionTypes:** Use to make any permission as an optional behaviour

  Returns:
  1. **status:** The status of the permission. like 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked'
  1. **Error:** Troubleshoot error while asking permission.
  1. **askPermission:** Callback function to trigger ask permission.
  1. **getPermission:** Callback function to trigger get current permission status.

```ts
const [data, error, askPermission, getPermission] = useMultiplePermissions(
    Platform.select({
      ios: [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
      android: [PERMISSIONS.ANDROID.WRITE_STORAGE, PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.MICROPHONE],
    }),
    {},
    {
      title: '<AppName> wants to use your camera',
      message: '<AppName>’s won’t make sense without your profile picture. To add your profile picture, allow <AppName> to access your camera.',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel'
    },
    {
      title: 'We can’t add a photo.',
      message: '<AppName> can’t see you take a picture. To fix this, allow <AppName> to access your camera.',
      buttonPositive: 'Setting',
      buttonNegative: 'Cancel'
    }, {
      ask: false,
      get: true,
      getWithCallback: false
    }, () => {
      // Permission grant then what to do.
    }, () => {
      // dismiss the dialog
    },
    Platform.select({
      ios: [PERMISSIONS.IOS.CAMERA],
      android: [PERMISSIONS.ANDROID.CAMERA],
    })
  );
```