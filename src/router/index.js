import { createRouter ,createWebHashHistory} from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SecurityDetection from '../views/SecurityDetection.vue'
import EquipmentManagement from '../views/EquipmentManagement.vue'
import Overview from '../views/Overview.vue'
import ProducingManagement from '../views/ProducingManagement.vue'
import EnvironmentalManagement from '../views/EnvironmentalManagement.vue'
import Monitor9 from '../components/Overview/Monitor9'
import Monitor4 from '../components/Overview/Monitor4'

const routes = [
  {
    path:"/",
    redirect:"/HomePage/Overview",
  },
  {
    path:"/HomePage",component: HomePage,
    children: [
      { 
        path: "/HomePage/Overview", 
        component: Overview ,
      },
      { 
        path: "/HomePage/ProducingManagement", 
        component: ProducingManagement ,
      },
      {
        path: "/HomePage/SecurityDetection",
        component: SecurityDetection,
      },
      {
        path: "/HomePage/EquipmentManagement",
        component: EquipmentManagement,
      },
      {
        path: "/HomePage/EnvironmentalManagement",
        component: EnvironmentalManagement,
      },
      {
        path: "/HomePage/cvd",
        component: () => import('@/views/SecurityViews/CvdView.vue')
      },
      {
        path: "/HomePage/SecurityDetection/alert",
        component: ()=> import('@/components/SecurityDetection/securityLevel/realTime.vue'),
      }
    ],
  },
  {
    path: '/video-grid',
    component: Monitor9
  },
  {
    path: '/9-page',
    component: Monitor9
  },
  {
    path: '/4-page',
    component: Monitor4
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


export default router
