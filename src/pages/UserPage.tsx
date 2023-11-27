import React, { useState, useEffect } from "react";
import banana from "../images/banana.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface UserInfo {
    id: number;
    username: string;
    email: string;
    avatarImage: string;
    termsOfUseAccepted: boolean;
  }

interface UserLotInfo {
  id_lot: number;
  name_of_lot: string;
  titleImage: string;
  description: string;
}

interface UserBidInfo {
  lotName: number;
  bid: number;
  datetime: Date;
}

export function UserPage() {
  const history = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userLotInfo, setUserLotInfo] = useState<UserLotInfo[] | null>(null);
  const [userBidInfo, setUserBidInfo] = useState<UserBidInfo[] | null>(null);

  const AddAuction = () => {
    history("/addAuction");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      fetch(`http://localhost:8080/api/v1/auth/getUserInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUserInfo(data));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      const userId = userInfo.id;
      const token = localStorage.getItem("jwtToken");
  
      if (token && userId) {
        fetch(`http://localhost:8080/lots/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => setUserLotInfo(data))
          .catch((error) => console.error("Error fetching user lots:", error));
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      const userId = userInfo.id;
      const token = localStorage.getItem("jwtToken");
  
      if (token && userId) {
        fetch(`http://localhost:8080/bids/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => setUserBidInfo(data))
          .catch((error) => console.error("Error fetching user bids:", error));
      }
    }
  }, [userInfo]);

  const navigateToTermsOfUse = () => {
    history("/TermsOfUse");
  };

  const numAuctions = userLotInfo ? userLotInfo.length : 0;
  const numBids = userBidInfo ? userBidInfo.length : 0;

  return (
    <div className="bg-blue-500 min-h-screen flex flex-col items-center">
      {userInfo ? (
        <>
          {console.log('userInfo.isTermsOfUseAccepted: ' + userInfo.termsOfUseAccepted)}
          <div className="bg-opacity-60 bg-black mt-10 relative w-2/3 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
            <img
              src={`http://localhost:8080/api/v1/images/getImage/${userInfo.avatarImage}`}
              alt="Аватар користувача"
              className="w-96 h-96 ml-auto mx-auto lg:mx-0 rounded-full mb-4 lg:mr-8"
            />
            <div className="w-full text-white relative z-10 flex flex-col">
              <h2 className="text-2xl font-bold"> <span className="text-xl"> Псевдонім: </span> {userInfo.username} </h2>
              <p className="text-2xl font-bold"> <span className="text-xl">Електронна адреса: </span>{userInfo.email}</p>
              <p className="text-2xl font-bold"> <span className="text-xl">Аукціони користувача: </span>{numAuctions}</p>
              <p className="text-2xl font-bold mb-5"> <span className="text-xl">Ставки користувача: </span>{numBids}</p>
              {userInfo.termsOfUseAccepted ? (
                <div className="text-center mt-auto text-2xl font-bold p-4 bg-blue-500 rounded-lg shadow-lg">
                  <div>
                  <div>
                    <span>Умови користування сайтом прийняті ✔</span> <br />
                    <Link to="/TermsOfUse">
                      <span className="underline hover:bg-blue-600 rounded">Прочитати умови знову</span>
                    </Link>
                  </div>
                  </div>
                </div>
              ) : (
                <button className="mt-auto text-2xl font-bold p-4 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500" onClick={navigateToTermsOfUse}> Прийняти умови користування сайтом </button>
              )}
              
            </div>

          </div>


            <>
              <div className="mt-10 bg-white w-2/3 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold mb-5">Аукціони користувача</h2>
                  <div className="min-w-[1160px] max-h-[300px] overflow-y-auto">
                  {userLotInfo && userLotInfo.length > 0 ? ( // Check if there are user lots
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="py-2 px-5 text-left text-lg">Назва аукціону</th>
                          <th className="py-2 px-5 text-left text-lg" style={{ paddingLeft: "50px" }}>Опис</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userLotInfo.map((lot, index) => (
                          <tr key={index}>
                            <td className="text-blue-700 py-2 px-5 text-left text-lg">
                              <Link to={`/auction/${lot.name_of_lot}`}>
                                {lot.name_of_lot}
                              </Link>
                            </td>
                            <td
                              style={{
                                maxWidth: "470px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                paddingLeft: "50px",
                              }}
                            >
                              {lot.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    ) : (
                      <p> NO Lots Submitted</p>
                    )}
                    </div>
                    { userInfo.termsOfUseAccepted ? (
                      <button 
                        onClick={AddAuction}  
                        className="mt-5 text-xl font-bold p-4 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-300"> Add Auction </button>
                    ) : (
                      <p className="text-lg mt-5 font-bold"> Accept terms of use to be able to add your own Auctions</p>
                    )}
                </div>
              </div>
            </>


          <div className="mt-10 mb-10 bg-white w-2/3 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold">Ставки користувача</h2>
              <div className="min-w-[1160px] max-h-[300px] overflow-y-auto">
              {userBidInfo && userBidInfo.length > 0 ? (
                <table className="w-full mt-5">
                  <thead>
                    <tr>
                      <th className="py-2 px-5 text-left text-lg">Ім'я Лота</th>
                      <th className="py-2 px-5 text-left text-lg">Ставка</th>
                      <th className="py-2 px-5 text-left text-lg">Час</th>
                      <th className="py-2 px-5 text-left text-lg">Дата</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userBidInfo.map((bid, index) => (
                      <tr key={index}>
                        <td className="text-blue-700 py-2 px-5 text-left text-lg">
                          <Link to={`/auction/${bid.lotName}`}>
                            {bid.lotName}
                          </Link>
                        </td>
                        <td className="py-2 px-5 text-left text-lg">
                          {bid.bid}
                        </td>
                        <td className="py-2 px-5 text-left text-lg">
                          {new Date(bid.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-2 px-5 text-left text-lg">
                          {new Date(bid.datetime).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-5">NO bids made</p>
              )}
              </div>
            </div>
          </div>

        </>
      ) : (
        <p className="text-gray-600">Завантаження інформації про користувача...</p>
      )}
    </div>
  );
}
