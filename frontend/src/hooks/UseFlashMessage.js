//helpers
import bus from "../helpers/bus";

// custom hook for displaying flash messages
export default function useFlashMessage() {
    // function that emits a message and type using the bus
    function setFlashMessage(msg, type) {
        bus.emit("flash", {
            message: msg,
            type: type,
        });
    }

    return { setFlashMessage };
}
