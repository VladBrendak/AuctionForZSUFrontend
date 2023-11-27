// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Carousel } from 'react-responsive-carousel';
// import useTokenValidation from "../components/useTokenValidation";
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// interface AuctionData {
//   id_lot: number;
//   name_of_lot: string;
//   authorEmail: string;
//   titleImage: string;
//   lotImages: string[];
//   category: string;
//   description: string;
//   expiration: string;
// }

// interface Bid {
//   userName: string;
//   bid: number;
//   datetime: Date;
// }

// interface BidData {
//   bids: Bid[];
// }

// export function AuctionPage() {
//   const { auctionName } = useParams();
//   const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
//   const [bidData, setBidData] = useState<BidData | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [termsOfUseConfirmed, setTermsOfUseConfirmed] = useState<boolean | null>(null);
//   const [bidAmount, setBidAmount] = useState<string>("");
//   const [bidError, setBidError] = useState<string | null>(null);
//   const isTokenValid = useTokenValidation();

//   useEffect(() => {
//     const fetchAuctionData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/lots/lot/${auctionName}`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch auction data. Status: ${response.status}`);
//         }
//         const data: AuctionData = await response.json();
//         setAuctionData(data);
//       } catch (error : any) {
//         setError(`Failed to fetch auction data. ${error.message}`);
//       }
//     };

//     const fetchBidData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/bids/auction/${auctionName}`);
//         const data: Bid[] = await response.json();

//         const formattedData: BidData = {
//           bids: data.map(bid => ({
//             ...bid,
//             datetime: new Date(bid.datetime),
//           })),
//         };

//         setBidData(formattedData);
//       } catch (error : any) {
//         setError(`Failed to fetch bid data. ${error.message}`);
//       }
//     };

//     const fetchTermsOfUseStatus = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken");

//         if (token) {
//           const response = await fetch("http://localhost:8080/users/getTermsOfUseState", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setTermsOfUseConfirmed(data); // Assuming data is a boolean
//           } else {
//             throw new Error(`Failed to fetch terms of use status. Status: ${response.status}`);
//           }
//         }
//       } catch (error:any) {
//         setError(`Failed to fetch terms of use status. ${error.message}`);
//       }
//     };

//     fetchAuctionData();
//     fetchBidData();
//     fetchTermsOfUseStatus();
//   }, [auctionName]);

//   const handleBidSubmit = async () => {
//     try {
//       const token = localStorage.getItem("jwtToken");

//       if (token) {
//         // Check if bidAmount is a valid number
//         if (!/^\d+$/.test(bidAmount)) {
//           setBidError("Invalid bid amount. Please enter a valid number.");
//           return;
//         }

//         // Additional validation logic if needed

//         const response = await fetch("http://localhost:8080/bids", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             lotId: auctionData?.id_lot,
//             bid: bidAmount,
//           }),
//         });

//         if (response.ok) {
//           // Handle success, maybe refresh the bid data
//           console.log("Bid submitted successfully!");
//         } else {
//           throw new Error(`Failed to submit bid. Status: ${response.status}`);
//         }
//       }
//     } catch (error:any) {
//       setError(`Failed to submit bid. ${error.message}`);
//     }
//   };

//   return (
//     <div className="bg-blue-500 min-h-screen flex flex-col items-center pb-10">
//       <div className="bg-opacity-60 bg-black mt-10 relative w-2/3 p-8 rounded-lg shadow-lg text-white text-center">
//         <h1 className="text-3xl font-bold mb-4">{auctionData?.name_of_lot}</h1>
//         <div style={{ height: '700px',width: 'calc(100% - 100px)', margin: '0 50px' }}>
//           <Carousel 
//             interval={8000}
//             stopOnHover={true}
//             autoPlay={true}
//             showArrows={true}
//             infiniteLoop={true}
//             dynamicHeight={false}
//             showStatus={false}
//             showThumbs={true}
//             className="carousel">
//             {auctionData?.lotImages.map((photo, index) => (
//               <div key={index} style={{ height: '600px', minHeight: "600px"}}>
//                 <img
//                   src={`http://localhost:8080/api/v1/images/getImage/${photo}`}
//                   alt={`Auction Slide ${index + 1}`}
//                   style={{width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '600px', minHeight: '80px', minWidth: '50px'}}
//                 />
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       </div>

//       <div className="mt-10 bg-white w-2/3 p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold">Додаткова інформація про аукціон</h2>
//         <p className="text-lg text-gray-600 mt-2">{auctionData?.description}</p>
//       </div>

