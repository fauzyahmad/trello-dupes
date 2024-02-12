import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import DetailTicket from "./pages/DetailTicket"
import Login from "./pages/Login"
import { useEffect } from "react"
import { useAuthStore } from "./store"


function App() {
  const [isLoggedIn, checkUserAuthentication] = useAuthStore((state) => ([
    state.isLoggedIn,
    state.checkAuthentication
  ]))

  useEffect(() => {
    checkUserAuthentication()
  }, [checkUserAuthentication])

  const routes = [
    {
      path: "/ticket/:id",
      element: <DetailTicket />
    },
    {
      path: "/",
      element: <Home />
    }
  ]

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          if (isLoggedIn) {
            return (
              <>
                <Route key={index} path={route.path} element={route.element} />
                <Route path="/login" element={<Navigate to="/" replace />} />
              </>
            )
          }
          return <Route key={index} path={route.path} element={<Navigate to="/login" replace />} />
        })}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
