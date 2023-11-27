import { spawn } from "child_process";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserInfo {
    id: number;
    username: string;
    email: string;
    avatarImage: string;
    termsOfUseAccepted: boolean;
  }

export function TermsOfUsePage() {
  const history = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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

  const acceptTerms = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (token) {
        const response = await fetch("http://localhost:8080/users/acceptTermsOfUse", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        if (response.ok) {
          setIsAccepted(true);
        } else {
          console.error("Error accepting terms");
        }
      }
    } catch (error) {
      console.error("Error accepting terms:", error);
    }
  };

  const goBack = () => {
    history(-1);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="text-lg relative bg-white rounded p-4 m-10">
        <div className="container mx-auto mt-8 p-8 bg-white rounded-lg">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center">Умови використання сайту аукціону "Auctioneer"</h1>
            <ol className="list-decimal pl-6 mb-6">
                <li className="mb-4"><strong>Правила публікації лотів:</strong>
                    <ul className="list-disc pl-6">
                        <li>Кожен користувач зобов'язується не розміщувати лоти, які суперечать чинному законодавству або можуть бути визнані незаконними.</li>
                        <li>Заборонено розміщення матеріалів, які порушують права інших користувачів чи третіх осіб.</li>
                    </ul>
                </li>
                <li className="mb-4"><strong>Правила участі в аукціонах:</strong>
                    <ul className="list-disc pl-6">
                        <li>Користувачі повинні дотримуватися визначених термінів і умов для участі в аукціонах.</li>
                        <li>Заборонено штучне підняття цін на лоти з метою маніпуляції аукціоном.</li>
                    </ul>
                </li>
                <li className="mb-4"><strong>Відповідальність користувача:</strong>
                    <ul className="list-disc pl-6">
                        <li>Користувачі несуть особисту відповідальність за достовірність інформації, розміщеної на сайті аукціону.</li>
                        <li>Сайт аукціону не несе відповідальність за можливі збитки чи непорозуміння між користувачами.</li>
                    </ul>
                </li>
                <li className="mb-4"><strong>Контроль доступу:</strong>
                    <ul className="list-disc pl-6">
                        <li>Заборонено намагання отримати несанкціонований доступ до особистої інформації інших користувачів.</li>
                    </ul>
                </li>
                <li className="mb-4"><strong>Інтелектуальна власність:</strong>
                    <ul className="list-disc pl-6">
                        <li>Користувачі повинні поважати права на інтелектуальну власність, не порушуючи авторські права та патенти третіх осіб.</li>
                    </ul>
                </li>
            </ol>

            <p><strong>Зауваження:</strong> Ці умови можуть бути змінені адміністрацією сайту аукціону. Користувачі зобов'язані регулярно перевіряти оновлення умов використання.</p>
        </div>
        <div className="flex items-center justify-center">
            <button className="p-2 m-3 bg-red-200 rounded hover:bg-red-400 font-bold text-black-100" onClick={goBack}>
                Go back
            </button>
            {userInfo?.termsOfUseAccepted ? (
                <span className={`p-2 m-3 rounded font-bold text-black-100 bg-green-100`}> ACCEPTED ✔</span>
            ) : (
                <button
                className={`p-2 m-3 ${isAccepted ? "bg-green-400" : "bg-green-200"} rounded hover:bg-green-400 font-bold text-black-100`}
                onClick={isAccepted ? goBack : acceptTerms}
                >
                    {isAccepted ? "Accepted ✔" : "Accept All"}
                </button>
            )}

        </div>
      </div>
    </div>
  );
};
