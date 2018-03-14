import React from "react";
import Sidebar from "../../common/Sidebar";
import { connect } from "react-redux";
import { fetchAllPlaces } from "../../../actions";

const Recents = ({ recentSearches, onClick }) => (
  <Sidebar otherClass="recents" heading={"RECENT SEARCHES"}>
    {recentSearches.map((e, i) => (
      <div key={i} onClick={() => onClick(e)} className="history-list-element">
        <div key={i} style={{ textTransform: "capitalize" }}>
          {" "}
          {e.query} near {e.near}
        </div>
      </div>
    ))}
  </Sidebar>
);

const mapStateToProps = ({ recentSearches }) => ({ recentSearches });

const mapDispatchToProps = dispatch => {
  return {
    onClick: e => {
      dispatch(
        fetchAllPlaces({
          query: e.query,
          near: e.near
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recents);
