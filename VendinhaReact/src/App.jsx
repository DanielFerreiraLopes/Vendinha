import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'simple-react-routing'
import Home from './Home'
import ClientesList from './cliente/ClientesList'
import Layout from './layout/Layout'
import FormCliente from './cliente/FormCliente'
import DividasList from './divida/DividasList'
import FormDivida from './divida/FormDivida'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter
    notFoundPage={<h1> Erro 404 - Não Encontrado</h1>}
    routes={[
      {
        path: "",
        component: <Home></Home>
      },
      {
        path: "clientes",
        component: <ClientesList></ClientesList>
      },
      {
        path: "clientes/adicionar",
        component: <FormCliente></FormCliente>
      },
      {
        path: "clientes/editar/:codigo(numero)",
        component: <FormCliente></FormCliente>
      },
      {
        path: "dividas",
        component: <DividasList></DividasList>
      },
      {
        path: "dividas/registrar",
        component: <FormDivida></FormDivida>
      },
      {
        path: "dividas/editar/:id(numero)",
        component: <FormDivida></FormDivida>
      },
      
    ]}>
      <div className=""></div>
      <Layout></Layout>
    </BrowserRouter>
  )
}

export default App