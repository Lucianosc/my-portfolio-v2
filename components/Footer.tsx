import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="">
            © 2024 Luciano Scaminaci. The future is decentralized.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/lucianosc"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-primary"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/luciano-scaminaci/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-primary"
            >
              <Linkedin />
            </a>
            <a
              href="https://x.com/LuchoSca"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-primary"
            >
              <Twitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
