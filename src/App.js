import Create from './Components/Create';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Read from './Components/Read';
import Update from './Components/Update';
import { CrudProvider } from './Components/contextApi/contextapi';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <CrudProvider>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Create />} />
            <Route exact path="/read" element={<Read />} />
            <Route exact path="/update" element={<Update />} />
          </Routes>
        </div>
      </CrudProvider>
    </Router>
  );
}

export default App;
