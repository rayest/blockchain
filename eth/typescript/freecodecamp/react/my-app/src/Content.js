import { useState } from "react";

const Content = () => {

    const [name, setName] = useState('Raymond Li'); // name is the state variable, setName is the function to update the state variable, useState('Raymond Li') is the initial value of the state variable

    const [count, setCount] = useState(0);


    const handleNameChange = () => {
        const names = ['Rayest', 'Ray', 'Raymond', 'Raymond Li'];
        const int = Math.floor(Math.random() * names.length);
        setName(names[int]);
    }

    // 
    const handleClick = () => {
        console.log('button clicked');
    }

    const handleCount = () => {
        setCount(count + 1);
        console.log(count);
    }

    return (
        <main>
            <p onDoubleClick={handleClick}>Hello  {name}!</p>
            <button onClick={handleNameChange}>Change Name</button>

            <button onClick={handleCount}>Count Me</button>

            <button onClick={handleClick}>Click It</button>
        </main>
    )
}

export default Content;