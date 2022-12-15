// Importing Modules
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isRunning: false, minutes: 25, seconds: 0}

  componentDidMount() {
    this.timerId = setInterval(this.decrementSeconds, 1000)
  }

  componentWillUnmount() {
    if (this.timerId !== null) {
      clearInterval(this.timerId)
    }
  }

  onToggleActionBtn = () => {
    const {isRunning} = this.state
    console.log(isRunning)
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  decrementTime = () => {
    const {minutes, isRunning} = this.state
    if (!isRunning) {
      const updatedTime = minutes <= 25 ? 25 : minutes - 1
      this.setState({minutes: updatedTime, seconds: 0})
    }
  }

  incrementTime = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({minutes: prevState.minutes + 1, seconds: 0}))
    }
  }

  onReset = () => {
    this.setState({minutes: 25, seconds: 0, isRunning: false})
  }

  decrementSeconds = () => {
    const {isRunning} = this.state
    if (isRunning) {
      const {minutes, seconds} = this.state
      let newSeconds
      let newMinutes

      if (minutes === 0 && seconds === 0) {
        clearInterval(this.timerId)
      }
      if (seconds === 0) {
        newSeconds = 59
        newMinutes = minutes - 1
      } else {
        newSeconds = seconds - 1
        newMinutes = minutes
      }
      this.setState({minutes: newMinutes, seconds: newSeconds})
    }
  }

  render() {
    const {isRunning, minutes, seconds} = this.state

    const timerStatus = isRunning ? 'Running' : 'Paused'

    const newSeconds = seconds < 10 ? `0${seconds}` : seconds
    const newMinutes = minutes < 10 ? `0${minutes}` : minutes

    const timeDisplayed = `${newMinutes}:${newSeconds}`
    const actionName = isRunning ? 'Pause' : 'Start'
    const actionImage = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const actionAltText = isRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <div className="timer-container">
          <h1>Digital Timer</h1>
          <div className="timer-section">
            <div className="timer-left-section">
              <div className="time-container">
                <h1 className="time-left">{timeDisplayed}</h1>
                <p className="timer-status">{timerStatus}</p>
              </div>
            </div>
            <div className="timer-right-section">
              <div className="action-buttons-container">
                <div className="action-btn">
                  <button
                    type="button"
                    onClick={this.onToggleActionBtn}
                    className="action-btn"
                  >
                    <img src={actionImage} alt={actionAltText} />
                    <p className="action-name">{actionName}</p>
                  </button>
                  <button
                    type="button"
                    onClick={this.onReset}
                    className="action-btn"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                    />
                    <p className="action-name">Reset</p>
                  </button>
                </div>
              </div>
              <div>
                <p className="timer-limit-text">Set Timer Limit</p>
                <div className="timer-inc-dec">
                  <button
                    type="button"
                    onClick={this.decrementTime}
                    className="inc-dec-btn"
                  >
                    -
                  </button>
                  <p type="button" className="btn-div">
                    {minutes}
                  </p>
                  <button
                    type="button"
                    onClick={this.incrementTime}
                    className="inc-dec-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
