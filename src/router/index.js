import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children : [
        {
          path: ':slug-:id(\\d+)',
          name: 'description',
          component: () => import('../views/Modals/DescriptionMovie.vue'),
        }
      ]
    },
    {
      path: '/search',
      name: 'search', 
      component: () => import('../views/SearchView.vue'),
      children : [
        {
          path: ':slug-:id(\\d+)',
          name: 'searchDescription',
          component: () => import('../views/Modals/DescriptionMovie.vue'),
        }
      ]
    },
    {
      path: '/profil',
      name : 'profil', 
      component: () => import('../views/ProfilView.vue'),
      children : [
        {
          path: ':slug-:id(\\d+)',
          name: 'profilDescription',
          component: () => import('../views/Modals/DescriptionMovie.vue') 
        }
      ]
    },
    {
      path : '/login',
      name : 'login',
      component : () => import('../views/auth/LoginView.vue'),
    },
    {
      path : '/signin',
      name : 'signin',
      component : () => import('../views/auth/SigninView.vue'),
    },
    {
      path : '/:catchAll(.*)',
      name : 'e404',
      component : () => import('../views/e404.vue'),
    },
  ],
})
const MovieModalPathName = ['description',"profilDescription","searchDescription"]
router.beforeEach((to,from,next) => {
  if (MovieModalPathName.includes(from.name)) {
    const modal = document.querySelector('.descriptModal') 
    modal && modal.classList.add('modal-leave-active')
    setTimeout(()=> {
      next();
    },300)
  }else{
    next()
  }
})

export default router
