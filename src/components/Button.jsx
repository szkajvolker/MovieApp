const Button = ({ toggle = "prev", onClick, children }) => {
  return (
    <div>
      <button
        className="bg-gray-700 rounded-xl p-2 font-bold cursor-pointer hover:text-blue-300/80 hover:bg-gray-500/80"
        onClick={onClick}
      >
        {children || (toggle === "prev" ? "prev" : "next")}
      </button>
    </div>
  );
};

export default Button;
