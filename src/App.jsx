import { useState, useEffect } from "react";

import Hero from "./components/Hero.jsx";
import Search from "./components/Search.jsx";
import Pagination from "./components/Pagination.jsx";
import Content from "./components/Content.jsx";
import { fetchMoviesData } from "./API/tmdbapi.js";
import Navbar from "./components/Navbar.jsx";

import { NotificationHandler } from "./components/Notification.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notification, setNotification] = useState({
    text: "",
    color: "",
  });

  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    fetchMoviesData(searchTerm, newPage);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchMoviesData(searchTerm, newPage);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <main>
      <NotificationHandler
        textToShow={notification.text}
        color={notification.color}
        delay={2000}
        onClose={() => setNotification({ text: "", color: "" })}
      />
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="pattern" />
      <div className="wrapper">
        <Hero />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Pagination
          currentPage={currentPage}
          onPrev={handlePrev}
          onNext={handleNext}
          totalPages={totalPages}
        />
        <Content
          searchTerm={searchTerm}
          currentPage={currentPage}
          setTotalPages={setTotalPages}
          setNotification={setNotification}
        />
        <Pagination
          currentPage={currentPage}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </main>
  );
}

export default App;
