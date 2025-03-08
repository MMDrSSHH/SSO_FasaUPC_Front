import { BrowserRouter } from "react-router";
import RoutesConfig from "./config/routes/RoutesConfig";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </>
  );
}

export default App;
