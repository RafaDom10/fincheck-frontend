import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false}  />}>
          <Route path="/login" element={<h1>login</h1>} />
          <Route path="/register" element={<h1>register</h1>} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<h1>dashboard</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
