const Footer = () => {

    const today = new Date();


    return (
        <footer>
            <p>Coptright &copy; {today.getFullYear()}</p>
        </footer>
    )
}

export default Footer;