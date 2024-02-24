import Component from '../core/Component.js';

class CardItem extends Component {
  setup() {
    this.$state = {
      idx: this.$props.idx,
      profile: this.$props.profile,
      isFlipped: this.$props.isFlipped,
    };
  }

  render() {
    this.$target.appendChild(this.template());
  }

  template() {
    const cardDiv = document.createElement('div');

    cardDiv.classList.add('card');
    cardDiv.setAttribute('idx', this.$state.idx.toString());
    if (this.$state.isFlipped) {
      cardDiv.classList.add('is-flipped');
    }

    const frontDiv = document.createElement('div');
    frontDiv.classList.add('card_plane', 'card_plane--front');
    frontDiv.innerText = this.$state.profile.name;

    const backDiv = document.createElement('div');
    backDiv.classList.add('card_plane', 'card_plane--back');
    backDiv.innerText = this.$state.profile.mbti;

    cardDiv.appendChild(frontDiv);
    cardDiv.appendChild(backDiv);

    return cardDiv;
  }
}

export default CardItem;
