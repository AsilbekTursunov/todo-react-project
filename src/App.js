import './App.css';
import ListBlock from './components/list-block/list';
import WriteBlock from './components/write-block/write';


function App() {
  return (
   <>
     <div className="App ">
      <header className="todo-block rounded-2">
      <h1 className="todo-headline pb-3">My Todo List</h1>
         <WriteBlock/>
         <ListBlock/>
      </header>
    </div> 
    
   </>
  );
}

export default App;