//       <div className="mt-10 bg-white w-2/3 p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-5">Ставки на аукціон</h2>
//         {bidData && bidData.bids.length > 0 ? (
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-2 px-5 text-left">Bidder</th>
//                 <th className="py-2 px-5 text-left">Bid Amount</th>
//                 <th className="py-2 px-5 text-left">Time</th>
//                 <th className="py-2 px-5 text-left">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bidData?.bids.map((bid, index) => (
//                 <tr key={index} className={`${index === 0 ? 'bg-yellow-100' : index % 2 === 1 ? 'bg-blue-100' : 'bg-blue-200'} rounded`}>
//                   <td className="py-2 px-5 text-gray-600 font-semibold text-lg">
//                     {`${index === 0 ? `👑` + bid.userName : bid.userName}`}</td>
//                   <td className="py-2 px-5 font-semibold text-lg">{bid.bid}$</td>
//                   <td className="py-2 px-5 text-gray-600 font-semibold text-lg">{new Date(bid.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
//                   <td className="py-2 px-5 text-gray-600 font-semibold text-lg">{new Date(bid.datetime).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p> No bids yet. Become the first bidder!</p>
//         )}

//         {isTokenValid === null ? (
//           <h2 className="text-2xl font-bold">Please Log in to make a bid</h2>
//         ) : isTokenValid ? (
//           termsOfUseConfirmed ? (
//             <div className="mt-10 text-center">
//               <input
//                 type="text"
//                 placeholder="Enter bid amount"
//                 value={bidAmount}
//                 onChange={(e) => {
//                   setBidAmount(e.target.value);
//                   setBidError(null); // Clear previous error message on input change
//                 }}
//                 className={`border p-2 mb-4 ${bidError ? "border-red-500" : ""}`}
//               />
//               {bidError && <p className="text-red-500">{bidError}</p>}
//               <button
//                 onClick={handleBidSubmit}
//                 className="ml-5 mt-auto text-xl font-bold p-2 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-400"
//               >
//                 Make bid
//               </button>
//             </div>
//           ) : (
//             <h2 className="text-2xl font-bold">
//               You need to confirm terms of use to make a bid
//             </h2>
//           )
//         ) : (
//           <h2 className="text-2xl font-bold">Please Log in to make a bid</h2>
//         )}
//       </div>
//     </div>
//   );
// }

// -----------------------------------test-------------------------------------------------

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import useTokenValidation from "../components/useTokenValidation";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface AuctionData {
  id_lot: number;
  name_of_lot: string;
  authorEmail: string;
  titleImage: string;
  lotImages: string[];
  category: string;
  description: string;
  startBidAmount: number;
  expiration: string;
}

interface Bid {
  userName: string;
  bid: number;
  datetime: Date;
}

interface BidData {
  bids: Bid[];
}

