import { useEffect } from "react";

export default function MyCardioLoader() {
    useEffect(() => {
        async function getLoader() {
            const { cardio } = await import("ldrs");
            cardio.register();
        }
        getLoader();
    }, []);
    return <></>;
}
