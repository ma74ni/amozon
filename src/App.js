import React from "react";
import "./App.css";

import Menu from "./Menu";
import List from "./List";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          id: 0,
          rating: 4,
          title: "Harry Potter y el cáliz de fuego",
          image: "libro01.jpg",
        },
        { id: 1, rating: 3, title: "The shining", image: "libro02.jpg" },
        { id: 2, rating: 5, title: "Código Da Vinci", image: "libro03.jpg" },
        { id: 3, rating: 5, title: "El principito", image: "libro04.jpg" },
        { id: 4, rating: 5, title: "Sobrenatural", image: "libro05.jpg" },
      ],
      copyBooks: [],
    };
  }

  componentDidMount() {
    //Creamos una copia del listado de libros original
    this.initBooks();
  }

  //función que copia el listado de libros original
  initBooks = () => {
    this.setState((state, props) => ({
      copyBooks: [...state.books],
    }));
  };

  onAdd = (item) => {
    let temp = [...this.state.books];

    /*
    obtenemos la longitud del arreglo y obtenemos el último id
    a ese id le aumentamos 1
    */
    let id = temp[temp.length - 1].id + 1;

    //le asigno el nuevo id
    item["id"] = id;
    //insertamos los datos en el arreglo temp
    temp.push(item);
    //insertamos en books el arreglo temp
    this.setState({ books: [...temp] });
    this.initBooks();
  };
  onSearch = (query) => {
    if (query === "") {
      this.initBooks();
    } else {
      const temp = [...this.state.books];
      let res = [];

      temp.forEach((item) => {
        if (item.title.toLowerCase().indexOf(query) > -1) {
          res.push(item);
        }
      });
      this.setState({ copyBooks: [...res] });
    }
  };
  onUpdateRating = (item) => {
    var temp = [...this.state.books];
    const index = temp.findIndex((x) => x.id === item.id);

    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({ books: [...temp] });
    this.initBooks();
  };
  onRemove = (id) => {
    var temp = [...this.state.books];
    const res = temp.filter((item) => item.id !== id);

    this.setState({ books: [...res] });
    this.initBooks();
  };
  render() {
    return (
      <div className="app">
        <Menu title="Amozon" onAdd={this.onAdd} onSearch={this.onSearch} />
        <List
          items={this.state.copyBooks}
          onUpdateRating={this.onUpdateRating}
          onRemove={this.onRemove}
        />
      </div>
    );
  }
}

export default App;
