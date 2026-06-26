document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.module .btn-white');

    const correctAnswers = {
        '1': 'no-error',
        '2': 'error',
        '3': 'error',
        '4': 'no-error',
        '5': 'error',
        '6': 'error',
        '7': 'error'
    };

    // ===================== ОСНОВНАЯ ФУНКЦИЯ =====================
    function showFeedback(taskElement, isCorrect, message) {
        const feedbackContainer = taskElement.querySelector('.feedback-container');
        let feedback = feedbackContainer.querySelector('.feedback:not(.final-congratulation)');

        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'feedback';
            feedbackContainer.appendChild(feedback);
        }

        feedback.className = 'feedback';
        feedback.textContent = message;

        const feedbackClass = isCorrect ? 'correct' : 'incorrect';
        feedback.classList.add(feedbackClass);

        setTimeout(() => {
            feedback.classList.add('visible');
        }, 10);

        feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Скрываем сообщение через 4.5 секунды
        setTimeout(() => {
            feedback.classList.remove('visible');

            setTimeout(() => {
                feedback.className = 'feedback hidden';

                if (isCorrect) {
                    const currentTaskId = parseInt(taskElement.dataset.taskId);
                    const nextTaskId = currentTaskId + 1;
                    const nextTask = document.querySelector(`.task[data-task-id="${nextTaskId}"]`);

                    if (nextTask) {
                        nextTask.classList.remove('hidden');
                        nextTask.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        // === ФИНАЛ ТРЕНАЖЁРА ===
                        const finalMessage = document.createElement('div');
                        finalMessage.className = 'feedback correct final-congratulation';
                        finalMessage.textContent = 'Поздравляем! Вы прошли все задания тренажёра! 🎉';
                        feedbackContainer.appendChild(finalMessage);

                        setTimeout(() => {
                            finalMessage.classList.add('visible');
                        }, 300);

                        // Показываем футер + скроллим к нему
                        const footer = document.querySelector('footer');
                        if (footer) {
                            setTimeout(() => {
                                footer.classList.add('show');
                                
                                // Плавный скролл до футера
                                setTimeout(() => {
                                    footer.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'   // можно изменить на 'center', если хочешь
                                    });
                                }, 900);
                            }, 1200);
                        }
                    }
                }
            }, 500);
        }, 500);
    }

    // ===================== ОБРАБОТЧИК КНОПОК =====================
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const taskElement = this.closest('.task');
            const taskId = taskElement.dataset.taskId;
            const userAnswer = this.dataset.answer;
            const correctAnswer = correctAnswers[taskId];

            if (userAnswer === correctAnswer) {
                if (taskId === '1') showFeedback(taskElement, true, 'Всё верно. В этот раз ошибки нет!✅');
                else if (taskId === '2') showFeedback(taskElement, true, 'Правильно! Кнопки расположены не на одном уровне! 🛠️');
                else if (taskId === '3') showFeedback(taskElement, true, 'Верно! кнопка добавить в избранное ❤️ не работает');
                else if (taskId === '4') showFeedback(taskElement, true, 'Вот теперь кнопка добавить в избранное ❤️ работает');
                else if (taskId === '5') showFeedback(taskElement, true, 'Верно! Кнопка "Найти тур" не работает');
                else if (taskId === '6') showFeedback(taskElement, true, 'Верно, при ручном вводе значение не дублируется');
                else if (taskId === '7') showFeedback(taskElement, true, 'Верно, кнопка ❌ не стирает текст, а на смартфоне текст не видно');
            } else {
                if (taskId === '1') showFeedback(taskElement, false, 'Здесь нет ошибки! Визуально всё выглядит красиво 🔎');
                else if (taskId === '2') showFeedback(taskElement, false, 'На самом деле здесь есть ошибка! Присмотрись внимательнее 👀');
                else if (taskId === '3') showFeedback(taskElement, false, 'Присмотрись: не все кнопки работают так как должны 👀');
                else if (taskId === '4') showFeedback(taskElement, false, 'Ошибок нет, все кнопки работают корректно');
                else if (taskId === '5') showFeedback(taskElement, false, 'Если бы всё работало, то перед тобой был бы список туров');
                else if (taskId === '6') showFeedback(taskElement, false, 'Проверь корректность работы ручного ввода');
                else if (taskId === '7') showFeedback(taskElement, false, 'Неверно, проверь все кнопки и поведение на смартфоне');
            }
        });
    });

    // ===================== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =====================

    // Кнопка "Купить" (задание 3)
    document.querySelectorAll('.btn-buy-primary').forEach(btn => {
        btn.addEventListener('click', () => {
            const notif = document.getElementById('cart-notification');
            notif.classList.remove('hidden');
            setTimeout(() => notif.classList.add('visible'), 10);
            setTimeout(() => notif.classList.remove('visible'), 3800);
        });
    });

    // Кнопка "Купить" (задание 4)
    document.querySelectorAll('.btn-buy-primary2').forEach(btn => {
        btn.addEventListener('click', () => {
            const notif = document.getElementById('cart-notification2');
            notif.classList.remove('hidden');
            setTimeout(() => notif.classList.add('visible'), 10);
            setTimeout(() => notif.classList.remove('visible'), 3800);
        });
    });

    // Кнопка сердечко (задание 4)
    document.querySelectorAll('.btn-favorite-classic2').forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });

    // Фильтр цены (задание 6)
    const range = document.getElementById('price');
    const valueSpan = document.getElementById('price_value');
    const numberInput = document.getElementById('price_to');
    const valueBox = document.querySelector('.range-value-box');

    function updateSlider() {
        const val = parseInt(range.value) || 0;
        valueSpan.textContent = val;
        numberInput.value = val;

        let percent = ((val - 0) / 10000) * 100;
        if (percent < 8) percent = 8;
        if (percent > 92) percent = 92;
        valueBox.style.left = percent + '%';
    }

    range.addEventListener('input', updateSlider);
    updateSlider();

    // Поле поиска (задание 7)
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const clearBtn = document.getElementById('clear-btn');
    const searchResult = document.getElementById('search-result');

    function performSearch() {
        const query = searchInput.value.trim();
        searchResult.innerHTML = query === '' 
            ? `<span style="color:#e74c3c;">Введите поисковый запрос</span>` 
            : `✅ Найдено по запросу: <strong>${query}</strong>`;
        searchResult.classList.remove('hidden');
    }

    searchInput.addEventListener('input', () => {
        clearBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';
    });

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') performSearch();
    });

});