import React from 'react'
import { Link, NavLink } from "react-router";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
} from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router";
function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;
    return (
        <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300 px-6 lg:px-16">
            {/* Left */}
            <div className="flex-1 flex items-center gap-6">
                <Link to="/" className="text-2xl font-bold text-primary">
                    TalentIQ
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex gap-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `btn btn-sm ${isActive ? "btn-primary" : "btn-ghost"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/problems"
                        className={({ isActive }) =>
                            `btn btn-sm ${isActive ? "btn-primary" : "btn-ghost"
                            }`
                        }
                    >
                        Problems
                    </NavLink>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <SignedOut>
                    <SignInButton>
                        <button className="btn btn-outline btn-primary">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar