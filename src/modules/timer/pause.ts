import $ from "jquery";

/**
 * stop until id="next" element is clicked
 */
const pause = () =>
    new Promise<void>((resolve) => {
        $("#next").on("click", () => {
            resolve();
        });
    });

export default pause;
