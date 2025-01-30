import { Link } from "react-router-dom";
import Button from "../Button";

const NavBar = () => {
    return (
        <nav className="w-8/12 bg-[#1B9AAA] mt-10 mx-auto p-4 rounded-lg shadow-lg">
            <ul className="flex flex-row gap-10 justify-around">
                <li>
                    <Link to="/pages/home" className="hover:text-blue-600">
                        <Button type="link">
                            Strona Główna
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/pages/ask-assistant" className="hover:text-blue-600">
                        <Button type="link">
                            Zapytaj Asystenta
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/pages/understand-equation" className="hover:text-blue-600">
                        <Button type="link">
                            Zrozum Równanie
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/pages/test-knowledge">
                        <Button type="link">
                            Sprawdź Wiedzę
                        </Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
