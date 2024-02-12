import {Navigate,useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import {
  LogoLink,
  NavbarHeader,
  HeaderLogo,
  ActionContainer,
  ThemeButton,
  LogoutIconButton,
  LogoutButton,
  ProfileImage,
  ModalContainer,
  CloseButton,
  ConfirmButton,
  ModalDesc,
  ButtonsContainer,
} from './styledComponents'





const Header = props => {

    const navigaate= useNavigate()

    const color = false ? '#ffffff' : '#00306e'
    const bgColor = false ? '#231f20' : '#f1f5f9'
    const onChangeTheme = () => {
        
      }

      const onClickIcon = () => {
       
      }
     
      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
      

        navigaate('/login') 
  /*<ThemeAndVideoContext.Consumer>
     

    {value => {
      const {isDarkTheme, toggleTheme, changeTab} = value
      
     
      const onChangeTheme = () => {
        toggleTheme()
      }

      const onClickIcon = () => {
        changeTab('Home')
      }
     
      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
       /* const navigaate= useNavigate()

        navigaate('/login') */
      

      return (
        <NavbarHeader >
          <LogoLink to="/">
            <HeaderLogo
              src={
                false
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
              onClick={onClickIcon}
            />
          </LogoLink>
          <ActionContainer>
            <ThemeButton
              type="button"
              data-testid="theme"
              onClick={onChangeTheme}
            >
              {false ? (
                <BsBrightnessHigh color="#ffffff" size={25} />
              ) : (
                <BsMoon size={25} />
              )}
            </ThemeButton>

            <ProfileImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <LogoutButton type="button" bgColor={bgColor} color={color}>
                  Logout
                </LogoutButton>
              }
            >
              {close => (
                <ModalContainer>
                  <ModalDesc> Are you sure, you want to logout</ModalDesc>
                  <ButtonsContainer>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </CloseButton>
                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </ButtonsContainer>
                </ModalContainer>
              )}
            </Popup>
            <Popup
              modal
              trigger={
                <LogoutIconButton type="button">
                  <FiLogOut size={25} color={color} />
                </LogoutIconButton>
              }
              className="popup-content"
            >
              {close => (
                <ModalContainer>
                  <ModalDesc>Are you sure, you want to layout?</ModalDesc>
                  <ButtonsContainer>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </CloseButton>
                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </ButtonsContainer>
                </ModalContainer>
              )}
            </Popup>
          </ActionContainer>
        </NavbarHeader>
      )
  /*  }}
  </ThemeAndVideoContext.Consumer> */
}
}



export default Header