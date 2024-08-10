import { useState } from "react";

function useFetchDelete(initialUrl, initialOptions = {}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    function doFetch(url = initialUrl, options = initialOptions) {
        setIsLoading(true);
        setIsError(null);

        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener datos");
                }
                if (response.status === 204) {
                    return null; 
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                return data; // Asegúrate de devolver data para que se pueda usar en then
            })
            .catch((error) => {
                setIsError(error.message);
                throw error; // Asegúrate de lanzar el error para que se pueda manejar en catch
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return { data, isLoading, isError, doFetch };
}

export default useFetchDelete;