import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  // const isServiceMenuHidden =  localStorage.getItem('isServiceMenuHidden');
  // alert(isServiceMenuHidden);
  // if(isServiceMenuHidden){
  //   return true;
  // }else{
  //   return false;
  // }
  return true
};
