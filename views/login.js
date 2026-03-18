const login = function(n){
	const { lang } = n;
	return ` <a href="#."  class="overlay" id="login"></a>
    <output id="loginoutput" class="popi">
        <div class="modal-header">
          ${lang=='ru'?'Авторизация / Регистрация':lang=='en'?'Login / Sign up':lang=='zh'?'授权/注册':lang=='id'?'Masuk / daftar':''}
          <span class="model-header-label" onclick="isOpenModal();">
            ${lang == 'ru'?'Правила чата':lang=='en'?'Chat rules':lang=='zh'?'聊天规则':lang=='id'?'aturan obrolan':''}
          </span>
        </div>
       <br> <br>
        <div class="modal-body">
          <div class="error-message" id="errormsg"></div>
         <form name="formlogin" id="myform">
            <label for="name" style="margin-top: 5px;">${lang=='ru'?'Имя':lang=='en'?'Nick' :lang=='zh'?'姓名':lang=='id'?'nama':''} </label>
            <input  name="username" type="text" placeholder="${lang=='ru'?'Введите Логин':lang=='en'?'Login':lang=='zh'?'姓名':lang=='id'?'nama':''}" id="name" required minlength="2" maxlength="20">

            <label for="name">${lang=='ru'?'Пароль':lang=='en'?'Password':lang=='zh'?'密码':lang=='id'?'kata sandi':''}</label>
            <input  name="userpassword" type="password" autocomplete="on" placeholder="${lang=='ru'?'Введите пароль':lang=='en'?'password':lang=='zh'?'密码':lang=='id'?'kata sandi':''}" id="password" required minlength="2" maxlength="20">
			 <button  class="login-button" id="btnlogin">${lang=='ru'?'Войти':lang=='en'?'Login':lang=='zh'?'登录':lang=='id'?'Gabung':''}</button>
            <button class="register-button" id="btnregister">${lang=='ru'?'Зарегистрироваться':lang=='en'?'Sign up':lang=='zh'?'报名':lang=='id'?'mendaftar':''}</button> 
           
          </form> 
    </output>`;
}
module.exports = { login }
