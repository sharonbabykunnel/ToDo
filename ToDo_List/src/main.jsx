import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import HomePages from './components/pages/HomePage.jsx'
import SignInPage from './components/pages/SignInPage.jsx'
import SignUpPage from './components/pages/SignUpPage.jsx'
import PrivatePages from './middlewares/PrivatePages.jsx'
import { Provider } from 'react-redux'
import appStore from './redux/appStore.js'
import PublickPages from './middlewares/PublickPages.jsx'

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
