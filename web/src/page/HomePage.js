import CardItem from '../components/CardItem.js';
import ContentTitle from '../components/ContentTitle.js';
import Component from '../core/Component.js';

class HomePage extends Component {
  async fetchProfiles() {
    const res = await fetch('/web/src/data/new_data.json');
    const profiles = await res.json();

    this.$state = { profiles };
    return profiles;
  }

  checkCardStatus(idx) {
    const profiles = this.$state.profiles;
    const cardStatus =
      JSON.parse(localStorage.getItem('cardStatus')) ||
      profiles.map((_, idx) => ({ idx, status: 'card' }));

    return cardStatus
      .find((card) => card.idx == idx)
      .status.split(' ')
      .includes('is-flipped');
  }

  async mounted() {
    const parent = document.querySelector('#page_content');

    new ContentTitle(parent, {
      title: 'Great People',
    });

    const cardContainer = document.createElement('div');
    cardContainer.id = 'cards_container';
    parent.appendChild(cardContainer);

    await this.fetchProfiles();
    const profiles = this.$state.profiles;

    profiles.forEach((profile, idx) => {
      new CardItem(document.querySelector('#cards_container'), {
        idx,
        profile,
        isFlipped: this.checkCardStatus(idx),
      });
    });
  }

  updateFlippedCards(idx, isFlipped) {
    const cardStatus =
      JSON.parse(localStorage.getItem('cardStatus')) ||
      this.$state.profiles.map((_, cardidx) => {
        return {
          idx: cardidx,
          status: idx == cardidx ? 'card is-flipped' : 'card',
        };
      });

    const newCardStatus = cardStatus.map((card) => ({
      ...card,
      status:
        card.idx == idx
          ? isFlipped
            ? 'card is-flipped'
            : 'card'
          : card.status,
    }));

    localStorage.setItem('cardStatus', JSON.stringify(newCardStatus));
  }

  setEvent() {
    this.addEvent('click', '.card', ({ target }) => {
      const card = target.closest('.card');
      const idx = card.getAttribute('idx');

      card.classList.toggle('is-flipped');
      const isFlipped = card.classList.contains('is-flipped');

      this.updateFlippedCards(idx, isFlipped);
    });
  }
}

export default HomePage;
