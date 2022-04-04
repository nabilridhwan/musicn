import Jumbotron from "../Jumbotron";
import { FaArrowRight } from "react-icons/fa";

export default function StepOne({onChangeValue, selectValue, onClickButton}) {
    return (
        <Jumbotron>
            <p className="my-4 muted text-lg leading-relaxed">
                Okay, one question
            </p>

            <h1 className="my-10">
                Do you want your top songs from all time, biyearly or monthly?
            </h1>

            <select value={selectValue} onChange={onChangeValue}>
                <option value="long_term">
                    All Time
                </option>

                <option value="medium_term">
                    Biyearly
                </option>

                <option value="short_term">
                    Monthly
                </option>
            </select>

            <button onClick={onClickButton} className="flex justify-center items-center mt-10 w-fit m-auto btn p-4 shadow-lg shadow-brand-color/50">
                Next

                <FaArrowRight className="ml-5" />
            </button>
        </Jumbotron>
    )
}