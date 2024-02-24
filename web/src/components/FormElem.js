import Component from '../core/Component.js';

class FormElem extends Component {
  setup() {
    this.$state = this.$props;
  }

  render() {
    this.$target.appendChild(this.template());
  }

  getElem() {
    const input = (id, placeholder) => {
      return `<input id=${id} placeholder=${placeholder} />`;
    };

    const select = (id, name, options) => {
      let optionsHTML = '';
      options.forEach(({ value, innerText }) => {
        optionsHTML += `<option value=${value}>${innerText}</option>`;
      });

      return `<select id=${id} name=${name}>${optionsHTML}</select>`;
    };

    const submit = (label) => {
      return `<button type="submit">${label}</button>`;
    };

    return {
      input,
      select,
      submit,
    };
  }

  getNodeFromString(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstChild;
  }

  template() {
    const formElemParent = this.getNodeFromString(
      `<span class="form_elem"></span>`
    );
    let formElemChildHtml;

    const getElem = this.getElem();

    if (this.$state.type === 'input') {
      formElemChildHtml = getElem.input(
        this.$state.id,
        this.$state.placeholder
      );
    } else if (this.$state.type === 'select') {
      formElemChildHtml = getElem.select(
        this.$state.id,
        this.$state.name,
        this.$state.options
      );
    } else if (this.$state.type === 'submit') {
      formElemChildHtml = getElem.submit(this.$state.label);
    }

    const formElemChild = this.getNodeFromString(formElemChildHtml);

    formElemParent.appendChild(formElemChild);

    return formElemParent;
  }
}

export default FormElem;
