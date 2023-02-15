import { getAdminInfo } from "../localStroge";
import { parseRequestUrl } from "../ultis";

const Header = {
    after_render: () => {},

    render: () => {
        const admin = getAdminInfo();
        const { value } = parseRequestUrl();
        return `
                <div id="header">
                    <div class="header-content">
                        <a href="/#/">Coffee</a>
                    </div>
                    <div>
                        <ul class="category-header">
                            <li>
                                <a href="/#/?q=coffee" class="${value ==='coffee' ? 'a-selected' : ''}">COFFEE</a>
                            </li>
                            <li>
                                <a href="/#/?q=tra" class="${value ==='tra' ? 'a-selected' : ''}">TRÀ</a>
                            </li>
                            <li>
                                <a href="/#/?q=freeze" class="${value ==='freeze' ? 'a-selected' : ''}">FREEZE</a>
                            </li>
                            <li>
                                <a href="/#/?q=banh" class="${value ==='banh' ? 'a-selected' : ''}">BÁNH</a>
                            </li>
                        </ul>
                    </div>
                    <div class="header-detail">
                        ${
                            admin 
                                ?
                                `<i class="fa-solid fa-user-secret"></i>
                                <a href="/#/admin">Admin</a>` 
                                :
                                `<a href="/#/cart"><i class="fa-solid fa-bag-shopping"></i></a>
                                <a href="/#/login">Admin</a>`
                        }  
                    </div>
                </div>
        `;
    }
}

export default Header;