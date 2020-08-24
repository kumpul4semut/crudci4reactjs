import React, { Component } from "react";
import ReactDOM from "react-dom";
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: "",
      listquotes: [],
      isEdit: false,
      dataEdit: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeEdit = this.onChangeEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  onChange(event) {
    this.setState({ quotes: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    return this.grep(
      "http://localhost:8080/quotes/create",
      "post",
      `quote=${this.state.quotes}`
    )
      .then((result) => {
        result.status = 200 ? this.componentDidMount() : console.warn(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.grep("http://localhost:8080/quotes", "get", null)
      .then((result) => {
        this.setState({
          listquotes: result,
        });
      })
      .catch((err) => console.error(err));
  }

  edit(id) {
    this.grep(`http://localhost:8080/quotes/${id}/edit`, "get", null)
      .then((result) => this.setState({ isEdit: true, dataEdit: result.data }))
      .catch((err) => console.error(err));
  }

  onChangeEdit(event) {
    let newDataEdit = { ...this.state.dataEdit, quotes: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }

  update(event) {
    event.preventDefault();
    this.grep(
      `http://localhost:8080/quotes/${this.state.dataEdit.quote_id}`,
      "put",
      `quotes=${this.state.dataEdit.quotes}`
    )
      .then((result) => {
        this.componentDidMount();
      })
      .catch((err) => console.error(err));
  }

  delete(id) {
    this.grep(`http://localhost:8080/quotes/${id}`, "delete", null)
      .then((result) => this.componentDidMount())
      .catch((err) => console.error(err));
  }

  grep(url, method, body) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      })
        .then((respon) => respon.json())
        .then((ra) => {
          resolve(ra);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  render() {
    return (
      <div class="container">
        <div class="row mt-3">
          <div class="col">
            <div class="d-flex justify-content-center">
              {this.state.isEdit ? (
                <form onSubmit={this.update}>
                  <label>
                    <input
                      type="text"
                      class="form-controll"
                      value={this.state.dataEdit.quotes}
                      onChange={() => {
                        this.onChangeEdit(event);
                      }}
                    />
                  </label>
                  <input
                    type="submit"
                    value="Edit"
                    class="btn btn-warning btn-sm"
                  />
                  <input
                    type="submit"
                    value="close"
                    class="btn btn-danger btn-sm"
                    onClick={() =>
                      this.setState({ isEdit: false, dataEdit: "" })
                    }
                  />
                </form>
              ) : (
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <input
                      type="text"
                      class="form-controll"
                      value={this.state.quotes}
                      onChange={this.onChange}
                    />
                  </label>
                  <input
                    type="submit"
                    value="Add"
                    class="btn btn-primary btn-sm"
                  />
                </form>
              )}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Quotes</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listquotes.map((item) => {
                  return (
                    <tr>
                      <td>{item.quotes}</td>
                      <td>
                        <a
                          href="#"
                          class="badge badge-primary mr-3"
                          onClick={() => {
                            this.edit(item.quote_id);
                          }}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          class="badge badge-danger"
                          onClick={() => {
                            this.delete(item.quote_id);
                          }}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
let container = document.getElementById("app");
let component = <Root />;
ReactDOM.render(component, container);
