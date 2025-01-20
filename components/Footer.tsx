import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-end items-center">
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/lucianosc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex items-center"
              aria-label="Visit my GitHub profile"
            >
              <span className="sr-only">GitHub</span>
              <Github aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/luciano-scaminaci/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex items-center"
              aria-label="Visit my LinkedIn profile"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin aria-hidden="true" />
            </a>
            <a
              href="https://x.com/LuchoSca"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex items-center"
              aria-label="Visit my Twitter profile"
            >
              <span className="sr-only">Twitter</span>
              <Twitter aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
