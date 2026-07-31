import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Terminal, LogOut, User, Home } from "lucide-react";

export default function Navbar() {
  const { session } = useAuth();
  const navigate = useNavigate();

  if (!session) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-cs-700/50 bg-cs-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Terminal className="w-4 h-4 text-accent" />
            </div>
            <span className="text-lg font-semibold text-cs-100">CodeSchool</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
                Profile
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await supabase?.auth.signOut();
                navigate("/");
              }}
              className="text-cs-400 hover:text-danger"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
