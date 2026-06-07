import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AbilityMapPage from './pages/AbilityMapPage';
import DiagnosisPage from './pages/DiagnosisPage';
import FigmaRoutesPage from './pages/FigmaRoutesPage';
import HomePage from './pages/HomePage';
import MistakeBookPage from './pages/MistakeBookPage';
import MistakeDetailPage from './pages/MistakeDetailPage';
import PlanPage from './pages/PlanPage';
import PracticePage from './pages/PracticePage';
import UploadPage from './pages/UploadPage';

export default function App() {
  return (
    <Routes>
      <Route path="figma-routes" element={<FigmaRoutesPage />} />
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<HomePage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="diagnosis" element={<DiagnosisPage />} />
        <Route path="mistakes" element={<MistakeBookPage />} />
        <Route path="mistakes/:id" element={<MistakeDetailPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="ability" element={<AbilityMapPage />} />
        <Route path="abilities" element={<AbilityMapPage />} />
        <Route path="plan" element={<PlanPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
