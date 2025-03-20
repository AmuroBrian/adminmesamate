import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-5">
            <h2 className="text-xl font-semibold mb-5">My App</h2>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-700">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/hello" className="block px-3 py-2 rounded hover:bg-gray-700">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="block px-3 py-2 rounded hover:bg-gray-700">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
