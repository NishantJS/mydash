import backgroundImage from "../assets/images/container_background.png";
import "../styles/app.scss";
import Form from "./Form";

const App = () => {
  return (
    <section className="container">
      <div className="container__image">
        <img src={backgroundImage} alt="Background Img" loading="lazy" />
        <h1 className="container__image__title">Choose a date range</h1>
        <p className="container__image__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, provident quis
        </p>
      </div>
      <div className="container__form">
        <h1 className="container__form__title">Create an account</h1>
        <Form />
      </div>
    </section>
  );
};

export default App;
