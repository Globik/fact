function getSettingDonation(){
	window.location.href = "#settingsDonation";
	panelOpenStream();
}
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Управление включением/выключением блоков ---
    
    const toggles = document.querySelectorAll('input[type="checkbox"][id^="toggle-"]');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const targetInputSelector = this.getAttribute('data-target-input');
            const targetBtnSelector = this.getAttribute('data-target-btn');
            const targetPreviewSelector = this.getAttribute('data-target-preview');
            
            const targetInput = document.querySelector(targetInputSelector);
            const targetBtn = targetBtnSelector ? document.querySelector(targetBtnSelector) : null;
            const targetPreview = targetPreviewSelector ? document.querySelector(targetPreviewSelector) : null;

            if (targetInput) {
                targetInput.disabled = !this.checked;
                
                // Если выключили инпут, очищаем ошибки
                if (!this.checked && targetInput.nextElementSibling?.classList.contains('error-msg')) {
                    clearError(targetInput.id.replace('-url', '')); 
                }
            }

            if (targetBtn) {
                targetBtn.disabled = !this.checked;
            }
            
            // Для превью картинки просто скрываем/показываем блок или делаем неактивным выбор
            if (targetPreview) {
                 if(!this.checked) {
                     targetPreview.style.opacity = '0.5';
                     targetPreview.style.pointerEvents = 'none';
                 } else {
                     targetPreview.style.opacity = '1';
                     targetPreview.style.pointerEvents = 'auto';
                 }
             }
        });
        
        // Инициализация состояния при загрузке
        const event = new Event('change');
        toggle.dispatchEvent(event);
    });


    // --- 2. Валидация и Сохранение URL ---
    
    /**
     * Проверка конкретного сервиса
     * @param {string} url - введенный адрес
     * @param {string} serviceName - имя сервиса для сообщения об ошибке
     * @returns {boolean}
     */
    function validateUrl(url, allowedDomains = []) {
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname.toLowerCase();
            
            // Простая проверка протокола
            if (!['http:', 'https:'].includes(parsedUrl.protocol)) return false;

            // Если есть список разрешенных доменов, проверяем совпадение
            if (allowedDomains.length > 0) {
                return allowedDomains.some(domain => hostname === domain || hostname.endsWith('.' + domain));
            }
            
            // По умолчанию считаем валидным любой корректный HTTP(S) URL
            return true;
        } catch (e) {
            return false; // Невалидный формат URL
        }
    }

    function showError(fieldId, message) {
        const errorSpan = document.getElementById(`err-${fieldId}`);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    function clearError(fieldId) {
        const errorSpan = document.getElementById(`err-${fieldId}`);
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }

    // Обработчик клика по кнопкам Сохранить
    document.querySelectorAll('.btn-save').forEach(btn => {
        btn.addEventListener('click', function() {
            // Находим соответствующий инпут по ID кнопки (предполагаем структуру save-X -> X-url)
            const btnId = this.id; // например "save-donat"
            const fieldName = btnId.replace('save-', ''); // "donat"
            const inputEl = document.getElementById(`${fieldName}-url`);
            
            if (!inputEl || inputEl.disabled) return;

            const val = inputEl.value.trim();
            let isValid = false;
            let errorMsg = "";

            // Специальная логика для Tips.Tips
            if (fieldName === 'donat') {
                // Разрешаем только tips.tips
                isValid = validateUrl(val, ['tips.tips']);
                if (!isValid) {
                    errorMsg = "Ошибка: Ссылка должна вести на сервис tips.tips";
                }
            } else {
                // Для остальных проверяем общую валидность URL
                isValid = validateUrl(val);
                if (!isValid) {
                    errorMsg = "Некорректный URL. Убедитесь, что ссылка начинается с http:// или https://";
                }
            }

            if (isValid) {
                clearError(fieldName);
                alert(`URL для "${fieldName}" успешно сохранен!`);
                // Здесь можно добавить код отправки данных на сервер (fetch/ajax)
            } else {
                showError(fieldName, errorMsg);
            }
        });
    });


    // --- 3. Обработка загрузки файла (Base64) ---
    
    const qrFileInput = document.getElementById('qr-file');
    const previewContainer = document.getElementById('qr-preview-container');

    qrFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (!file) return;

        // Проверяем тип файла
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            alert("Пожалуйста, выберите файл формата PNG, JPG или SVG.");
            return;
        }

        const reader = new FileReader();

        reader.onloadstart = function() {
            previewContainer.innerHTML = '<p class="placeholder-text">Загрузка...</p>';
        };

        reader.onloadend = function() {
            if (reader.readyState === 2) { // DONE
                const base64String = reader.result; // Это уже data:image/...;base64,...
                
                // Создаем элемент изображения
                const img = new Image();
                img.src = base64String;
                img.alt = "QR Code Preview";
                
                // Очищаем контейнер и вставляем картинку
                previewContainer.innerHTML = '';
                previewContainer.appendChild(img);
                
                console.log("Base64 готов:", base64String.substring(0, 50) + "...");
            }
        };

        reader.readAsDataURL(file);
    });
});
