
import { useState } from "react";
import "./StarRating.css"

function StarRating({change, stars}) {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || stars) ? "on" : "off"}
                        onClick={() => {change(index)}}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(stars)}
                    >
                        <i class="fa-sharp fa-solid fa-star"></i>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;