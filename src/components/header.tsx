import { useState } from "react"

const Header = () => {
    const [active, setActive] = useState<string>("PORTFOLIO")
    const options: string[] = ["PORTFOLIO", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"];

    return (
        <nav className="w-full py-2 flex items-center justify-center fixed top-4 z-50">
            <div className="flex">
                {options.map((label) => (
                    <button
                        key={label}
                        onClick={() => setActive(label)}
                        className={`px-5 h-8 pb-1 text-md font-medium transition-all duration-500 cursor-none
              ${active === label
                                ? "bg-gray-700 text-white"
                                : " text-gray-100 bg-gray-950 "}`}
                    >
                        {label === "PORTFOLIO" ? <></> : ""} {label}
                    </button>
                ))}
            </div>
        </nav>
    )
}

export default Header
