import { createGlobalStyle } from 'styled-components'
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: "Segoe UI",Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    /* height: 100vh; */
  }

.metapanel {
  // width: 100%;
  background-color: ${({ theme }) => theme.metaPanelColor};
  // color: #fff;
  // position: absolute;

  margin-top: 100px;
}

.metalist {
  display: flex;
  align-items: center;
  justify-content: center;
}

.metalist__content {
  margin-top: auto;
  color: #0d1016;
}

.meta__createdBy {
  display: flex;
  align-items: flex-start;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  img {
    border-radius: 50%;
    margin-bottom: -1.5rem;
  }
}

.metalist {
  display: flex;
  align-items: center;
  justify-content: center;
}

.metalist__content {
  margin-top: auto;
}

.meta__createdBy {
  display: flex;
  align-items: flex-start;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  img {
    border-radius: 50%;
    margin-bottom: -1.5rem;
  }
}


/* Chat  */
.chat__main {
  width: 100%;
  height: 100%;
}
.chatheader {
  height: 10vh;
  width: 100%;

  display: flex;
  align-items: center;
  // color: #fff;
  // background-color: #2c2f33;
  border-bottom: 1px solid #23272a;
  border-right: 1px solid #23272a;
  padding-right: 1rem;
  &__topic {
    display: flex;
    margin-right: auto;
    margin-left: 20px;
    font-size: 1.6rem;
    align-items: center;

    &-content {
      margin-left: 1.2rem;
    }
    &-hash {
      color: gray;
      margin-left: 1.5rem;
      font-size: 2.85rem;
    }
  }
  &__items {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #babbbd;
    &-left,
    &-right {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        margin: 0 0.7rem;
      }
    }
  }
  &__searchbar {
    margin: 0 0.5rem;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: flex-end;

    &-searchicon {
      position: absolute;
      top: 18%;
      right: 3%;
      color: #72767d;
      svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
    &-input {
      color: #fff;
      padding: 0.52rem;
      border-radius: 4px;
      background-color: #202225;
      border: 0;
      outline: none;
      font-family: 'Quicksand', 'Segoe UI';
      width: 80%;
      transition: width 0.3s;
      &::placeholder {
        padding-left: 0.25rem;
      }
      &:focus {
        width: 100%;
      }
    }
  }
}

/* Message */
.message {
  display: flex;
  align-items: center;
  padding: 17px 20px;
  // color: white;
  // background-color: #35383d;
}

.message__info {
  margin-left: 20px;
  margin-top: 5px;
}

.message__info > h4 {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-family: 'Segoe UI';
}

.message__timestamp {
  // color: rgba(128, 128, 128, 0.452);
  // color: antiquewhite;
  opacity: 0.452;
  margin-left: 15px;
  font-size: small;
}

.message__info > img {
  margin-top: 10px;
  border-radius: 10px;
  width: 100%;
}

.content {
  font-size: 1.1rem;
  opacity: 0.8;
  font-family: 'Quicksand', serif;
  margin-top: -10px;
}


/* Messages Component */
.messages {
  height: 82vh;
  overflow-y: scroll;
  font-size: 1.1rem;
  // color: #e6e6e6;
  // background-color: #35383d;
  /* background-color: #0C0D0F !important; */
}

/* messages form */

.message__form {
  position: fixed;
  bottom: 1em;
  margin-left: 300px;
  left: 0;
  /* width: 80%; */
  /* right: 1em; */
  z-index: 200;
  /* height: 8vh; */
  // background-color: #35383d;
}

/* message component */

.message__self {
  margin-left: 10px;
  border-left: 1px solid orange;
  padding-left: 5px;
}

/* progress bar styles */

.progress__bar {
  margin: 0.3em 0 0 0 !important;
}

.user__typing {
  font-style: italic;
  font-weight: bold;
  margin-right: 3px;
}

.typing {
  width: 5em;
  height: 2em;
  position: relative;
  padding: 10px;
  margin-left: 5px;
  background-color: #e6e6e6;
  border-radius: 20px;
}

.typing__dot {
  float: left;
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: #8d8c91;
  border-radius: 50px;
  opacity: 0;
  animation: loadingFade 1s infinite;
}

.typing__dot:nth-child(1) {
  animation-delay: 0s;
}

.typing__dot:nth-child(1) {
  animation-delay: 0.2s;
}

.typing__dot:nth-child(1) {
  animation-delay: 0.4s;
}

@keyframes loadingFade {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 50%;
  }
  100% {
    opacity: 0;
  }
}

/* emoji picker styles */

.skeleton {
  position: relative;
  overflow: hidden;
  height: 40px;
  margin-bottom: 10px;
}

.skeleton:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  animation: sweep 2s infinite;
  background-image: linear-gradient(
    to left,
    transparent,
    rgba(255, 255, 255, 0.4) transparent
  );
}

@keyframes sweep {
  0% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(150%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.skeleton__avatar {
  height: 35px;
  width: 35px;
  border-radius: 3px;
  background-color: rgba(58, 57, 57, 0.3);
}

.skeleton__author {
  background-color: rgba(58, 57, 57, 0.3);
  width: 120px;
  height: 10px;
  border-radius: 3px;
  position: absolute;
  bottom: 30px;
  left: 40px;
  right: 0;
}

.skeleton__details {
  background-color: rgba(58, 57, 57, 0.3);
  height: 20px;
  border-radius: 3px;
  position: absolute;
  bottom: 3px;
  right: 20px;
  left: 40px;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #161b22;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #0d1016;
  border-radius: 20px;
  border: 3px solid #161b22;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(8, 8, 15);
}

/* Other useful stuff */
.chatsearchbar {
  background-color: #2c2f33;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  input {
    width: 100vh;

    color: white;
    border: none;
    background-color: #2c2f33;
    padding: 10px 0;
    margin-left: 15px;
    outline: none;
    font-size: 1.2rem;
    font-weight: lighter;
    text-align: left;
  }
}



svg {
  cursor: pointer;
}

.emojipicker {
  font-size: 20px;
}

// MetaPanel


// Sidebar

.sidebar__Sidepanel {
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #2f3135 !important;
  width: 19vw !important;
}

.chat {
  flex: 0.75;
  /* background-color: #35383d; */
  display: flex;
  position: relative;
  flex-direction: column;
}

  `
