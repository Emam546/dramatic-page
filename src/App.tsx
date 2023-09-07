import { useEffect, useRef, useState } from "react";
import "./App.css";
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
    randomString = (length: number) =>
        Array.from(Array(length)).map(randomChar).join("");
function useString(): [
    string,
    React.RefObject<HTMLDivElement>,
    React.RefObject<HTMLDivElement>
] {
    const cardRef = useRef<HTMLDivElement>(null);
    const lettersDiv = useRef<HTMLDivElement>(null);
    const [str, setStr] = useState(randomString(1500));
    useEffect(() => {
        const card = cardRef.current;
        const letters = lettersDiv.current;
        if (!card || !letters) return;

        const handleOnMove = (e: { clientX: number; clientY: number }) => {
            if (!card || !letters) return;
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            letters.style.setProperty("--x", `${x}px`);
            letters.style.setProperty("--y", `${y}px`);
            setStr(randomString(Math.floor((rect.width * rect.height) / 16)));
        };
        card.addEventListener("mousemove", handleOnMove);
        card.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
        return () => {
            card.removeEventListener("mousemove", handleOnMove);
        };
    }, [cardRef, lettersDiv]);
    return [str, cardRef, lettersDiv];
}
function App() {
    const [str, cardRef, lettersDiv] = useString();
    return (
        <div
            ref={cardRef}
            className="card"
        >
            <div className="card-image">
                <img src="https://assets.codepen.io/1468070/Hyperplexed+Logo+-+Color+5.svg" />
            </div>
            <div className="card-gradient" />
            <div
                className="card-letters"
                ref={lettersDiv}
            >
                {str}
            </div>
        </div>
    );
}

export default App;
