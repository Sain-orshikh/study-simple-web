import Link from "next/link"

interface NavbarProps {
  currentPath?: string
}

export function Navbar({ currentPath = "/" }: NavbarProps) {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/blogs", label: "Blogs" },
    { path: "/studies", label: "Studies" },
    { path: "/study-tools", label: "Study Tools" },
    { path: "/about-us", label: "About Us" },
    { path: "/clubs", label: "Clubs" },
    { path: "/podcasts", label: "Podcasts" },
    { path: "/application-tips", label: "Application Tips" },
    { path: "/market", label: "Market" },
    { path: "/others", label: "Others" },
  ]

  return (
    <header className="mb-8">
      <nav className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-x-0 sm:space-x-6 border-l-4 border-gray-300 pl-4 flex-wrap">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`font-medium hover:underline py-1 ${currentPath === item.path ? "font-bold" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

