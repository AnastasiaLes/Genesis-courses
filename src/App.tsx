import { Outlet, Route, Routes } from "react-router-dom";
import CoursesList from './components/coursesList/coursesList';
import { Container } from './app.styled';
import SingleCourse from './components/singleCourse/singleCourse';
import './App.css';

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
  );
}

export default App;
