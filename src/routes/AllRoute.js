import { Routes, Route } from "react-router-dom";
import AllVideosPage from "../pages/AllVideosPage";
import Collection from "../pages/Collection";
import Developer from "../pages/Developer";
import ErrorPage from "../pages/ErrorPage";
import Faq from "../pages/Faq";
import FullCast from "../pages/FullCast";
import GenreResults from "../pages/GenreResults";
import GetSeriesSeasonDetail from "../pages/GetSeriesSeasonDetail";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import People from "../pages/People";
import SearchResults from "../pages/SearchResults";
import Series from "../pages/Series";
import { SeriesSeasonsAll } from "../pages/SeriesSeasonsAll";
import SingleResultMovieTv from "../pages/SingleResultMovieTv";
import SingleResultPerson from "../pages/SingleResultPerson";

const AllRoute = ({ setProgress }) => {
  return (
    <Routes>
      <Route path="/" element={<Home setProgress={setProgress} />} />
      <Route path="/movies" element={<Movies setProgress={setProgress} />} />
      <Route path="/series" element={<Series setProgress={setProgress} />} />
      <Route path="/people" element={<People setProgress={setProgress} />} />
      <Route
        path="/developer"
        element={<Developer setProgress={setProgress} />}
      />
      <Route path="/FAQ" element={<Faq setProgress={setProgress} />} />
      <Route
        path="/singleResult/:typeOfUrl/:id"
        element={<SingleResultMovieTv setProgress={setProgress} />}
      />
      <Route
        path="/singleResultPerson/:id"
        element={<SingleResultPerson setProgress={setProgress} />}
      />
      <Route
        path="/series-season/:tvId/:seasonNo"
        element={<GetSeriesSeasonDetail setProgress={setProgress} />}
      />
      <Route
        path="/series-seasons-all/:id"
        element={<SeriesSeasonsAll setProgress={setProgress} />}
      />
      <Route
        path="/collection/:id"
        element={<Collection setProgress={setProgress} />}
      />
      <Route
        path="/allVideos/:categoryType/:id"
        element={<AllVideosPage setProgress={setProgress} />}
      />
      <Route
        path="/fullCast/:typeOfUrl/:id"
        element={<FullCast setProgress={setProgress} />}
      />
      <Route
        path="/search"
        element={<SearchResults setProgress={setProgress} />}
      />

      <Route
        path="/genre/:categoryOfUrl/:id/:genreName"
        element={<GenreResults setProgress={setProgress} />}
      />

      <Route
        path="/error-page"
        element={<ErrorPage setProgress={setProgress} />}
      />
      <Route path="*" element={<ErrorPage setProgress={setProgress} />} />
    </Routes>
  );
};

export default AllRoute;
