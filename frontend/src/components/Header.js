const Header = {
    render: () => {
       return `
            <div id="header">
                <div class="header-content">
                    <a href="/#/">Coffee</a>
                </div>
                <div class="header-detail">
                    <a href="/#/cart"><i class="fa-solid fa-bag-shopping"></i></a>
                    <a href="/#/dashboard">Admin</a>
                </div>
            </div>
       `;
    }
}

export default Header;