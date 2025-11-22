import Header from '@/components/derivedcomponents/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderSidebar from './../components/derivedcomponents/HeaderSidebar';
import Container from '@/components/derivedcomponents/Container';

const BaseLayout = () => {
  return (
    <>
      <Container>
        <HeaderSidebar />
        <Outlet />
      </Container>
    </>
  );
};

export default BaseLayout;
