import { useAuthenticationStore } from 'stores/authentication'
import { updateHeaders } from 'src/boot/axios';
import Layout from 'layouts/MainLayout';



function checkToken() {
  const authenticationStore = useAuthenticationStore()
  console.log('checkToken -> ', authenticationStore.getToken)
  updateHeaders(authenticationStore.getToken)
  if (!authenticationStore.getToken) {
    return { name: 'login' }
  }
}

const routes = [
  {
    path: '/',
    component: () => import('pages/login/LoginPage'),
    name: 'login',
    hide: true
  },

  {
    path: '/dashboard',
    component: Layout,
    name: 'dashboard',
    meta: { icon: 'dashboard' },
    children: [
      {
        path: '',
        name: 'Dashboard',
        beforeEnter: [checkToken],
        component: () => import('pages/IndexPage')
      }
    ]
  },

  {
    path: '/reservas',
    component: Layout,
    name: 'Reservas',
    children: [
      {
        path: 'solicitud',
        name: 'reservas-solicitud',
        beforeEnter: [checkToken],
        meta: { icon: 'receipt_long', label: 'Solicitud' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'contrato',
        name: 'reservas-contrato',
        beforeEnter: [checkToken],
        meta: { icon: 'gavel', label: 'Contrato' },
        component: () => import('pages/IndexPage')
      },
    ]
  },

  {
    path: '/deposito',
    component: Layout,
    name: 'Depósito',
    children: [
      {
        path: 'solicitud',
        name: 'deposito-solicitud',
        beforeEnter: [checkToken],
        meta: { icon: 'receipt_long', label: 'Solicitud' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'contrato',
        name: 'deposito-contrato',
        beforeEnter: [checkToken],
        meta: { icon: 'gavel', label: 'Contrato' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'acta',
        name: 'deposito-acta',
        beforeEnter: [checkToken],
        meta: { icon: 'history_edu', label: 'Acta' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'reubicacion',
        name: 'deposito-reubicación',
        beforeEnter: [checkToken],
        meta: { icon: 'recycling', label: 'Reubicación' },
        component: () => import('pages/IndexPage')
      },
    ]
  },

  {
    path: '/buscar',
    component: Layout,
    name: 'Buscar',
    children: [
      {
        path: 'documentos',
        name: 'buscar-documentos',
        beforeEnter: [checkToken],
        meta: { icon: 'description', label: 'Documentos' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'personas',
        name: 'buscar-personas',
        beforeEnter: [checkToken],
        meta: { icon: 'people', label: 'Personas' },
        component: () => import('pages/person/PeopleListPage')
      },
      {
        path: 'mapa',
        name: 'buscar-mapa',
        beforeEnter: [checkToken],
        meta: { icon: 'map', label: 'Mapa' },
        component: () => import('pages/IndexPage')
      }
    ]
  },

  {
    path: '/herramientas',
    component: Layout,
    name: 'Herramientas',
    children: [
      {
        path: 'etiqueta',
        name: 'herramientas-etiqueta',
        beforeEnter: [checkToken],
        meta: { icon: 'sell', label: 'Etiqueta' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'estadisticas',
        name: 'herramientas-estadisticas',
        beforeEnter: [checkToken],
        meta: { icon: 'query_stats', label: 'Estadísticas' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'configuracion',
        name: 'herramientas-configuracion',
        beforeEnter: [checkToken],
        meta: { icon: 'settings', label: 'Configuración' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'usuarios',
        name: 'herramientas-usuarios',
        beforeEnter: [checkToken],
        meta: { icon: 'manage_accounts', label: 'Usuarios' },
        component: () => import('pages/usuario/UsuarioListadoPage')
      },
      {
        path: 'seguridad',
        name: 'herramientas-seguridad',
        beforeEnter: [checkToken],
        meta: { icon: 'security', label: 'Seguridad' },
        component: () => import('pages/IndexPage')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
