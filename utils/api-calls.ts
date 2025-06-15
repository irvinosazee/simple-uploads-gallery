
export async function saveMetadata(file : any) {
    const res = await fetch("/api/image", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: file.name,
            url: file.ufsUrl,
        }),
    })

    if (!res.ok) {
        throw new Error("Failed to save metadata");
    }
    const data = await res.json();
    return data;
}
export async function getImages() {
    const res = await fetch("/api/image", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        throw new Error("Failed to save metadata");
    }
    const data = await res.json();
    return data;
}

export async function deleteImage(id: string) {
    const res = await fetch(`/api/image/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to delete image");
    }
    const data = await res.json();
    return data;
}