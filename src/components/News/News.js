import React, { Component } from "react";
import NewsService from "../../service/NewsService";
import loading from "./../../assets/images/loading.gif"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalResults: "",
    };
  }

  componentDidMount() {
    NewsService.getNews().then((res) => {
      this.setState({ 
        articles: res.data.articles,
        totalResults: res.data.totalResults,
      });
      console.log({ totalResults: res.data.totalResults });
      console.log(res.data.articles);
    });
  }

  render() {
    const { totalResults } = this.state;
    if (this.state.articles.length === 0) {
      return (
        <section className="container">
          <div className="row">
            <div className="col-lg-8">
            <img src={loading} width="200" alt="..."/>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>ข่าวสารทั้งหมด {totalResults} ข่าว</h2>
              {this.state.articles.map((n, index) => (
                <div key={index} className="card mb-3">
                  <img src={n.urlToImage} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{n.title}</h5>
                    <p className="card-text">{n.description}</p>
                    <p className="card-text">
                      <small className="text-muted float-left">
                        {n.source.name}
                      </small>
                    </p>
                    <p className="card-text float-md-right">
                      <small className="text-muted">{n.publishedAt}</small>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
  }
}
export default News;
