const Notification = ({ textToShow, color }) => {
  const colorClasses = {
    green: "text-green-500",
    orange: "text-orange-500",
    red: "text-red-500",
    blue: "text-blue-500",
  };
  return (
    <div className="absolute w-full flex">
      <h2 className={colorClasses[color]}>{textToShow}</h2>
    </div>
  );
};

export default Notification;
