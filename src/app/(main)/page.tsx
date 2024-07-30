import Background from "@/components/Background";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header, { HeaderTop } from "@/components/Header";
import JobItemContent from "@/components/JobItemContent";
import JobListSearch from "@/components/JobListSearch";
import Logo from "@/components/Logo";
import PaginationControls from "@/components/PaginationControls";
import ResultCount from "@/components/ResultCount";
import SearchForm from "@/components/SearchForm";
import Sidebar, { SidebarTop } from "@/components/Sidebar";
import SortingControls from "@/components/SortingControls";
import React from "react";

const page = () => {
  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
        </HeaderTop>

        <SearchForm />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultCount />
            <SortingControls />
          </SidebarTop>
          <JobListSearch />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
};

export default page;
