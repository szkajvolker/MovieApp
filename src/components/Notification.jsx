const Notification = ({ textToShow, color }) => {
  return (
    <div className="absolute w-full flex">
      <h2 className={`${color === "green" ? "text-green-500" : "text-red-500"}`}>{textToShow}</h2>
    </div>
  );
};

export default Notification;
