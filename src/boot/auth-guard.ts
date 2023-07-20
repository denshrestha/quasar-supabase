import { boot } from 'quasar/wrappers';
// import { useUserAuthStore } from '../stores/user-store';

export default boot(({ router, store, redirect }) => {
  // const {
  //   getSessionUser,
  //   isLoggedIn,
  // } = useUserAuthStore(store);
  // console.log('🚀 ~ file: auth-guard.ts:8 ~ boot ~ isLoggedIn:', isLoggedIn);

  router.beforeEach(async (to, from, next) => {
    // if (!to.path.includes('/auth')) {
    //   if (!isLoggedIn) {
    //     await getSessionUser();
    //     redirect('/auth');
    //   }
    // }
    next();
  });
});
