import './App.css';
import { BrowserRouter, Route, Link, Routes} from "react-router-dom";
import DocumentTitle from 'react-document-title'
import Main from "./pages/Main";
import Step1 from "./components/Step1";
import Stepper from "./pages/Stepper";
import StepperForm from "./pages/Stepper";

function App() {
  return (
      <DocumentTitle title={'CloudCamp'}>
        <BrowserRouter basename="/" >
            <div>
                <Routes>
                    <Route exact path={'/FrontCloudCamp'} element={<Main/>}/>
                    <Route exact path={'/FrontCloudCamp/create'} element={<StepperForm/>}/>
                </Routes>
            </div>
        </BrowserRouter>
      </DocumentTitle>
  );
}

export default App;
