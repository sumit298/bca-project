import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  sidebar: '#f2f3f5',
  scrollbarPath: '#f2f2f2',
  channelList: '#747f8d',
  topSearchBar: '#e3e5e8',
  icons: '#4f5660',
  icons_hover: '#9facbf',
  messageSearchbar: '#ebedef',
  chatHover: '#d4d7dc',
  chatBackground: '#fff',
  text: '#181818',
  opacity: 0.9,
}

export const darkTheme = {
  sidebar: '#2f3136',
  scrollbarPath: '#2e3338',
  channelList: '#f9ffff',
  topSearchBar: '#202225',
  icons: '#b9bbbe',
  messageSearchbar: '#40444b',
  chatHover: '#393c43',
  icons_hover: '#d3d6db',
  chatBackground: '#36393f',
  text: '#f2f2f2',
  opacity: 1,
}

export const GlobalStyles = createGlobalStyle`
    body{
        background: ${({ theme }) => theme.chatBackground};
        color: ${({ theme }) => theme.text};
        height: 100vh;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        transition: all 0.50s linear;
        overflow: hidden;
        display: grid;
        /* grid-template-columns: (2fr, 3fr, 2fr); */
    }
    .app{
        transition: all 0.50s linear;

    }
    .chatheader{
        background-color: ${({ theme }) => theme.chatBackground};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;

       
    }
    .chatheader__searchbar-input{
            color:${({ theme }) => theme.text};
            background-color: ${({ theme }) => theme.topSearchBar};
            transition: all 0.50s linear;


    }
    .chatheader__items{
        color:${({ theme }) => theme.icons};
        transition: all 0.50s linear;

    }

    .metapanel{
        background-color: ${({ theme }) => theme.sidebar};
        color:  ${({ theme }) => theme.text};
        transition: all 0.50s linear;

    }

    .message{
        background-color: ${({ theme }) => theme.chatBackground};
        color: ${({ theme }) => theme.text};
        transition: all 0.5s linear;
        
        

        &:hover{
            background-color: ${({ theme }) => theme.chatHover};
            position: sticky;
            /* width: 60vw; */
            transition: all 0.2s linear;
        }
    }
    .messages{
        background-color: ${({ theme }) => theme.chatBackground};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;

    }

    .content{
        opacity: ${({ theme }) => theme.opacity};
        transition: all 0.50s linear;

    }
    
    .message__timestamp{
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;

    }

    .chatsearchbar{
        background-color: ${({ theme }) => theme.messageSearchbar};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
        input{
            background-color: ${({ theme }) => theme.messageSearchbar};
            color: ${({ theme }) => theme.text};
            transition: all 0.50s linear;
        }
    }

    .icon__button{
        color: ${({ theme }) => theme.icons};
        transition: all 0.50s linear;

        /* font-size: 30px; */
    }
    .icon__button:hover{
        color: ${({ theme }) => theme.icons_hover};
        
    }

    #menu{
        color: ${({ theme }) => theme.text};
        background-color: ${({ theme }) => theme.sidebar};
        transition: all 0.50s linear;
    }
    .menu-label{
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;

    }

    .menu-item{
        color: ${({ theme }) => theme.text};
        opacity: ${({ theme }) => theme.opacity};
        transition: all 0.50s linear;


        &:hover{
            background-color: ${({ theme }) => theme.chatHover};
        }
    }

    .menu-item-label{
        &:hover{
            background-color: ${({ theme }) => theme.chatHover};
            /* transition: all 0.50s linear; */

        }
    }

    

    

`
