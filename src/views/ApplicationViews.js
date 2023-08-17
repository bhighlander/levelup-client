import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { UpdateGameForm } from "../components/game/GameUpdate"
import GameDetail from "../components/game/GameDetail"
import EventDetail from "../components/event/EventDetail"
import EventUpdate from "../components/event/EventUpdate"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/gameform" element={<GameForm />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/eventform" element={<EventForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/games/edit/:gameId/" element={<UpdateGameForm />} />
                <Route path="/games/:gameId" element={<GameDetail />} />
                <Route path="/events/edit/:eventId/" element={<EventUpdate />} />
                <Route path="/events/:eventId" element={<EventDetail />} />
            </Route>
        </Routes>
    </>
}
