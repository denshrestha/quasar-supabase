import { boot } from 'quasar/wrappers';
import { useAuthStore } from '../stores/auth-store';

export default boot(({ router, store, redirect }) => {
  const authStore = useAuthStore(store);

  router.beforeEach(async (to, from, next) => {
    if (!to.path.includes('/auth')) {
      if (!authStore.getUser) {
        await authStore.getSessionUser()
          .then(async () => {
            if (!authStore.getUser) {
              redirect('/auth');
            }
            await authStore.updateSessionData();
          })
          .catch(() => {
            redirect('/auth');
          });
      }
    }
    next();
  });
});
