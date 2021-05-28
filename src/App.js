import React, { useEffect } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import UserController from './components/UserController'

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
  // else if (user.status !== 'unknown') {
  //   return (
  //     <div className='App'>
  //       <LoadDataFromDBGateContainer />
  //     </div>
  //   )
  // }
  else {
    return (<div className='App'></div>)
  }
}

export default App