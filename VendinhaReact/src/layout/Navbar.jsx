import { Link } from "simple-react-routing";

function Navbar(){
    return(<nav>
        <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/clientes">Lista de Clientes</Link></li>
            <li><Link to="/dividas">Lista de Dividas</Link></li>
            <li><Link to="/clientes/adicionar">Cadastrar Cliente</Link></li>
            <li><Link to="/dividas/registrar">Registrar Divida</Link></li>
        </ul>
        <div className=""></div>
    </nav>)
};
export default Navbar;