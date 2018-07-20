// Import Layouts
import Base from './Base'

// Import Pages
import Home from './Home'
import Post from './Post'
import NotFound from './NotFound'

// A route config is just a data object passed into <Route> component.
export default [
  { component: Base,
    routes: [
      {
        path: '/',
        component: Base,
        routes: [
          {
            path: '/',
            exact: true,
            component: Home,
            name: 'Posts',
          },
          {
            path: '/posts/:id',
            component: Post,
            name: 'Post',
          },
          {
            component: NotFound,
            name: 'Not Found',
          },
        ],
      },
    ]
  },
]

// {
//   path: '/pages',
//   component: Base,
//   routes: [
//     {
//       path: '/posts/:id',
//       component: Post,
//       name: 'Post',
//     },
//   ],
// },
