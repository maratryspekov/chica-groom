import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/Home/HomePage";
import CoursesPage from "../pages/Courses/CoursesPage";
import FranchisePage from "../pages/Franchise/FranchisePage";
import PracticePage from "../pages/Practice/PracticePage";
import WorkplaceRentalPage from "../pages/WorkplaceRental/WorkplaceRentalPage";
import JobsPage from "../pages/Jobs/JobsPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/workplace" element={<WorkplaceRentalPage />} />
          <Route path="/jobs" element={<JobsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
