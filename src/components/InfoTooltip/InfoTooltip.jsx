import "../../blocks/infotooltip.css";

function InfoTooltip({ status, onClose }) {
  return (
    <div className={`tooltip ${status !== null ? "tooltip_opened" : ""}`}>
      <div className="tooltip__content">
          <button className="tooltip__close" onClick={onClose}></button>
    <div
          className={`tooltip__icon ${
            status === "success" ? "tooltip__icon_success" : "tooltip__icon_error"
          }`}
        />
        <p className="tooltip__message">
          {status === "success"
            ? "Vitoria! Você precisa se registrar;"
            : status === false ? "Ops, algo saiu deu errado! Por favor, tente novamente." : ""}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;

