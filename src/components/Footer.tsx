import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <a
            href="https://github.com/otaruram/Berasku"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-gray-600 hover:text-black" />
          </a>
          <a
            href="https://www.linkedin.com/in/otaruram/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-gray-600 hover:text-black" />
          </a>
        </div>
        <p className="text-sm text-gray-500 mb-1">
          Made with <span className="text-black">❤️</span> by <span className="font-semibold text-black">Berasku</span>
        </p>
        <p className="text-xs text-gray-400">
          Powered by <span className="font-semibold text-black">TensorFlow.js</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
