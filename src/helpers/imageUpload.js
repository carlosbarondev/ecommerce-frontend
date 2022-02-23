import Swal from "sweetalert2";

import { fetchConToken } from "./fetch";

export const imageUpload = async (event, id, coleccion) => {

    if (event.target.files) {

        try {

            const files = event.target.files;
            const formData = new FormData();
            formData.append('archivo', files[0]);

            const enviar = await fetchConToken(`uploads/${coleccion}/${id}`, formData, 'PUT', true);
            const body = await enviar.json();

            return body;

        } catch (error) {
            console.log(error);
            return Swal.fire('Error', '', 'error');
        }

    }

}