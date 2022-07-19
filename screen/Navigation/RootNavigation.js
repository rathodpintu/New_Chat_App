import * as React from 'react';
export const navigationRef = React.createRef();

export function navigate(name) {
    navigationRef.current?.navigate(name);
}

// RootNavigation.js

// import * as React from 'react';

// export const navigationRef = React.createRef()

// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     // Perform navigation if the react navigation is ready to handle actions
//     navigationRef.navigate(name, params);
//   } else {
//     // You can decide what to do if react navigation is not ready
//     // You can ignore this, or add these actions to a queue you can call later
//   }
// }