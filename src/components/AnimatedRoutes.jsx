import Notes from "./Notes";
import Create from "./Create";
import Update from "./Update";
import {
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"


const AnimatedRoutes = () => {
    const location = useLocation()

console.log(location)

    return (
        <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
            <Route path="/create" exact element={<Create />} />
            <Route path="/" exact element={<Notes />} />
            <Route path="/update" exact element={<Update />} />
            <Route path="/*" exact element={<Navigate to="/" replace />} />
        </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;
