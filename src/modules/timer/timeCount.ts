import $ from "jquery";

/**
 * time counts until over time limit or id="next" element is clicked
 * @param s time limit. by seconds
 */
const timeCount = (s: number) =>
    new Promise<void>((resolve) => {
        const timer = setInterval(() => {
            s--;
            $("#time").html(`<p>残り${s}秒</p>`);
            if (s == 0) {
                clearInterval(timer);
                resolve();
            }
        }, 1000);

        $("#next").on("click", () => {
            clearInterval(timer);
            resolve();
        });
    });

export default timeCount;
