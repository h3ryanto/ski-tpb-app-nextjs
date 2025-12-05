// components/DeleteButton.tsx
"use client";

import Swal from "sweetalert2";

type Props = {
    message: string;
};

export default function AppSwalError({ message }: Props) {
    Swal.fire({
        title: "Error!",
        text: `${message}`,
        icon: "error",
        confirmButtonText: "OK",
        position: "top",
        customClass: {
            container: 'swal2-container',
            popup: "swal-mini",
        },
    });

}