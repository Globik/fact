const settingsDonation = function(n){
	return ` <link href="/css/settingsDonation.css" rel="stylesheet">
	<a href="#."  class="overlay" id="settingsDonation"></a>
	<output id="settingsDonationOutput" class="popi">
	<section class="stream-settings-section">
    <h2 class="h2">Настройки интеграций</h2>

    <!-- Блок 1: Донат Tips.Tips  settingsDonation.js -->
    <div class="setting-block">
        <label for="donat-url" class="field-label">
            Ссылка на личный донат (Tips.Tips)
            <small class="hint">Аналог DonationAlerts. Убедитесь, что ссылка ведет именно на ваш профиль.</small>
        </label>
        
        <div class="input-group">
            <input 
                type="checkbox" 
                id="toggle-donat" 
                checked 
                data-target-input="#donat-url" 
                data-target-btn="#save-donat"
            >
            <label for="toggle-donat" class="toggle-label">Вкл</label>

            <input 
                type="url" 
                id="donat-url" 
                placeholder="https://tips.tips/username"
                required
            >
            
            <button type="button" id="save-donat" class="btn-save">Сохранить</button>
        </div>
        <span class="error-msg" id="err-donat"></span>
    </div>

    <!-- Блок 2: Виджет прогресса сбора денег -->
    <div class="setting-block">
        <label for="progress-url" class="field-label">
            URL виджета прогресса сбора средств
            <small class="hint">Ссылка на iframe-виджет цели сбора.</small>
        </label>
        
        <div class="input-group">
            <input 
                type="checkbox" 
                id="toggle-progress" 
                checked 
                data-target-input="#progress-url" 
                data-target-btn="#save-progress"
            >
            <label for="toggle-progress" class="toggle-label">Вкл</label>

            <input 
                type="url" 
                id="progress-url" 
                placeholder="https://example.com/widget/progress"
                required
            >
            
            <button type="button" id="save-progress" class="btn-save">Сохранить</button>
        </div>
        <span class="error-msg" id="err-progress"></span>
    </div>

    <!-- Блок 3: Виджет оповещения о донатах -->
    <div class="setting-block">
        <label for="alert-url" class="field-label">
            URL виджета звукового/визуального оповещения
            <small class="hint">Ссылка на сервис уведомлений (например, Streamlabs Alert Box).</small>
        </label>
        
        <div class="input-group">
            <input 
                type="checkbox" 
                id="toggle-alert" 
                checked 
                data-target-input="#alert-url" 
                data-target-btn="#save-alert"
            >
            <label for="toggle-alert" class="toggle-label">Вкл</label>

            <input 
                type="url" 
                id="alert-url" 
                placeholder="https://alerts.example.com/streamer-id"
                required
            >
            
            <button type="button" id="save-alert" class="btn-save">Сохранить</button>
        </div>
        <span class="error-msg" id="err-alert"></span>
    </div>

    <!-- Блок 4: QR Код (Файл) -->
    <div class="setting-block">
        <label for="qr-file" class="field-label">
            Загрузите изображение для QR кода
            <small class="hint">Поддерживаются PNG, JPG, SVG. Файл преобразуется в Base64 автоматически.</small>
        </label>
        
        <div class="input-group file-group">
            <input 
                type="checkbox" 
                id="toggle-qr" 
                checked 
                data-target-input="#qr-file" 
                data-target-preview="#qr-preview-container"
            >
            <label for="toggle-qr" class="toggle-label">Вкл</label>

            <input 
                type="file" 
                id="qr-file" 
                accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
            >
        </div>
        
        <!-- Контейнер для превью -->
        <div id="qr-preview-container" class="preview-box">
            <p class="placeholder-text">Здесь появится ваше изображение</p>
            <!-- Сюда JS вставит <img src="data:image..."> -->
        </div>
    </div>
</section></output>
	`;
}
module.exports = { settingsDonation }
