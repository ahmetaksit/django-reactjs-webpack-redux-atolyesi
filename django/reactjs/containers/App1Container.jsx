import React from "react"
import Radium from "radium"

import { connect } from "react-redux"

import * as counterActions from "../actions/counterActions"
import * as githubActions from "../actions/githubActions"
import Headline from "../components/Headline"
import GithubRepos from "../components/GithubRepos"

const styles = {
  button: {
    cursor: "pointer",
  },
  counter: {
    color: "blue",
    fontSize: "20px",
  }
}

@connect(state => ({
  counters: state.counters,
  github: state.github,
}))
@Radium
export default class App1Container extends React.Component {
  componentDidMount() {
    let {dispatch, github} = this.props
    if (!github.isLoadingRepos && github.repos === undefined) {
      dispatch(githubActions.fetchRepos())
    }
  }

  handleClick() {
    let {dispatch} = this.props;
    dispatch(counterActions.increaseCounter())
  }

  renderLoading() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            Yükleniyor...
          </div>
        </div>
      </div>
    )
  }

  render() {
    let {counters, github} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Ahmet AKŞİT tarafından stage olarak değiştirildi.!</Headline>
            <div styles={[styles.button]} onClick={() => this.handleClick()}>INCREASE</div>
            <p styles={[styles.counter]}>{counters.clicks}</p>
            <p>{process.env.BASE_API_URL}</p>
            {github.repos !== undefined &&
              <GithubRepos repos={github.repos} />
            }
          </div>
        </div>
      </div>
    )
  }
}
