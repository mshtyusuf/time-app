import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

class App extends React.Component {
  state = {
    startDate: null,
    timeEnd: null,
    diffDuration: null,
    historique: null
  };

  handleChangetimeS = event => {
    this.setState({ startDate: event.target.value });
  };

  handleChangetimeE = event => {
    this.setState({ timeEnd: event.target.value });
  };

  handleSubmit = event => {
    var startDate = new Date(this.state.startDate);
    var endDate = new Date(this.state.timeEnd);
    this.state.diffDuration = (endDate - startDate) / 86400000;
    this.setState({ diffDuration: this.state.diffDuration });

    this.state.historique =
      "<tr><td> " +
      this.state.diffDuration +
      " jours de " +
      this.state.startDate +
      " &agrave; " +
      this.state.timeEnd +
      "</td> </tr>" +
      this.state.historique;
  };

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
                    class="form-control"
                    id="datepicker"
                    onChange={this.handleChangetimeS}
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
                    onChange={this.handleChangetimeE}
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
              <thead>
                <tr>
                  <th />
                </tr>
              </thead>
              <tbody
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
