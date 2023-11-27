import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

interface Auction {
  id_lot: number;
  name_of_lot: string;
  titleImage: string;
  description: string;
}

interface PaginatedAuctions {
  content: Auction[];
  totalPages: number;
  number: number;
}

interface AuctionComponentProps {
  selectedCategory: number | null;
}

const AuctionComponent: React.FC<AuctionComponentProps> = ({ selectedCategory }) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loadedImages, setLoadedImages] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isPreloadComplete, setIsPreloadComplete] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);

  const auctionsContainerRef = useRef<HTMLDivElement>(null);

  const fetchAuctions = async (page: number = 0) => {
    try {
      const category = selectedCategory !== null ? selectedCategory : -1;

      const endpoint =
        category === -1
          ? `http://localhost:8080/lots/activePreview?page=${page}&size=10`
          : `http://localhost:8080/lots/category/${category}?page=${page}&size=10`;

      const response = await fetch(endpoint);
      const data: PaginatedAuctions = await response.json();

      if (data && data.content) {
        setAuctions(data.content);
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);
        setDisplayedPages(calculateDisplayedPages(data.number, data.totalPages));
      } else {
        console.error("Invalid API response:", data);
        setError("Invalid API response");
      }

      handleScrollToHiddenElement();
    } catch (error: any) {
      console.error("Error fetching auction data:", error.message);
      setError(`Failed to fetch auction data. ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchPreloadData = async () => {
      try {
        const response = await fetch("http://localhost:8080/lots/activePreview");
        const data: PaginatedAuctions = await response.json();

        if (data && data.content) {
          setAuctions(data.content);
          setIsPreloadComplete(true);
        } else {
          console.error("Invalid API response:", data);
          setError("Invalid API response");
        }
      } catch (error: any) {
        console.error("Error fetching auction data:", error.message);
        setError(`Failed to fetch auction data. ${error.message}`);
      }
    };

    fetchPreloadData();
  }, []);

  useEffect(() => {
    if (isPreloadComplete || selectedCategory !== null) {
      fetchAuctions();
    }
  }, [selectedCategory, isPreloadComplete, searchTerm]);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = auctions.map(async (auction) => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/images/getImage/${auction.titleImage}`);
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);

          setLoadedImages((prevImages) => ({
            ...prevImages,
            [auction.titleImage]: imageUrl,
          }));
        } catch (error) {
          console.error("Error loading image:", error);
        }
      });

      await Promise.all(imagePromises);
    };

    if (auctions.length > 0) {
      loadImages();
    }
  }, [auctions]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/lots/search/${searchTerm}`);
      const data: PaginatedAuctions = await response.json();

      if (data && data.content) {
        setAuctions(data.content);
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);
        setDisplayedPages(calculateDisplayedPages(data.number, data.totalPages));
      } else {
        console.error("Invalid API response:", data);
        setError("Invalid API response");
      }
    } catch (error: any) {
      console.error("Error fetching search results:", error.message);
      setError(`Failed to fetch search results. ${error.message}`);
    } finally {
      if (auctionsContainerRef.current) {
        auctionsContainerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const hiddenElementRef = useRef<HTMLDivElement>(null);

  const handleScrollToHiddenElement = () => {
    if (hiddenElementRef.current) {
      hiddenElementRef.current.style.display = "block";
      hiddenElementRef.current.scrollIntoView({ behavior: "smooth" });
      hiddenElementRef.current.style.display = "none";
    }
  };

  const calculateDisplayedPages = (currentPage: number, totalPages: number): number[] => {
    const pagesToShow = 5;
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    if (totalPages <= pagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    if (currentPage <= halfPagesToShow) {
      return Array.from({ length: pagesToShow }, (_, i) => i);
    }

    if (currentPage + halfPagesToShow >= totalPages) {
      return Array.from({ length: pagesToShow }, (_, i) => totalPages - pagesToShow + i);
    }

    return Array.from({ length: pagesToShow }, (_, i) => currentPage - halfPagesToShow + i);
  };

  return (
    <div className="w-3/4 pt-4 pl-4 pr-4 ml-auto mr-auto">
      <div className="flex items-center mb-3">
        <h1 className="text-3xl font-bold mb-2">Аукціони</h1>
        <input
          type="text"
          placeholder="Пошук..."
          className="ml-10 p-2 rounded-l-lg border-none focus:outline-none bg-gray-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="font-bold mr-10 bg-blue-700 text-white p-2 rounded-r-lg focus:outline-none"
          onClick={handleSearch}
        >
          Пошук
        </button>
      </div>
      <div className="max-h-screen h-[720px] overflow-y-auto mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <div ref={hiddenElementRef} style={{ display: "none", width: "auto" }}></div>
          {auctions.map((auction, index) => (
            <Link key={auction.id_lot} to={`/auction/${auction.name_of_lot}`}>
              <div
                key={index}
                className="h-[500px] bg-white rounded-lg p-4 mb-4 shadow-xl hover:bg-blue-100"
              >
                {loadedImages[auction.titleImage] && (
                  <img
                    src={loadedImages[auction.titleImage]}
                    alt={auction.name_of_lot}
                    className="w-full h-96 mb-2"
                  />
                )}
                <h2 className="text-xl font-bold">{auction.name_of_lot}</h2>
                <p className="line-clamp-2">{auction.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button
          className={`mx-2 px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={() => fetchAuctions(currentPage - 1)}
          disabled={currentPage === 0}
        >
          {"<"}
        </button>
        {displayedPages.map((page) => (
          <button
            key={page}
            className={`mx-2 px-4 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => fetchAuctions(page)}
          >
            {page + 1}
          </button>
        ))}
        <button
          className={`mx-2 px-4 py-2 rounded ${currentPage === totalPages - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={() => fetchAuctions(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default AuctionComponent;
