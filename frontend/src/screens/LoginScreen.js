import { loginAccount } from "../apis/adminAPI";
import { getAdminInfo, setAdminInfo } from "../localStroge";
import { showMessage } from "../ultis";

const LoginScreen = {

    after_render: () => {
        document.getElementById('form-login').addEventListener('submit', async (e)=> {
            e.preventDefault();
            const login = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            }
            const data = await loginAccount(login);
            console.log(data);
            if(data.error){
                showMessage(data.error)
            }
            else {
                showMessage("Đăng nhập thành công");
                setAdminInfo(data);
                document.location.hash = '/admin';
            }
        })
    },

    render: () => {
        const admin = getAdminInfo();
        if(admin){
            document.location.hash = '/profile'
        }
        
        return `
            <div class="login">
                <form id="form-login">
                    <h3>Đăng Nhập</h3>
                    <div>
                        <label for="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="VD:quangtrieu01@gmail.com"/>
                    </div>
                    <div>
                        <label for="password">Mật khẩu</label>
                        <input type="password" id="password" name="password" placeholder=""/>
                    </div>
                    <button type="submit" id="login-button">Log In</button>
                </form>
            </div>
        `;
    }
}

export default LoginScreen;