import { MdQrCodeScanner } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import Icon from "./Icon";
import { Link } from "react-router-dom";

const Nav = ({ openScan, home = false, openLogin }) => {
  return (

    <nav className="flex h-full items-center justify-between gap-4">
      <Link to='/'><Icon active={home} ><MdHome /></Icon></Link>
      <button onClick={openScan}><Icon><MdQrCodeScanner /></Icon></button>
      <Icon ><MdAccountCircle onClick={openLogin} /></Icon>
    </nav>
  );
};

export default Nav;