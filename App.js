import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CourseTable from './components/Course/CourseTable';
import DegreeTable from './components/Degree/DegreeTable';
import RoleTable from './components/Role/RoleTable';
import UserTable from './components/UserTable';
import SingleTable from './components/single get/SingleTable';
import RowView from './components/single get/RowView';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* <div className="d-flex flex-column align-items-center">
              <h1>Use Form</h1>
            </div> 
            <UserTable /> */}
        {/* <div className="d-flex flex-column align-items-center">
              <h1>Single Get Table</h1>
            </div>  */}
        <Routes>


          {/* <SingleTable />  */}
          <Route path='/' Component={SingleTable} />
          <Route path='/view/:id' Component={RowView} />
        </Routes>
        {/* <div className="d-flex flex-column align-items-center">
              <h1>Role Table</h1>
            </div>
            <RoleTable />
            <div className="d-flex flex-column align-items-center">
              <h1>Degree Table</h1>
            </div>
            <DegreeTable />
            <div className="d-flex flex-column align-items-center">
              <h1>Course Table</h1>
            </div>
            <CourseTable /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>
  );
}

export default App;



// import './App.css';
// import CourseTable from './components/Course/CourseTable';
// import DegreeTable from './components/Degree/DegreeTable';
// import RoleTable from './components/Role/RoleTable';
// import UserTable from './components/UserTable';

// function App() {
//   return (
//     <>
//       <div className="d-flex flex-column align-items-center">
//         <h1>Use Form</h1>
//       </div> 
//       <UserTable/>
//       <div  className="d-flex flex-column align-items-center">
//         <h1>Role Table</h1>
//       </div>
//       <RoleTable/>
//       <div  className="d-flex flex-column align-items-center">
//         <h1>Degree Table</h1>
//       </div>
//       <DegreeTable/>
//       <div  className="d-flex flex-column align-items-center">
//         <h1>Course Table</h1>
//       </div>
//       <CourseTable/>
//     </>
//   );
// }

// export default App;
