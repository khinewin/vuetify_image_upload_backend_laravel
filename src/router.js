import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard';
import MyProject from '@/views/MyProject';
import Team from '@/views/Team';
import Newperson from '@/views/Newperson';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: '/myproject',
      name: 'myproject',
      component: MyProject,
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/newperson',
      name: 'newperson',
      component: Newperson

    }
  ]
})
