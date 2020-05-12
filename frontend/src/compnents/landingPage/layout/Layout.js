import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .layout-main{
        margin: 0 auto;
        overflow-y: scroll;
        max-height: 585px;
    }
`;
export const Layout = (props) => (
  <Styles>
    <div className="layout-main">
      <Container>
        {props.children}
      </Container>
    </div>
  </Styles>
)
