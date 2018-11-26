import React, { Component } from "react";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    toDoList: [],
    description: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/create", {
        description: this.state.description
      })
      .then(response => {
        axios
          .get("http://localhost:3000")
          .then(response => {
            this.setState({ toDoList: response.data, description: "" });
            console.log(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  removeTask = i => {
    let detectingRemove = [...this.state.toDoList];

    axios
      .post("http://localhost:3000/delete", {
        description: this.state.toDoList[i].description
      })
      .then(response => {
        detectingRemove.splice(i, 1);
        this.setState({ toDoList: detectingRemove });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateTask = i => {
    axios
      .post("http://localhost:3000/update", {
        description: this.state.toDoList[i].description
      })
      .then(response => {
        axios
          .get("http://localhost:3000")
          .then(response => {
            this.setState({ toDoList: response.data });
            // console.log(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  render() {
    const listing = [];
    for (let i = 0; i < this.state.toDoList.length; i++) {
      listing.push(
        <div key={i}>
          <span
            onClick={() => {
              this.removeTask(i);
            }}
          >
            X
          </span>
          <div
            className={this.state.toDoList[i].status ? "done" : null}
            onClick={() => {
              this.updateTask(i);
            }}
          >
            {this.state.toDoList[i].description}
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>To-Do list</h1>
        <div>{listing}</div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <button type="submit">AJOUTER UNE TÂCHE</button>
        </form>
      </div>
    );
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000")
      .then(response => {
        this.setState({ toDoList: response.data });
        // console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default App;
