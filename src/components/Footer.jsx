const Footer = () => {
  return (
    <footer className="relative mt-20 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold text-xl mb-2">MovieApp</h3>
              <p className="flex text-white/60 text-sm flex-row gap-2">
                © {new Date().getFullYear()} • Created by
                <span className="text-white">István Szabó</span>
              </p>
            </div>

            <div className="flex gap-3">
              {[
                {
                  name: "GitHub",
                  url: "https://github.com/szkajvolker",
                  color: "hover:text-purple-300",
                },
                {
                  name: "LinkedIn",
                  url: "https://www.linkedin.com/in/istvan-szabo-junior-frontend-developer/",
                  color: "hover:text-blue-300",
                },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className={`px-4 py-2 rounded-xl bg-white/10 text-white/80 ${link.color} border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 text-sm font-medium`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
