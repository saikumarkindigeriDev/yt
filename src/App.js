import { Component } from "react"; 
import {Route, Routes, Router} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import LoginForm from "./Components/LoginForm";
import Register from "./Components/Register";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
 import GamingVideos from "./Components/GamingVideos";
  import TrendingVideos from "./Components/TrendingVideos";
  import SavedVideos from "./Components/SavedVideos";
  import ProtectedRoute from "./Components/ProtectedRoute";
  import VideoDetailsView from "./Components/VideoDetailsView";

import ThemeAndVideoContext from "./context/ThemeAndVideoContext";



class App extends Component{

  state={
    activeTab:'Home',
    savedVideos:[],
    isDarkTheme:false
  }

  toggleTheme=()=>{
    this.setState(prevState=>({isDarkTheme:!prevState.isDarkTheme}))
  }

changeTab=tab=>{
  this.setState({activeTab:tab})
}

addVideo=video=>{
  const {savedVideos}=this.state 

  const index=savedVideos.findIndex(eachVideo=>eachVideo.id===video) 
  if (index===-1){
    this.setState({savedVideos:[...savedVideos,video]})
  }else{
    savedVideos.splice(index,1) 
    this.setState({savedVideos})
  }
}
  render(){
    const {activeTab,savedVideos,isDarkTheme}=this.state
    return(  

      <ThemeAndVideoContext.Provider  value={{
        savedVideos,
        isDarkTheme,
        activeTab,
        toggleTheme: this.toggleTheme,
        addVideo: this.addVideo,
        changeTab: this.changeTab,
      }}>
<Router> 
<Routes> 
< Route exact path="/register" Component={Register} /> 
      <Route exact path="/login" Component={LoginForm} />  
      <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoDetailsView}
          />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={GamingVideos} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Navigate to="not-found" />
      </Routes>
</Router>
      </ThemeAndVideoContext.Provider>


    
    )
     

  }
 
}

export default App


