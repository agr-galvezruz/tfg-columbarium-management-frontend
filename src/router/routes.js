import Layout from 'layouts/MainLayout';

const routes = [

  {
    path: '/',
    component: Layout,
    name: 'Dashboard',
    meta: { icon: 'dashboard' },
    children: [
      {
        path: '',
        name: 'Dashboard',
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
        meta: { icon: 'receipt_long', label: 'Solicitud' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'contrato',
        name: 'reservas-contrato',
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
        meta: { icon: 'receipt_long', label: 'Solicitud' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'contrato',
        name: 'deposito-contrato',
        meta: { icon: 'gavel', label: 'Contrato' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'acta',
        name: 'deposito-acta',
        meta: { icon: 'history_edu', label: 'Acta' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'reubicacion',
        name: 'deposito-reubicación',
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
        meta: { icon: 'description', label: 'Documentos' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'personas',
        name: 'buscar-personas',
        meta: { icon: 'people', label: 'Personas' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'mapa',
        name: 'buscar-mapa',
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
        meta: { icon: 'sell', label: 'Etiqueta' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'estadisticas',
        name: 'herramientas-estadisticas',
        meta: { icon: 'query_stats', label: 'Estadísticas' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'configuracion',
        name: 'herramientas-configuracion',
        meta: { icon: 'settings', label: 'Configuración' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'usuarios',
        name: 'herramientas-usuarios',
        meta: { icon: 'manage_accounts', label: 'Usuarios' },
        component: () => import('pages/IndexPage')
      },
      {
        path: 'seguridad',
        name: 'herramientas-seguridad',
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
