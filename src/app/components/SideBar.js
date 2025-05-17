import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-yellow-200 text-black fixed top-0 left-0 p-4 flex flex-col items-center">
            <div className="mb-6">
                <Image src="/logo.png" alt="Logo" width={150} height={150} className="rounded-md" />
            </div>
            <nav className="space-y-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 hover:text-gray-700">
                    <span>📋</span> Order Management
                </Link>
                <Link href="/hello" className="flex items-center gap-2 hover:text-gray-700">
                    <span>🔔</span> Notifications
                </Link>
                
            </nav>
        </div>
    );
};

export default Sidebar;
