import "../../blocks/infotooltip.css";

function InfoTooltip({ status }) {
  return (
    <div className={`tooltip ${status !== null ? "tooltip_opened" : ""}`}>
      <div className="tooltip__content">
        <div
          className={`tooltip__icon ${
            status ? "tooltip__icon_success" : "tooltip__icon_error"
          }`}
        />
        <p className="tooltip__message">
          {status === "success"
            ? "Vitoria! Você precisa se registrar;"
            : status === "error" ? "Ops, algo saiu deu errado! Por favor, tente novamente." : ""}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;

