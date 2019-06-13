import React from "react";
import { Router, Route } from "react-router-dom";
import CommentCreate from "./comment/CommentCreate";
import CommentEdit from "./comment/CommentEdit";
import CommentDelete from "./comment/CommentDelete";
import CommentList from "./comment/CommentList";
import CommentShow from "./comment/CommentShow";
import Header from "./Header";
import history from "../history";

// will know which component to show based on url
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={CommentList} />
          <Route path="/comments/new" exact component={CommentCreate} />
          <Route path="/comments/edit/:id" exact component={CommentEdit} />
          <Route path="/comments/delete/:id" exact component={CommentDelete} />
          <Route path="/comments/show" exact component={CommentShow} />
        </div>
      </Router>
    </div>
  );
};

export default App;
