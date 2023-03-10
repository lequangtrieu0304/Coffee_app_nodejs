import { uploadUser } from "../apis/uploadAPI";
import { logoutAccount, updateAccount } from "../apis/userAPI";
import ListDashboard from "../components/ListDashboard";
import { clearUserInfo, getUserInfo, setUserInfo } from "../localStroge";
import { rerender, showMessage } from "../ultis";

const ProfileScreen = {
    after_render: () => {
        document.getElementById('form-profile').addEventListener('submit', async (e) => {
            e.preventDefault();
            const update = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                image: document.getElementById('image').value,
                birthday: document.getElementById('birthday').value,
                sex: document.querySelector('input[name="sex"]:checked').value,
            }
            const data = await updateAccount(update);
            if(data.error){
                showMessage(data.error)
            }
            else {
                setUserInfo(data);
                rerender(ProfileScreen);
                showMessage(data.message);
            }
        })

        document.getElementById('image-file').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
            const data = await uploadUser(formData);
            if(data.error){
                showMessage(data.error)
            }
            else {
                document.getElementById('image').value = data.image;
            }
        })

        document.getElementById('logout').addEventListener('click', async () => {
            const data = await logoutAccount();
            if(data.error) {
                showMessage(data.error);
                clearUserInfo();
                document.location.hash = '/';
            }
            else {
                clearUserInfo();
                document.location.hash = '/';
            }
        });
    },

    render: () => {
        const { username, phone, birthday, image, address, email, sex, isAdmin } = getUserInfo();
        return `
        ${ isAdmin === true ? ListDashboard.render({selected: 'profile'}) : "" }
            <div class="profile">
                <form id="form-profile">
                    <div class="profile-details">
                        <h3>Trang c?? nh??n</h3>
                        <div>
                            <label for="username">T??n</label>
                            <input type="text" id="username" name="username" value="${username}"/>
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email" value="${email}"/>
                        </div>
                        <div>
                            <label for="phone">Phone</label>
                            <input type="text" id="phone" name="phone" value="${phone}"/>
                        </div>
                        <div>
                            <label for="birthday">Ng??y sinh</label>
                            <input type="text" id="birthday" name="birthday" value="${birthday}"/>
                        </div>
                        <div>
                            <label for="address">?????a ch???</label>
                            <input type="text" id="address" name="address" value="${address}"/>
                        </div>
                        <div class="_sex">
                            <div>
                                <input type="radio" name="sex" id="male" value="male" ${sex === 'male' ? 'checked' : ''}/>
                                <label for="male">Nam</label>
                            </div>
                            <div>
                                <input type="radio" name="sex" id="female" value="female" ${sex === 'female' ? 'checked' : ''}/>
                                <label for="female">N???</label>
                            </div>
                            <div>
                                <input type="radio" name="sex" id="diff" value="diff" ${sex === 'diff' ? 'checked' : ''}/>
                                <label for="diff">Kh??c</label>
                            </div>
                        </div>
                        <button type="submit">C???p nh???t</button>
                        <button type="button" id="logout">????ng xu???t</button>
                    </div>

                    <div class="profile-image">
                        <div class="_image">
                            <img src="${image}" alt="${username}" />
                        </div>
                        <div>
                            <label for="image">???nh ?????i di???n</label>
                            <input type="text" name="image" value="${image}" id="image" />
                            <input type="file" name="image-file" id="image-file" />
                        </div>
                    </div>
                </form>
            </div>
        `;
    }
}

export default ProfileScreen;