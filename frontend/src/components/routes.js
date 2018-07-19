// Import Layouts
import App from './App'
import Base from './Base'

// Import Pages
import Home from './Home'
import Posts from './Posts'
import Post from './Post'
import NotFound from './NotFound'

// A route config is just a data object passed into <Route> component.
export default [
  { component: Base,
    routes: [
      {
        path: '/pages',
        component: Base,
        routes: [
          {
            path: '/posts/:id',
            component: Home,
            name: 'Post',
          },
        ],
      },
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
            component: Home,
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
