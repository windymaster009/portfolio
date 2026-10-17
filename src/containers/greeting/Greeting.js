import React, {useContext} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {illustration, greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  if (!greeting.displayGreeting) return null;

  const titleWords = greeting.title.split(" ");
  const highlightedName = titleWords.pop();
  const titleLead = titleWords.join(" ");

  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <p className="greeting-kicker">Full-stack · Fintech · Automation</p>
              <h1 className={isDark ? "dark-mode greeting-text" : "greeting-text"}>
                {titleLead} <span className="greeting-name">{highlightedName}</span>{" "}
                <span className="wave-emoji">{emoji("👋")}</span>
              </h1>
              <p className={isDark ? "dark-mode greeting-text-p" : "greeting-text-p subTitle"}>
                {greeting.subTitle}
              </p>
              <div className="greeting-specialties" aria-label="Specialties">
                <span>Fintech systems</span>
                <span>Full-stack apps</span>
                <span>Automation &amp; bots</span>
              </div>
              <div id="resume" className="empty-div"></div>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text="Contact me" href="#contact" />
                {greeting.resumeLink && (
                  <Button text="View my resume" href={greeting.resumeLink} newTab={true} />
                )}
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img alt="Developer illustration" src={require("../../assets/images/manOnTable.svg")} />
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
