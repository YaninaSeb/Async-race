import { countAllCars, getCarsAPI, getCarAPI, createCarAPI, deleteCarAPI, updateCarAPI } from './api_garage';
import { createCarUI } from '../ui';
import { getRandomName, getRandomColor, DescriptionCar } from './utils_garage';
import { getAllWinnersAPI, deleteWinnerAPI } from '../winners/api_winners';
import { updateWinnersUI } from '../winners/buttons_winners';
import { resetRace } from './drive_car';

const btnPrevCars = <HTMLButtonElement>document.querySelector('.btn-prev');
const btnNextCars = <HTMLButtonElement>document.querySelector('.btn-next');
const numPage = <HTMLSpanElement>document.querySelector('.count-page');
const generateNewCarBtn = <HTMLElement>document.querySelector('.generate-cars');
const btnGenerateCards = <HTMLElement>document.querySelector('.btn-generate_cars');
const containerCar = <HTMLElement>document.querySelector('.container-car');
const countGarage = <HTMLElement>document.querySelector('.count-garage');
const inputTextCreate = <HTMLInputElement>document.querySelector('.text-create');
const inputColorCreate = <HTMLInputElement>document.querySelector('.color-create');


const inputTextUpdate = <HTMLInputElement>document.querySelector('.text-update');
const inputColorUpdate = <HTMLInputElement>document.querySelector('.color-update');
const btnUpdate = <HTMLInputElement>document.querySelector('.btn-update');

let idUpdateCar: number;
export let numberPage = 1;

//ОБНОВЛЕНИЕ МАШИНОК
export const updateCarsUI = () => {
  getCarsAPI(numberPage).then((arr: DescriptionCar[]) => {
    containerCar.innerHTML = '';


    arr.forEach((car) => {
      const oneCar = `${createCarUI(car.id, car.name, car.color)}`;
      containerCar.innerHTML += oneCar;
    });
    countGarage.textContent = `(${countAllCars})`;
  });
};
updateCarsUI();

//ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ С МАШИНКАМИ
btnPrevCars.addEventListener('click', () => {
  if (numberPage === 1) {
    btnPrevCars.setAttribute('disabled', 'disabled');
  } else {
    btnNextCars.removeAttribute('disabled');
      numberPage -= 1;
      numPage.textContent = `${numberPage}`;
  }
  updateCarsUI();
  resetRace();
});

btnNextCars.addEventListener('click', () => {
  if (numberPage * 7 >= countAllCars) {
    btnNextCars.setAttribute('disabled', 'disabled');
  } else {
    btnPrevCars.removeAttribute('disabled');
    numberPage += 1;
    numPage.textContent = `${numberPage}`;
  }
  updateCarsUI();
  resetRace();
});


//УДАЛЕНИЕ И ИНИЦИАЛИЗАЦИЯ ИЗМЕНЕНИЯ СУЩЕСТВУЮЩЕЙ МАШИНКИ
document.addEventListener('click', async (e) => {
  const btn = e.target as HTMLElement;

  if (btn.classList.contains('car-options_select')) {
    idUpdateCar = Number(btn.dataset.select);
    inputTextUpdate.disabled = false;
    inputColorUpdate.disabled = false;
    btnUpdate.disabled = false;

    getCarAPI(idUpdateCar).then((item) => {
      inputTextUpdate.value = item.name;
      inputColorUpdate.value = item.color;
    });
  }

  if (btn.classList.contains('car-options_remove')) {
    const idButton = Number(btn.dataset.remove);
    deleteCarAPI(idButton).then(() => updateCarsUI());

    getAllWinnersAPI().then((arrAllWin) => {
      arrAllWin.forEach((item: DescriptionCar) => {
        if (Number(item.id) === idButton) deleteWinnerAPI(idButton);
      });
    }).then(() => updateWinnersUI());
  }
});


//СОЗДАНИЕ НОВОЙ И ОБНОВЛЕНИЕ СУЩЕСТВУЮЩЕЙ МАШИНКИ
generateNewCarBtn.addEventListener('click', (e) => {
  const elem = e.target as HTMLElement;

  if (elem.classList.contains('btn-create')) {
    const nameNewCar =  inputTextCreate.value;
    const colorNewCar =  inputColorCreate.value;

    if (nameNewCar == '') {
      alert('Please, enter name car!');
    } else {
      (createCarAPI({ 'name': nameNewCar, 'color': colorNewCar })).then(() => updateCarsUI());
    }

    if (countAllCars % 7 === 0) btnNextCars.removeAttribute('disabled');
    inputTextCreate.value = '';
  }

  if (elem.classList.contains('btn-update')) {
    const nameUpdateCar =  inputTextUpdate.value;
    const colorUpdateCar =  inputColorUpdate.value;
    
    (updateCarAPI( { 'name': nameUpdateCar, 'color': colorUpdateCar }, idUpdateCar)).then(() => updateCarsUI() );
    
    inputTextUpdate.value = '';
    inputTextUpdate.disabled = true;
    inputColorUpdate.disabled = true;
    btnUpdate.disabled = true;
  }
});

//ГЕНЕРАЦИЯ 100 МАШИНОК
btnGenerateCards.addEventListener('click', async () => {
  for (let i = 0; i < 100; i++){
    const name = getRandomName();
    const color = getRandomColor();
  
    createCarAPI({ 'name': `${name}`, 'color': `${color}` });
  }
  updateCarsUI();
  btnNextCars.removeAttribute('disabled');
});
