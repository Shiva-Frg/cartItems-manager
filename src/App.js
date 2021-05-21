import React from 'react'
import Shopping from './Container/Shopping'
import Layout from './Components/Layout/Layout'

class App extends React.Component {
    render() {
        return(
            <Layout>
                <Shopping />
            </Layout>
        )
    }
}

export default App