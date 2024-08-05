import "./App.css";
import Header from "./components/Header";
import AttendanceList from "./components/AttendanceList";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Attendance List</h1>
        <AttendanceList />
      </main>
    </div>
  );
}

export default App;
