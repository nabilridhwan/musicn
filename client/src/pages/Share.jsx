import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Jumbotron from "../components/Jumbotron";
import NavigationBar from "../components/NavigationBar";
import SearchBar from "../components/SearchBar";
import StepOne from "../components/Share/StepOne";
import StepTwo from "../components/Share/StepTwo";
import StepWrapper from "../components/Share/StepWrapper";

export default function Share() {

    const [selectValue, setSelectValue] = useState("long_term");
    const [currentStep, setCurrentStep] = useState(0);

    const handleChangeValue = (e) => {
        setSelectValue(e.target.value)
    }

    return (
        <Container>

            <NavigationBar />

            <AnimatePresence
                exitBeforeEnter
            >
                <StepWrapper>
                    {currentStep == 0 && (
                        <StepOne onChangeValue={handleChangeValue} selectValue={selectValue} onClickButton={() => setCurrentStep(1)} />
                    )}

                    {currentStep == 1 && (
                        <StepTwo term={selectValue} username={"dinie"} />
                    )}
                </StepWrapper>
            </AnimatePresence>

            {/* <Footer /> */}
        </Container >
    )
}