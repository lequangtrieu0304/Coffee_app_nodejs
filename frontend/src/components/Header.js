import { getAdminInfo } from "../localStroge";

const Header = {
    render: () => {
        const admin = getAdminInfo();
       return `
            <div id="header">
                <div class="header-content">
                    <a href="/#/">Coffee</a>
                </div>
                <div class="header-detail">
                    <a href="/#/cart"><i class="fa-solid fa-bag-shopping"></i></a>
                    ${
                        admin 
                            ?`<a href="/#/profile">Admin</a>` 
                            :`<a href="/#/login">Admin</a>`
                    }
                    
                </div>
            </div>
       `;
    }
}

export default Header;