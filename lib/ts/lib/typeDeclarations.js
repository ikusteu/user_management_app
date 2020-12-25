//import { ReactNode } from 'react'

/*******  Component Props  *******/
// props for input form
// custom text field

/*******  Forms  *******/
// type of form / redux user action
export let UserActionType; // initial form values interface

(function (UserActionType) {
  UserActionType["Login"] = "login";
  UserActionType["AddNewUser"] = "addNewUser";
})(UserActionType || (UserActionType = {}));