export function AuctionPage() {
  const { auctionName } = useParams();
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [bidData, setBidData] = useState<BidData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [termsOfUseConfirmed, setTermsOfUseConfirmed] = useState<boolean | null>(null);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [bidError, setBidError] = useState<string | null>(null);
  const isTokenValid = useTokenValidation();

  const fetchBidData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/bids/auction/${auctionName}`);
      const data: Bid[] = await response.json();

      const formattedData: BidData = {
        bids: data.map(bid => ({
          ...bid,
          datetime: new Date(bid.datetime),
        })),
      };

      setBidData(formattedData);
    } catch (error: any) {
      setError(`Failed to fetch bid data. ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/lots/lot/${auctionName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch auction data. Status: ${response.status}`);
        }
        const data: AuctionData = await response.json();
        data.lotImages.unshift(data.titleImage);
        setAuctionData(data);
      } catch (error: any) {
        setError(`Failed to fetch auction data. ${error.message}`);
      }
    };

    const fetchTermsOfUseStatus = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        if (token) {
          const response = await fetch("http://localhost:8080/users/getTermsOfUseState", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setTermsOfUseConfirmed(data); // Assuming data is a boolean
          } else {
            throw new Error(`Failed to fetch terms of use status. Status: ${response.status}`);
          }
        }
      } catch (error: any) {
        setError(`Failed to fetch terms of use status. ${error.message}`);
      }
    };

    fetchAuctionData();
    fetchBidData();
    fetchTermsOfUseStatus();
  }, [auctionName]);

  const handleBidSubmit = async () => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      // Check if bidAmount is a valid number
      if (!/^\d+$/.test(bidAmount)) {
        setBidError("Invalid bid amount. Please enter a valid number.");
        return;
      }

      // Additional validation logic if needed

      // Check if bidData and bidData.bids are not null or undefined
      if (bidData?.bids && bidData.bids.length > 0) {
        // Check if bidAmount is higher than the current highest bid
        const highestBid = bidData.bids[0].bid;
        if (parseInt(bidAmount, 10) <= highestBid) {
          setBidError("Bid amount must be higher than the current highest bid.");
          return;
        }
      } else {
        // If there are no bids yet, check if bidAmount is equal or higher than startBidAmount
        const startBidAmount = auctionData?.startBidAmount || 0;
        if (parseInt(bidAmount, 10) < startBidAmount) {
          setBidError(`Bid amount must be equal or higher than the starting bid amount of ${startBidAmount}.`);
          return;
        }
      }

      const response = await fetch("http://localhost:8080/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lotId: auctionData?.id_lot,
          bid: bidAmount,
        }),
      });

      if (response.ok) {
        // Refresh bid data after a successful bid submission
        fetchBidData();
        console.log("Bid submitted successfully!");
      } else {
        throw new Error(`Failed to submit bid. Status: ${response.status}`);
      }
    }
  } catch (error: any) {
    setError(`Failed to submit bid. ${error.message}`);
  }
};

  return (
    <div className="bg-blue-500 min-h-screen flex flex-col items-center pb-10">
      <div className="bg-opacity-60 bg-black mt-10 relative w-2/3 p-8 rounded-lg shadow-lg text-white text-center">
        <h1 className="text-3xl font-bold mb-4">{auctionData?.name_of_lot}</h1>
        <div style={{ height: '700px', width: 'calc(100% - 100px)', margin: '0 50px' }}>
          <Carousel
            interval={8000}
            stopOnHover={true}
            autoPlay={true}
            showArrows={true}
            infiniteLoop={true}
            dynamicHeight={false}
            showStatus={false}
            showThumbs={true}
            selectedItem={-1}
            className="carousel">
            {auctionData?.lotImages.map((photo, index) => (
              <div key={index} style={{ height: '600px', minHeight: "600px" }}>
                <img
                  src={`http://localhost:8080/api/v1/images/getImage/${photo}`}
                  alt={`Auction Slide ${index + 1}`}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '600px', minHeight: '80px', minWidth: '50px' }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="mt-10 bg-white w-2/3 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Додаткова інформація про аукціон</h2>
        <p className="text-lg text-gray-600 mt-2">{auctionData?.description}</p>
      </div>

      <div className="mt-10 bg-white w-2/3 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Ставки на аукціон</h2>
        <h1 className="text-xl font-bold mb-5">Початкова ставка: {auctionData?.startBidAmount}$ </h1>
        {bidData && bidData.bids.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-5 text-left">Bidder</th>
                <th className="py-2 px-5 text-left">Bid Amount</th>
                <th className="py-2 px-5 text-left">Time</th>
                <th className="py-2 px-5 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {bidData?.bids.map((bid, index) => (
                <tr key={index} className={`${index === 0 ? 'bg-yellow-100' : index % 2 === 1 ? 'bg-blue-100' : 'bg-blue-200'} rounded`}>
                  <td className="py-2 px-5 text-gray-600 font-semibold text-lg">
                    {`${index === 0 ? `👑` + bid.userName : bid.userName}`}</td>
                  <td className="py-2 px-5 font-semibold text-lg">{bid.bid}$</td>
                  <td className="py-2 px-5 text-gray-600 font-semibold text-lg">{new Date(bid.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="py-2 px-5 text-gray-600 font-semibold text-lg">{new Date(bid.datetime).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bids yet. Become the first bidder!</p>
        )}

        {isTokenValid === null ? (
          <h2 className="text-2xl font-bold">Please Log in to make a bid</h2>
        ) : isTokenValid ? (
          termsOfUseConfirmed ? (
            <>
            { bidData && bidData?.bids[0] ? (
                <div className="mt-5 text-xl text-center"> Enter bigger bid than {bidData?.bids[0].bid}$ </div>
            ) : (
                <div className="mt-5 text-xl text-center"> Enter equal or bigger bid than {auctionData?.startBidAmount}$ </div>
            ) }
            <div className="mt-5 text-center">
              <input
                type="text"
                placeholder="Enter bid amount"
                value={bidAmount}
                onChange={(e) => {
                  setBidAmount(e.target.value);
                  setBidError(null); // Clear previous error message on input change
                }}
                className={`border p-2 mb-4 ${bidError ? "border-red-500" : ""}`}
              />
              {bidError && <p className="text-red-500">{bidError}</p>}
              <button
                onClick={handleBidSubmit}
                className="ml-5 mt-auto text-xl font-bold p-2 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-400"
              >
                Make bid
              </button>
            </div>
            </>
          ) : (
            <h2 className="text-2xl font-bold">
              You need to confirm terms of use to make a bid
            </h2>
          )
        ) : (
          <h2 className="text-2xl font-bold">Please Log in to make a bid</h2>
        )}
      </div>
      
    </div>
  );
}
