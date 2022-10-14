import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import App from './App';
import Admin from './admin/Admin';
import RequireAuth from "./admin/RequireAuth";
import PanelAdmin from "./admin/panel/PanelAdmin";
import Dashboard from "./admin/panel/Dashboard";
import MovieAdmin from "./admin/panel/MovieAdmin";
import ActeurAdmin from "./admin/panel/ActeurAdmin";
import Home from './routes/Home.js';
import LaBande from "./routes/LaBande";
import BandeDemo from "./routes/BandeDemo";
import LesArtistes from "./routes/LesArtistes";
import ArtistePlayer from "./routes/ArtistePlayer/ArtistePlayer";
import MentionsLegales from "./routes/MentionsLegales";
import Artiste from './sections/les-artistes/Artiste';
import 'react-loading-skeleton/dist/skeleton.css'
import './keyframes.css';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <AuthContextProvider>
              <Routes>
                  <Route path="/" element={<App />}>
                      <Route path="/" element={<Home />} />
                      <Route path="la-bande" element={<LaBande />} />
                      <Route path="bande-demo" element={<BandeDemo />} />
                      {/*<Route path="nos-prestations" element={<NosServices />} />*/}
                      <Route path="les-artistes" element={<LesArtistes />} />
                      <Route path="les-artistes/:artisteName" element={<Artiste />} />
                      {/*<Route path="le-test" element={<LeTestDlb />} />*/}
                      <Route path=":artisteName" element={<ArtistePlayer />} />
                      <Route path="/mentions-legales" element={<MentionsLegales />} />
                      <Route path="*" element={
                              <main style={{ padding: "1rem" }}>
                                  <p>Il n'y a rien ici!</p>
                              </main>
                          }
                      />
                  </Route>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/panel-admin" element={<RequireAuth><PanelAdmin /></RequireAuth>}>
                      <Route path="/panel-admin" element={<Dashboard />} />
                      <Route path="/panel-admin/acteur-admin" element={<ActeurAdmin />} />
                      <Route path="/panel-admin/movie-admin" element={<MovieAdmin />} />
                  </Route>
              </Routes>
          </AuthContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);
