import styled from "styled-components";

const FooterEl = styled.footer`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0.5em;
  text-align: right;
  font-size: 0.9em;
  color: var(--form-color);
  z-index: 3;

  p {
      margin: 0;
  }

  a {
    text-decoration: none;
    color: var(--form-color);
    font-size: 1.4em;
    font-weight: bold;
  }

    @media screen and (max-width: 1100px) {
        text-align: center;
        top: 5em;
        bottom: unset;
        height: auto;
        left: 50%;
        transform: translateX(-50%);
    }
`;

function Footer(props) {
    return(
    <FooterEl>
        <p>Created by: <br /> <a href="https://github.com/RafalKornel"> <i class="fab fa-github-square"></i> Rafał Kornel </a> </p>
    </FooterEl>
    )
}

export default Footer;