import { useState, useEffect } from "react";

import Hero from "./components/Hero.jsx";
import Search from "./components/Search.jsx";
import Pagination from "./components/Pagination.jsx";
import Content from "./components/Content.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import { fetchMoviesData } from "./API/tmdbapi.js";
import Navbar from "./components/Navbar.jsx";

import { NotificationHandler } from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchMoviesData(searchTerm, newPage);
    }
  };

  const handleJumpToPage = (e) => {
    if (e.key === "Enter") {
      let newPage = parseInt(e.target.value);

      if (newPage > totalPages) {
        newPage = totalPages;
      } else if (newPage < 1 || isNaN(newPage)) {
        newPage = 1;
      }

      setCurrentPage(newPage);
      e.target.value = "";
      e.target.blur();
    }
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenres]);

  const handleGenreSelect = (genreId) => {
    if (genreId === null) {
      setSelectedGenres([]);
    } else {
      setSelectedGenres((prev) => {
        const isSelected = prev.includes(genreId);

        if (isSelected) {
          return prev.filter((id) => id !== genreId);
        } else {
          if (prev.length < 3) {
            return [...prev, genreId];
          }
          return prev;
        }
      });
    }
  };

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

        {!searchTerm && (
          <GenreFilter
            onGenreSelect={handleGenreSelect}
            selectedGenres={selectedGenres}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
          onKeyDown={handleJumpToPage}
        />
        <Content
          searchTerm={searchTerm}
          currentPage={currentPage}
          selectedGenres={selectedGenres}
          onTotalPagesChange={setTotalPages}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
          onKeyDown={handleJumpToPage}
        />
        <Footer />
      </div>
    </main>
  );
}

export default App;
