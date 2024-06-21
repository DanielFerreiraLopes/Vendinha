import { RenderComponent } from "simple-react-routing";
import Navbar from "./Navbar";

function Layout(){
    return(<>
        <Navbar></Navbar>
        <RenderComponent></RenderComponent>
    </>)
};
export default Layout;