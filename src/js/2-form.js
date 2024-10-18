// Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
let formData = {
    email: "" ,
    message: "",
};
// Використовуй метод делегування для відстеження змін у формі через подію input. Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
const form = document.querySelector('.feedback-form');
// console.log(form.elements); //коллекция всех элементов формы
  const emailInput = form.elements.email;
const messageInput = form.elements.message;
  
  const STORAGE_KEY = 'feedback-form-state';

    // Функція для збереження даних у локальне сховище
  function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
  // Перевірка даних у локальному сховищі при завантаженні сторінки
  function loadFromLocalStorage() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      formData = JSON.parse(savedData);
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    }
  }

  // Функція для обробки події input і оновлення formData
  function handleInput(event) {
    formData[event.target.name] = event.target.value;
    saveToLocalStorage();
  }

  // Додаємо слухача подій для делегування
  form.addEventListener('input', handleInput);

  // Завантаження даних при відкритті сторінки
  loadFromLocalStorage();

  // Обробка відправлення форми
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    if (!formData.email || !formData.message) {
      alert('Fill please all fields');
      return;
    }

    console.log(formData);

    // Очищення даних після успішної відправки
    localStorage.removeItem(STORAGE_KEY);
    formData = { email: "", message: "" };
    emailInput.value = '';
    messageInput.value = '';
  });