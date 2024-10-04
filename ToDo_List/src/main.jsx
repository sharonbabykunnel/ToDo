import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './redux/appStore.js'
const HomePages = lazy(()=> import('./components/pages/HomePage.jsx'))
const SignInPage = lazy(()=> import('./components/pages/SignInPage.jsx'))
const SignUpPage = lazy(()=> import('./components/pages/SignUpPage.jsx'))
const PrivatePages = lazy(()=> import('./middlewares/PrivatePages.jsx'))
const PublickPages = lazy(()=> import('./middlewares/PublickPages.jsx'))

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route element={<PublickPages/>}>
        <Route index element={<Navigate to='/signup' replace/>} />
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/signin' element={<SignInPage/>} />
      </Route>
      <Route element={<PrivatePages/>}>
        <Route path='/home' element={<HomePages/>} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={appStore} >
    <Suspense fallback={<div>loading...</div>} >
      <RouterProvider router={routes} />
    </Suspense>
  </Provider>
)
