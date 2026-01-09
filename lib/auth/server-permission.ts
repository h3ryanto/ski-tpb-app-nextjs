

type Menu = {
    path: string;
    actions: string[];
    children?: Menu[];
};

function findMenu(menus: Menu[], path: string): Menu | false {
    for (const m of menus) {
        if (m.path === path) return m;
        if (m.children) {
            const found = findMenu(m.children, path);
            if (found) return found;
        }
    }
    return false;
}

export async function requirePermission(
    pathname: string,
    action = "view"
) {

    // 🔥 PANGGIL MENU API (NANTI DIGANTI REDIS)
    const res = await fetch("/api/get-menus", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // kalau pakai JWT:
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) {
        return { allowed: false };
    }

    const { data }: { data: Menu[] } = await res.json();

    const menu = findMenu(data, pathname);
    // console.log("Fetching menus for permission check:", menu);
    if (!menu) return { allowed: false };
    if (!menu.actions?.includes(action)) return { allowed: false };

    return { allowed: true };
}
