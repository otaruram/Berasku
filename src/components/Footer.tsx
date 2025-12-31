import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 border-t border-slate-800 bg-slate-950">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <a
            href="https://github.com/otaruram"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-slate-400 hover:text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/otaruram/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-slate-400 hover:text-white" />
          </a>
        </div>
        <p className="text-sm text-slate-400 mb-1">
          Made with <span className="text-red-500">❤️</span> by <span className="font-semibold text-white">Berasku</span>
        </p>
        <p className="text-xs text-slate-500">
          Powered by <span className="font-semibold text-blue-400">TensorFlow.js</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
