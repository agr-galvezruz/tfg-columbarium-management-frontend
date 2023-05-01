import { useAuthenticationStore } from 'stores/authentication'
import { updateHeaders } from 'src/boot/axios'
import Layout from 'layouts/MainLayout'


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
    meta: { icon: 'dashboard', label: 'routes.dashboard' },
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
    path: '/crypt',
    component: Layout,
    name: 'crypt',
    meta: { label: 'routes.crypt' },
    children: [
      {
        path: 'buildings',
        name: 'buildings',
        beforeEnter: [checkToken],
        meta: { icon: 'church', label: 'routes.buildings' },
        component: () => import('pages/building/BuildingsListPage')
      },
      {
        path: 'building/:buildingId',
        beforeEnter: [checkToken],
        hidden: true,
        component: () => import('pages/building/BuildingDetailsPage')
      },
      {
        path: 'rooms',
        name: 'rooms',
        beforeEnter: [checkToken],
        meta: { icon: 'view_module', label: 'routes.rooms' },
        component: () => import('pages/room/RoomsListPage')
      },
      {
        path: 'room/:roomId',
        beforeEnter: [checkToken],
        hidden: true,
        component: () => import('pages/room/RoomDetailsPage')
      },
      {
        path: 'rows',
        name: 'rows',
        beforeEnter: [checkToken],
        meta: { icon: 'reorder', label: 'routes.rows' },
        component: () => import('pages/row/RowsListPage')
      },
      {
        path: 'row/:rowId',
        beforeEnter: [checkToken],
        hidden: true,
        component: () => import('pages/row/RowDetailsPage')
      },
      {
        path: 'niches',
        name: 'niches',
        beforeEnter: [checkToken],
        meta: { icon: 'inventory', label: 'routes.niches' },
        component: () => import('pages/niche/NichesListPage')
      },
      {
        path: 'niche/:nicheId',
        beforeEnter: [checkToken],
        hidden: true,
        component: () => import('pages/niche/NicheDetailsPage')
      },
      {
        path: 'urns',
        name: 'urns',
        beforeEnter: [checkToken],
        meta: { icon: 'grid_view', label: 'routes.urns' },
        component: () => import('pages/urn/UrnsListPage')
      },
      {
        path: 'urn/:urnId',
        beforeEnter: [checkToken],
        hidden: true,
        component: () => import('pages/urn/UrnDetailsPage')
      },
      {
        path: 'map',
        name: 'map',
        beforeEnter: [checkToken],
        meta: { icon: 'map', label: 'routes.map' },
        component: () => import('pages/map/MapPage')
      },
    ]
  },

  {
    path: '/record',
    component: Layout,
    name: 'record',
    meta: { label: 'routes.record' },
    children: [
      {
        path: 'caskets',
        name: 'caskets',
        beforeEnter: [checkToken],
        meta: { icon: 'takeout_dining', label: 'routes.caskets' },
        component: () => import('pages/casket/CasketsListPage')
      },
      {
        path: 'casket/:casketId',
        beforeEnter: [checkToken],
        hidden: true,
        component: () => import('pages/casket/CasketDetailsPage')
      },
      {
        path: 'people',
        name: 'people',
        beforeEnter: [checkToken],
        meta: { icon: 'people', label: 'routes.people' },
        component: () => import('pages/person/PeopleListPage')
      },
      {
        path: 'person/:personId',
        beforeEnter: [checkToken],
        hidden: true,
        component: () => import('pages/person/PersonDetailsPage')
      },
    ]
  },

  {
    path: '/management',
    component: Layout,
    name: 'management',
    meta: { label: 'routes.management' },
    children: [
      {
        path: 'reservations',
        name: 'reservations',
        beforeEnter: [checkToken],
        meta: { icon: 'auto_stories', label: 'routes.reservations' },
        component: () => import('pages/reservation/ReservationsListPage')
      },
      {
        path: 'reservation/:reservationId',
        beforeEnter: [checkToken],
        hidden: true,
        component: () => import('pages/reservation/ReservationDetailsPage')
      },
      {
        path: 'deposits',
        name: 'deposits',
        beforeEnter: [checkToken],
        meta: { icon: 'archive', label: 'routes.deposits' },
        component: () => import('pages/deposit/DepositsListPage')
      },
      {
        path: 'deposit/:depositId',
        beforeEnter: [checkToken],
        hidden: true,
        component: () => import('pages/deposit/DepositDetailsPage')
      },
      {
        path: 'relocations',
        name: 'relocations',
        beforeEnter: [checkToken],
        meta: { icon: 'swap_horiz', label: 'routes.relocations' },
        component: () => import('pages/relocation/RelocationsListPage')
      },
    ]
  },

  {
    path: '/configuration',
    component: Layout,
    name: 'configuration',
    meta: { label: 'routes.configuration' },
    children: [
      {
        path: 'users',
        name: 'users',
        beforeEnter: [checkToken],
        meta: { icon: 'manage_accounts', label: 'routes.users' },
        component: () => import('pages/user/UsersListPage')
      },
      {
        path: 'user_',
        hidden: true,
      },
    ]
  },

  {
    path: '/help',
    component: Layout,
    name: 'help',
    meta: { label: 'routes.help' },
    children: [
      {
        path: 'guide',
        name: 'guide',
        beforeEnter: [checkToken],
        meta: { icon: 'help', label: 'routes.guide' },
        component: () => import('pages/guide/GuidePage')
      },
      {
        path: 'guide_',
        hidden: true,
      },
    ]
  },

  // {
  //   path: '/reservas',
  //   component: Layout,
  //   name: 'Reservas',
  //   children: [
  //     {
  //       path: 'solicitud',
  //       name: 'reservas-solicitud',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'receipt_long', label: 'Solicitud' },
  //       component: () => import('pages/IndexPage')
  //     },
  //     {
  //       path: 'contrato',
  //       name: 'reservas-contrato',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'gavel', label: 'Contrato' },
  //       component: () => import('pages/IndexPage')
  //     },
  //   ]
  // },

  // {
  //   path: '/deposito',
  //   component: Layout,
  //   name: 'Depósito',
  //   children: [
  //     {
  //       path: 'solicitud',
  //       name: 'deposito-solicitud',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'receipt_long', label: 'Solicitud' },
  //       component: () => import('pages/IndexPage')
  //     },
  //     {
  //       path: 'contrato',
  //       name: 'deposito-contrato',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'gavel', label: 'Contrato' },
  //       component: () => import('pages/IndexPage')
  //     },
  //     {
  //       path: 'acta',
  //       name: 'deposito-acta',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'history_edu', label: 'Acta' },
  //       component: () => import('pages/IndexPage')
  //     },
  //     {
  //       path: 'reubicacion',
  //       name: 'deposito-reubicación',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'recycling', label: 'Reubicación' },
  //       component: () => import('pages/IndexPage')
  //     },
  //   ]
  // },

  // {
  //   path: '/buscar',
  //   component: Layout,
  //   name: 'Buscar',
  //   children: [
  //     {
  //       path: 'documentos',
  //       name: 'buscar-documentos',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'description', label: 'Documentos' },
  //       component: () => import('pages/IndexPage')
  //     },
  //     {
  //       path: 'personas',
  //       name: 'buscar-personas',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'people', label: 'Personas' },
  //       component: () => import('pages/person/PeopleListPage')
  //     },
  //     {
  //       path: 'mapa',
  //       name: 'buscar-mapa',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'map', label: 'Mapa' },
  //       component: () => import('pages/IndexPage')
  //     }
  //   ]
  // },

  // {
  //   path: '/herramientas',
  //   component: Layout,
  //   name: 'Herramientas',
  //   children: [
  //     {
  //       path: 'etiqueta',
  //       name: 'herramientas-etiqueta',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'sell', label: 'Etiqueta' },
  //       component: () => import('pages/IndexPage')
  //     },
  //     {
  //       path: 'estadisticas',
  //       name: 'herramientas-estadisticas',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'query_stats', label: 'Estadísticas' },
  //       component: () => import('pages/IndexPage')
  //     },
  //     {
  //       path: 'configuracion',
  //       name: 'herramientas-configuracion',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'settings', label: 'Configuración' },
  //       component: () => import('pages/IndexPage')
  //     },
  //     {
  //       path: 'usuarios',
  //       name: 'herramientas-usuarios',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'manage_accounts', label: 'Usuarios' },
  //       component: () => import('pages/usuario/UsuarioListadoPage')
  //     },
  //     {
  //       path: 'seguridad',
  //       name: 'herramientas-seguridad',
  //       beforeEnter: [checkToken],
  //       meta: { icon: 'security', label: 'Seguridad' },
  //       component: () => import('pages/IndexPage')
  //     },
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
