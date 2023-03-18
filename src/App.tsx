import React from 'react';
import logo from './logo.svg';
import './App.css';
import CoursesList from './components/coursesList/coursesList';
import { Container } from './app.styled';
import { Outlet, Route, Routes } from "react-router-dom";
import SingleCourse from './components/singleCourse/singleCourse';

function App() {
  return (
        <Container>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={<CoursesList />} />
          <Route path="/:id" element={<SingleCourse />} />
        </Route>
      </Routes>
    </Container>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <CoursesList />
    // </div>
  );
}

export default App;
