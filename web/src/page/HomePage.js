document.addEventListener("DOMContentLoaded", async () => {
  const newData = await fetch("/web/src/data/new_data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const DataWithIdx = data.map((item, idx) => ({ ...item, idx: idx + 1 }));

      localStorage.setItem("personalInfo", JSON.stringify(DataWithIdx));
    })
    .catch((error) => {
      console.error("Error fetching new_data.json:", error);
    });

  // personalInfo에서 데이터 가져오기
  const storedData = localStorage.getItem("personalInfo");
  console.log(storedData);
  const personalInfo = storedData ? JSON.parse(storedData) : [];

  function renderCards() {
    const cardsContainer = document.getElementById("cards_container");
    cardsContainer.innerHTML = "";

    personalInfo.forEach((person) => {
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

      card.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
        updateCardStatus(person.idx, card.classList.contains("is-flipped"));
      });

      cardsContainer.appendChild(card);
    });
  }

  // 초기 카드 로드
  renderCards();

  // 이후 코드...
});
