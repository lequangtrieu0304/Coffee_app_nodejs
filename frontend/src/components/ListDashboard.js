const ListDashboard = {
    render: (props) => {
        return `
            <div class="side-bar">
                <ul class="category">
                    <li class="${props.selected === 'orders' ? 'selected' : ''}">
                        <a href="/#/">Orders</a>
                    </li>
                    <li class="${props.selected === 'products' ? 'selected' : ''}">
                        <a href="/#/">Products</a>
                    </li>
                </ul>
            </div>
        `
    }
}

export default ListDashboard;