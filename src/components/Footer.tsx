import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 mt-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <a
            href="https://github.com/otaruram"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </a>
          <a
            href="https://www.linkedin.com/in/otaruram/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </a>
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          Dibuat dengan ❤️ oleh <span className="font-semibold text-primary">Berasku</span> menggunakan React & TypeScript
        </p>
        <p className="text-xs text-muted-foreground">
          Ditenagai oleh <span className="font-semibold text-primary">TensorFlow.js</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
