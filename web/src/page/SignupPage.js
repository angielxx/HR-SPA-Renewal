import ContentTitle from '../components/ContentTitle.js';
import FormElem from '../components/FormElem.js';
import Component from '../core/Component.js';

class SignupPage extends Component {
  mounted() {
    const parent = document.querySelector('#page_content');

    new ContentTitle(parent, {
      title: 'Signup Great People!',
    });

    const formContainer = document.createElement('div');
    formContainer.id = 'form_container';

    new FormElem(formContainer, {
      type: 'input',
      id: 'name',
      placeholder: '이름',
    });

    new FormElem(formContainer, {
      type: 'input',
      id: 'email',
      placeholder: '이메일',
    });

    new FormElem(formContainer, {
      type: 'input',
      id: 'nickname',
      placeholder: '닉네임',
    });

    new FormElem(formContainer, {
      type: 'select',
      id: 'role',
      name: 'role',
      options: [
        { value: '', innerText: '직군을 선택해주세요' },
        { value: 'developer', innerText: '개발자' },
        { value: 'designer', innerText: '디자이너' },
        { value: 'planner', innerText: '기획자' },
      ],
    });

    new FormElem(formContainer, {
      type: 'select',
      id: 'mbti',
      name: 'mbti',
      options: [
        { value: '', innerText: 'MBTI를 선택해주세요' },
        { value: 'ENFP', innerText: 'ENFP' },
        { value: 'ENFJ', innerText: 'ENFJ' },
        { value: 'ENTP', innerText: 'ENTP' },
        { value: 'ENTJ', innerText: 'ENTJ' },
        { value: 'ESFP', innerText: 'ESFP' },
        { value: 'ESFJ', innerText: 'ESFJ' },
        { value: 'ESTP', innerText: 'ESTP' },
        { value: 'ESTJ', innerText: 'ESTJ' },
        { value: 'INFP', innerText: 'INFP' },
        { value: 'INFJ', innerText: 'INFJ' },
        { value: 'INTP', innerText: 'INTP' },
        { value: 'INTJ', innerText: 'INTJ' },
        { value: 'ISFP', innerText: 'ISFP' },
        { value: 'ISFJ', innerText: 'ISFJ' },
        { value: 'ISTP', innerText: 'ISTP' },
        { value: 'ISTJ', innerText: 'ISTJ' },
      ],
    });

    new FormElem(formContainer, {
      type: 'submit',
      label: '등록',
    });

    parent.appendChild(formContainer);
  }
}

export default SignupPage;
