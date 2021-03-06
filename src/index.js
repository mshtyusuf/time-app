import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

// L'app class contient le calculateur du difference entre deux Date (comme inputs), en plus il affiche un historique
class App extends React.Component {
  state = {
    startDate: "",
    endDate: "",
    diffDuration: "",
    historique: "",
    dateControl: "",
    historiquecontrol: {
      oldStartDate: "",
      oldEndDate: ""
    }
  };

  constructor(props) {
    super(props);
    //this.state.dateControl = document.querySelector('input[type="date"]');
    this.state.dateControl = new Date().getDate();
  }

  // handler qui affect la valeur saisie du date debut au variable d'etat state.startDate
  handleChangetimeS = event => {
    this.setState({ startDate: event.target.value });
  };

  // handler qui affect la valeur saisie du date fin au variable d'etat state.endDate
  handleChangetimeE = event => {
    this.setState({ endDate: event.target.value });
  };
  //note : On peut combiner les deux handlechange en une seule fonction qui traite les setState selon le nom d'event

  //handler pour le button; calcule la difference et l'ajoute a l'historique
  handleSubmit = event => {
    // les dates entrees
    var startDate = new Date(this.state.startDate);
    var endDate = new Date(this.state.endDate);

    // condition sur la difference, pas de difference negative
    if (endDate - startDate < 0)
      alert("la date fin n'est pas valide, verifier vous inputs.");
    else {
      // affecte la difference au variable d'etat a afficher (setState() bind la valeur mais n'est pas instantané, je cherche encore pourquoi.)
      this.state.diffDuration = (endDate - startDate) / 86400000;
      this.setState({ diffDuration: this.state.diffDuration });

      // conditions sur les dates pour l'ergonomie de l'affichage de l'historique
      if (
        this.state.startDate != "" &&
        this.state.endDate != "" &&
        this.state.historiquecontrol != this.state.diffDuration
      ) {
        this.state.historique =
          "<tr> <td>" +
          this.state.diffDuration +
          " jours de " +
          this.state.startDate +
          " &agrave; " +
          this.state.endDate +
          " </td></tr>" +
          this.state.historique;

        // historiquecontrol contienne la valeur du difference anterieur,
        // nous servir a ne pas spammer l'affichage de l'historique (cliques successifs sur le button)
        this.setState({ historiquecontrol: this.state.diffDuration });
      }
    }
  };

  // JSX (utilisant du bootstrap)
  render() {
    console.log("Diff : ", this.state.diffDuration);
    return (
      <div class="container">
        <div class="row">
          <div class="col-lg-4 form">
            <div class="row">
              <div class="col-lg-6">
                <label>
                  Date debut :
                  <input
                    type="date"
                    placeholder={new Date().getDate()}
                    class="form-control"
                    id="datepicker"
                    default={this.state.dateControl.value}
                    onChange={this.handleChangetimeS}
                    required
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  />
                </label>
              </div>
              <div class="col-lg-6">
                <label>
                  Date fin :
                  <input
                    type="date"
                    class="form-control"
                    id="datepicker"
                    min={this.state.startDate}
                    onChange={this.handleChangetimeE}
                    required
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  />
                </label>
              </div>
            </div>
            <div class="row" />
            <div class="row">
              <div class="col-lg-2" />
              <div class="col-lg-3 form">
                <button
                  onClick={this.handleSubmit}
                  class="btn btn-primary btn-sm"
                >
                  Calculer
                </button>
              </div>
              <div class="col-lg-7 form">{this.state.diffDuration} jours</div>
            </div>
            <div class="row" />
          </div>
          <div class="col-xs-offset-1 col-lg-5 table-wrapper-scroll-y  form">
            <p>Historique :</p>
            <table class="table table-striped">
              <thead />
              <tbody
                // n'est pas dangereux puisque l'input est controler (que des dates), mais ca peut construire une faille de sécurité
                // A utiliser du Backend Dev
                dangerouslySetInnerHTML={{ __html: this.state.historique }}
              />
            </table>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
