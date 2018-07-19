// Import Layouts
import LayoutBase from './Layouts/LayoutBase'

// Import Pages
import Posts from './Pages/Posts'
import Post from './Pages/Post'
import NotFound from './Pages/NotFound'

// A route config is just a data object passed into <Route> component.
export default [
  {
    path: '/pages',
    component: Posts,
    routes: [
      {
        path: '/posts/:id',
        component: Post,
        name: 'Post',
      },
    ],
  },
  {
    path: '/',
    component: LayoutBase,
    routes: [
      {
        path: '/',
        exact: true,
        component: Posts,
        name: 'Posts',
      },
      {
        path: '/posts/:id',
        component: Posts,
        name: 'Post',
      },
      {
        component: NotFound,
        name: 'Not Found',
      },
    ],
  },
]
