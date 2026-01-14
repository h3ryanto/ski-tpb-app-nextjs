const Color = (kode: number) => {
    const colors = [
        "gray",
        "red",
        "yellow",
        "green",
        "blue",
        "indigo",
        "purple",
        "pink",
        "orange",
        "teal",
        "cyan",
        "lime"

    ];
    return colors[kode % colors.length];
}

export default Color;