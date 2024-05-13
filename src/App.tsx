import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Admin from "./Pages/adminOanel";
import { useState } from "react";

interface IUSers {
  name: string;
  job: string;
  image: string;
}
function App() {
  // const [users, setUsers] = useState<IUSers[]>([]);

  // function addUser(newUser: any) {
  //   let data: IUSers[] = JSON.parse(localStorage.getItem("user") || "[]");
  //   data.push(newUser);
  //   localStorage.setItem("user", JSON.stringify(data));
  // }
  // function getUser() {
  //   let data: IUSers[] = JSON.parse(localStorage.getItem("user") || "[]");
  //   setUsers(data);
  // }

  // function removeUser(idx: number) {
  //   let data: IUSers[] = JSON.parse(localStorage.getItem("user") || "[]");
  //   let filteredUsers = data.filter((el: any, index: number) => index !== idx);
  //   localStorage.setItem("user", JSON.stringify(filteredUsers));
  //   getUser();
  // }

  return (
    <div className="App">
      <>
        <Header />
        <Routes>
          <Route path="/AdminPanel" element={<Admin />} />
          <Route path="/" element={<Hero />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
