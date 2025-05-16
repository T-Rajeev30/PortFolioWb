import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#185632] to-[#0d1117] text-[#d0d3bc] py-10 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left: Branding */}
        <div className="text-2xl text-center md:text-left space-y-1">
          <p className="font-semibold">
            © {new Date().getFullYear()} Rajeev Tiwari
          </p>
          <p className="text-xs opacity-80">Crafted with passion and React.</p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex gap-6 text-2xl">
          <a href="#about" className="hover:text-[#e39847] transition">
            About
          </a>
          <a href="#projects" className="hover:text-[#e39847] transition">
            Projects
          </a>
          <a href="#contact" className="hover:text-[#e39847] transition">
            Contact
          </a>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#23b9b2]"
          >
            <Github size={30} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#23b9b2]"
          >
            <Linkedin size={30} />
          </a>
          <a href="mailto:your@email.com" className="hover:text-[#23b9b2]">
            <Mail size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
}
