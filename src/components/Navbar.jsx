import Search from "./Search";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full bg-gray-950 flex md:flex-row items-center p-2 gap-2 md:gap-4 h-20 md:h-24 sticky top-0 z-50">
      <video
        src="./Movielogo.mp4"
        autoPlay
        muted
        className="h-10 md:h-full w-auto mb-2 md:mb-0 rounded-2xl"
      />
      <div className="lg:w-2xl md:w-md w-xs max-w-2xl mb-10">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </div>
  );
};

export default Navbar;
