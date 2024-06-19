import { validator } from './validation/validator.ts';
import { NUMBER_VALIDATORS } from './validation/interfaces.ts';

function onInit(): void {
  const input: HTMLInputElement = document.querySelector('input')!,
    validationBtn: HTMLInputElement = document.querySelector('#validation-btn')!,
    cleanUpBtn = document.querySelector('#cleanup-btn')!,
    result: HTMLInputElement = document.querySelector('#result')!;

  validationBtn.addEventListener('click', (): void => {
    const validationMessage = validator(input.value, NUMBER_VALIDATORS);
    console.log('validationMessage: ', validationMessage);
    result.innerHTML = validationMessage;
  });

  cleanUpBtn.addEventListener('click', () => {
    input.value = '';
    result.innerHTML = '';
  });
}

onInit();
