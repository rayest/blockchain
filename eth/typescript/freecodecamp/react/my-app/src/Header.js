const Header = () => {

    const headerStyle = {
        backgroundColor: 'lightblue',
        padding: '10px',
        marginBottom: '10px',
        color: 'white',
    }

    return (
        <header style={headerStyle}>
            <h1>Groceries List</h1>
        </header>
    )
}

export default Header;