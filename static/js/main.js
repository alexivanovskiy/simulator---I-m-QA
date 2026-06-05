document.addEventListener('DOMContentLoaded', function () {
    // Находим все кнопки в модуле
    const buttons = document.querySelectorAll('.module .btn-white');

    // Правильные ответы для заданий
    const correctAnswers = {
        '1': 'no-error', // Для задания 1 правильный ответ — «Ошибки нет»
        '2': 'error',    // Для задания 2 правильный ответ — «Есть ошибка»
        '3': 'error',    // Для задания 3 правильный ответ — «Есть ошибка»
        '4': 'no-error', // Для задания 4 правильный ответ — «Ошибки нет»
        '5': 'error',    // Для задания 5 правильный ответ — «Есть нет»
    };

    // Функция для показа обратной связи
    function showFeedback(taskElement, isCorrect, message) {
        // Находим контейнер для обратной связи в текущем задании
        const feedbackContainer = taskElement.querySelector('.feedback-container');
        let feedback = feedbackContainer.querySelector('.feedback');

        // Если элемент обратной связи ещё не создан, создаём его
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'feedback hidden';
            feedbackContainer.appendChild(feedback);
        }

        // Сбрасываем предыдущие классы
        feedback.className = 'feedback hidden';
        feedback.textContent = message;

        // Определяем класс в зависимости от правильности ответа
        const feedbackClass = isCorrect ? 'correct' : 'incorrect';
        feedback.className = `feedback ${feedbackClass}`;

        // Показываем с анимацией
        setTimeout(() => {
            feedback.classList.add('visible');
        }, 10);

        // Прокручиваем к блоку с обратной связью
        feedback.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Автоматически скрываем через 4 секунды
        setTimeout(() => {
            feedback.classList.remove('visible');
            setTimeout(() => {
                feedback.className = 'feedback hidden';

            // ПОКАЗ СЛЕДУЮЩЕГО ЗАДАНИЯ ТОЛЬКО ПРИ ПРАВИЛЬНОМ ОТВЕТЕ
            if (isCorrect) {
                const currentTaskId = parseInt(taskElement.dataset.taskId);
                const nextTaskId = currentTaskId + 1;
                const nextTask = document.querySelector(`.task[data-task-id="${nextTaskId}"]`);

                if (nextTask) {
                    nextTask.classList.remove('hidden');
                    nextTask.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // ЕСЛИ ЭТО БЫЛО ПОСЛЕДНЕЕ ЗАДАНИЕ — ПОКАЗЫВАЕМ ФИНАЛЬНОЕ СООБЩЕНИЕ
                    const finalMessage = document.createElement('div');
                    finalMessage.className = 'feedback correct';
                    finalMessage.textContent = 'Поздравляем! Вы прошли все задания тренажёра! 🎉';
                    feedbackContainer.appendChild(finalMessage);
                    setTimeout(() => {
                        finalMessage.classList.add('visible');
                    }, 10);
                }
            }

               
            }, 500);
        }, 1000);
    }

    // Обработчик для всех кнопок
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Предотвращаем переход по ссылке

            // Получаем элемент задания и его ID
            const taskElement = this.closest('.task');
            const taskId = taskElement.dataset.taskId;
            const userAnswer = this.dataset.answer;
            const correctAnswer = correctAnswers[taskId];

            // Проверяем ответ
            // Проверяем ответ
            if (userAnswer === correctAnswer) {
                if (taskId === '1') {
                    showFeedback(taskElement, true, 'Всё верно. В этот раз ошибки нет! ✅');
                } else if (taskId === '2') {
                    showFeedback(taskElement, true, 'Правильно! Кнопки расположены не на одном уровне! 🛠️');
                } else if (taskId === '3') {
                    showFeedback(taskElement, true, 'Верно! При нажатии на ❤️ товар не добавился в избранное');
                } else if (taskId === '4') {
                    showFeedback(taskElement, true, 'Вот теперь кнопка добавить в избранное ❤️ работает');
                } else if (taskId === '5') {
                    showFeedback(taskElement, true, 'Верно! При уменьшении экрана текст и изображения выглядят не ровно')
                }
            } else {
                if (taskId === '1') {
                    showFeedback(taskElement, false, 'Здесь нет ошибки! Визуально всё выглядит красиво 🔎');
                } else if (taskId === '2') {
                    showFeedback(taskElement, false, 'На самом деле здесь есть ошибка! Присмотрись внимательнее 👀');
                } else if (taskId === '3') {
                    showFeedback(taskElement, false, 'Присмотрись: не все кнопки работают так как должны 👀');
                } else if (taskId === '4') {
                    showFeedback(taskElement, false, 'Ошибок нет, все кнопки работают корректно');
                } else if (taskId === '5') {
                    showFeedback(taskElement, false, 'При уменьшении экрана текст и изображения съезжают, так быть не должно');
                }
            }

        });
    });

    // --- ОБРАБОТЧИК КНОПКИ «КУПИТЬ» в 3 задании---
    const buyButtons = document.querySelectorAll('.btn-buy-primary');
    const notification = document.getElementById('cart-notification');

    buyButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Показываем уведомление
            notification.classList.remove('hidden');
            setTimeout(() => notification.classList.add('visible'), 10);

            // Скрываем через 3 секунды
            setTimeout(() => {
                notification.classList.remove('visible');
                setTimeout(() => notification.classList.add('hidden'), 400);
            }, 4000);
        });
    });

    // --- ОБРАБОТЧИК КНОПКИ «КУПИТЬ» в 4 задании---
    const buyButtonsTask4 = document.querySelectorAll('.btn-buy-primary2');
    const notificationTask4 = document.getElementById('cart-notification2');

    buyButtonsTask4.forEach(button => {
        button.addEventListener('click', function () {
            // Показываем уведомление
            notificationTask4.classList.remove('hidden');
            setTimeout(() => notificationTask4.classList.add('visible'), 10);

            // Скрываем через 3 секунды
            setTimeout(() => {
                notificationTask4.classList.remove('visible');
                setTimeout(() => notificationTask4.classList.add('hidden'), 400);
            }, 4000);
        });
    })

    // Обработчик для кнопки «избранное» в 4 задании
    const favoriteButtonsTask4 = document.querySelectorAll('.btn-favorite-classic2');
    favoriteButtonsTask4.forEach(button => {
        button.addEventListener('click', function () {
            // Проверяем, есть ли у кнопки класс 'active'
            if (this.classList.contains('active')) {
                // Если есть — убираем его (сбрасываем стили)
                this.classList.remove('active');
            } else {
                // Если нет — добавляем
                this.classList.add('active');
            }
        });
    });
});



