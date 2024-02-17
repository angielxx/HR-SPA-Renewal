document.addEventListener("DOMContentLoaded", async () => {
  let cardStatusList;
  await fetch("/web/src/data/new_data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const DataWithIdx = data.map((item, idx) => ({ ...item, idx: idx + 1 }));

      localStorage.setItem("personalInfo", JSON.stringify(DataWithIdx));
      if (localStorage.getItem("cardStatus")) {
        cardStatusList = localStorage.getItem("cardStatus");
      } else {
        cardStatusList = DataWithIdx.map((item) => {
          return {
            idx: item.idx,
            status: false,
          };
        });
        localStorage.setItem("cardStatus", JSON.stringify(cardStatusList));
      }
    })
    .catch((error) => {
      console.error("Error fetching new_data.json:", error);
    });

  // personalInfo에서 데이터 가져오기
  const storedData = localStorage.getItem("personalInfo");
  const personalInfo = storedData ? JSON.parse(storedData) : [];

  function renderCards() {
    const cardsContainer = document.getElementById("cards_container");
    const cardStatusData = JSON.parse(localStorage.getItem("cardStatus"));
    cardsContainer.innerHTML = "";

    personalInfo.forEach((person, idx) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("idx", person.idx);

      const front = document.createElement("div");
      front.classList.add("card_plane", "card_plane--front");
      front.textContent = person.name;

      const back = document.createElement("div");
      back.classList.add("card_plane", "card_plane--back");
      back.textContent = person.mbti;

      card.appendChild(front);
      card.appendChild(back);

      cardStatusData[idx].status ? card.classList.add("is-flipped") : null;

      card.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
        const flipedIndex = card.getAttribute("idx");
        cardStatusData[flipedIndex - 1].status =
          card.classList.contains("is-flipped") || false;
        localStorage.setItem("cardStatus", JSON.stringify(cardStatusData));
      });

      cardsContainer.appendChild(card);
    });
  }

  // 초기 카드 로드
  renderCards();
});
