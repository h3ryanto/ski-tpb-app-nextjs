// components/DeleteButton.tsx
"use client";

import Swal from "sweetalert2";

type Props = {
    message: string;
};

export default function AppSwalSuccess({ message }: Props) {
    Swal.fire({
        title: "Success!",
        text: `${message}`,
        icon: "success",
        confirmButtonText: "OK",
        position: "top",
        customClass: {
            container: 'swal2-container',
            popup: "swal-mini",
        },
    });

}