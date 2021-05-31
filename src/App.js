import React, { useEffect } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import UserController from './components/UserController'
import LoadDataFromDBContainer from './containers/LoadDataFromDBContainer'

function App({ user, userRefresh }) {
  useEffect(() => {
    userRefresh()
  }, [userRefresh])

  if (user.status === 'unregistered') {
    return (
      <div className='App'>
        <UserController user={user} />
      </div>
    )
  }
  else if (user.status !== 'unknown') {
    document.title = 'Diet planner'
    return (
      <div className='App'>
        <LoadDataFromDBContainer />
      </div>
    )
  }
  else {
    return (<div className='App'>

    </div>)
  }
}

export default App